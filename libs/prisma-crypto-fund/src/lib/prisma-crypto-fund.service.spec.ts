import { Test } from '@nestjs/testing';
import { PrismaCryptoFundService } from './prisma-crypto-fund.service';

describe('PrismaCryptoFundService', () => {
  let service: PrismaCryptoFundService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrismaCryptoFundService],
    }).compile();

    service = module.get(PrismaCryptoFundService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
