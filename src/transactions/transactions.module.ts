import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionService } from './providers/transactions.service';
import { UpdateTransactions } from './providers/update-transactions';
import { GetTransactions } from './providers/get-transactions';
import { DeleteTransactions } from './providers/delete-transactions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { DonorModule } from 'src/donor/donor.module';
import { DonorService } from 'src/donor/providers/donor.service';
import { CharityModule } from 'src/charity/charity.module';
import { CharityService } from 'src/charity/providers/charity.service';
import { GenericModule } from 'src/generic-module/generic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    DonorModule,
    CharityModule,
    GenericModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionService,
    UpdateTransactions,
    GetTransactions,
    DeleteTransactions,
    // DonorService,
    // CharityService,
  ],
})
export class TransactionsModule {}
