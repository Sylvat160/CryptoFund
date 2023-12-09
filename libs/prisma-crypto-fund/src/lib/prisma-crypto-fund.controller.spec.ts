import { Test } from '@nestjs/testing';
import { PrismaCryptoFundController } from './prisma-crypto-fund.controller';
import { PrismaCryptoFundService } from './prisma-crypto-fund.service';

describe('PrismaCryptoFundController', () => {
  let controller: PrismaCryptoFundController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrismaCryptoFundService],
      controllers: [PrismaCryptoFundController],
    }).compile();

    controller = module.get(PrismaCryptoFundController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
