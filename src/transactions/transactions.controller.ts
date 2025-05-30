import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionService } from './providers/transactions.service';
import { DonateDto } from './dtos/create-transaction.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Auth(AuthType.None)
  @Post('/donate')
  donate(@Body() dto: DonateDto) {
    return this.transactionService.donateToCharity(
      dto.donorId,
      dto.charityId,
      dto.amount,
      dto.paymentMethod,
    );
  }

  @Auth(AuthType.None)
  @Get('all')
  getDonations(@Query('charityId') charityId: number) {
    return this.transactionService.getAllDonations({
      where: { charity: { id: charityId } },
    });
  }

  @Auth(AuthType.None)
  @Patch('/charity/:id/toggle')
  toggleCharity(
    @Param('id') id: number,
    @Query() { canReceive }: { canReceive: boolean },
  ) {
    return this.transactionService.toggleCharityDonationStatus(id, canReceive);
  }
}
