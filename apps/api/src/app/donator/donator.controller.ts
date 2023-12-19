import { Controller, Get, Param } from '@nestjs/common';
import { DonatorService } from './donator.service';
import { Donator } from '@prisma/client';

@Controller('donators')
export class DonatorController {
  constructor(private readonly donatorService: DonatorService) {}

  @Get()
  async getAllDonators(): Promise<Donator[]> {
    return this.donatorService.getAllDonators();
  }

  @Get(':id')
  async getDonatorById(@Param('id') id: string): Promise<Donator | null> {
    return this.donatorService.getDonatorById(+id);
  }
}
