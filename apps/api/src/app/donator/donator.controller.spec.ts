import { Test, TestingModule } from '@nestjs/testing';
import { DonatorController } from './donator.controller';

describe('DonatorController', () => {
  let controller: DonatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonatorController],
    }).compile();

    controller = module.get<DonatorController>(DonatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
