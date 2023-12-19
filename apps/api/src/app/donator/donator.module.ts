import { Module } from '@nestjs/common';
import { DonatorController } from './donator.controller';
import { DonatorService } from './donator.service';
import { PrismaCryptoFundController } from '@alx-portfolio-project/prisma-crypto-fund';

@Module({
  imports: [PrismaCryptoFundController],
  controllers: [DonatorController],
  providers: [DonatorService],
})
export class DonatorModule {}
