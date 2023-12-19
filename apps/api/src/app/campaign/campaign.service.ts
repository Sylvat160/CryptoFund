// campaign.service.ts

import { Injectable } from '@nestjs/common';
import { Campaign, Donator } from '@prisma/client';
import { PrismaCryptoFundService } from '@alx-portfolio-project/prisma-crypto-fund';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaCryptoFundService) {}

  async createCampaign(data: Campaign): Promise<Campaign> {
    return this.prisma.campaign.create({
      data,
    });
  }

  async donateToCampaign(campaignId: number, data): Promise<Donator> {
    return this.prisma.donator.create({
      data: {
        ...data,
        campaign: {
          connect: { id: campaignId },
        },
      },
    });
  }

  async getCampaigns(): Promise<Campaign[]> {
    return this.prisma.campaign.findMany();
  }

  async getCampaignById(id: number): Promise<Campaign | null> {
    return this.prisma.campaign.findUnique({
      where: { id },
    });
  }

  async getDonationsForCampaign(campaignId: number): Promise<Donator[]> {
    return this.prisma.donator.findMany({
      where: { campaignId },
    });
  }
}
