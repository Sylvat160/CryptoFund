import { Module } from '@nestjs/common';
import { PrismaCryptoFundController } from './prisma-crypto-fund.controller';
import { PrismaCryptoFundService } from './prisma-crypto-fund.service';

@Module({
  controllers: [PrismaCryptoFundController],
  providers: [PrismaCryptoFundService],
  exports: [PrismaCryptoFundService],
})
export class PrismaCryptoFundModule {}
