import { Charity } from 'src/charity/charity.entity';
import { Donor } from 'src/donor/donor.entity';
import { DataSource, Repository } from 'typeorm';
import { PaymentMethod, Transaction } from '../transaction.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DonorService } from 'src/donor/providers/donor.service';
import { CharityService } from 'src/charity/providers/charity.service';
import { GetTransactions } from './get-transactions';
import { GenericFindManyOptions } from 'src/generic-module/types';

@Injectable()
export class TransactionService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private donorService: DonorService,
    private charityService: CharityService,
    @InjectRepository(Transaction) private txRepo: Repository<Transaction>,

    private getTransactionService: GetTransactions,
  ) {}

  async donateToCharity(
    donorId: number,
    charityId: number,
    amount: number,
    paymentMethod: PaymentMethod,
  ): Promise<Transaction> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const donor = await queryRunner.manager.findOne(Donor, {
        where: { id: donorId },
      });
      const charity = await queryRunner.manager.findOne(Charity, {
        where: { id: charityId },
      });

      if (!donor || !charity) {
        throw new NotFoundException('Donor or Charity not found');
      }

      if (!charity.canReceiveFunds) {
        throw new BadRequestException(
          'Charity is not accepting donations at the moment',
        );
      }

      const transaction = this.txRepo.create({
        donor,
        charity,
        amount,
        paymentMethod,
      });

      const savedTx = await queryRunner.manager.save(Transaction, transaction);

      await queryRunner.commitTransaction();
      return savedTx;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async toggleCharityDonationStatus(charityId: number, canReceive: boolean) {
    const charity = await this.charityService.getCharityById(charityId);
    if (!charity) throw new NotFoundException('Charity not found');

    // Apply the change directly and save
    // charity.canReceiveFunds = canReceive;
    const updatedCharity = await this.charityService.updateCharityStatus({
      id: charity.id,
      canReceiveFunds: canReceive,
    });
    return updatedCharity;
  }

  async getAllDonations(options: GenericFindManyOptions<Transaction>) {
    return await this.getTransactionService.getAllTransactions(options);
  }
}
