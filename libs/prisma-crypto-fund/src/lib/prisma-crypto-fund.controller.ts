import { Controller } from '@nestjs/common';
import { PrismaCryptoFundService } from './prisma-crypto-fund.service';

@Controller('prisma-crypto-fund')
export class PrismaCryptoFundController {
  constructor(private prismaCryptoFundService: PrismaCryptoFundService) {}
}
