import { Module } from '@nestjs/common';
import { DonatorController } from './donator.controller';
import { DonatorService } from './donator.service';
import { PrismaCryptoFundModule } from '@alx-portfolio-project/prisma-crypto-fund';

@Module({
  imports: [PrismaCryptoFundModule],
  controllers: [DonatorController],
  providers: [DonatorService],
})
export class DonatorModule {}
