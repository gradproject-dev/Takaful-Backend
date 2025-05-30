import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic-module/generic.service';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericFindManyOptions } from 'src/generic-module/types';

@Injectable()
export class GetTransactions {
  constructor(
    private readonly genericService: GenericService,
    @InjectRepository(Transaction)
    private readonly transatcionRepo: Repository<Transaction>,
  ) {}

  async getAllTransactions(options: GenericFindManyOptions<Transaction>) {
    return await this.genericService.findAllV2<Transaction>(
      this.transatcionRepo,
    );
  }
}
