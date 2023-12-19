// donator.service.ts

import { Injectable } from '@nestjs/common';
import { Donator } from '@prisma/client';
import { PrismaCryptoFundService } from '@alx-portfolio-project/prisma-crypto-fund';

@Injectable()
export class DonatorService {
  constructor(private prisma: PrismaCryptoFundService) {}

  async getAllDonators(): Promise<Donator[]> {
    return this.prisma.donator.findMany();
  }

  async getDonatorById(id: number): Promise<Donator | null> {
    return this.prisma.donator.findUnique({
      where: { id },
    });
  }
}
