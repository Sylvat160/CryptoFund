// campaign.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Campaign, Donator } from '@prisma/client';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(@Body() campaignData: Campaign): Promise<Campaign> {
    return this.campaignService.createCampaign(campaignData);
  }

  @Get()
  async getAllCampaigns(): Promise<Campaign[]> {
    return this.campaignService.getCampaigns();
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: string): Promise<Campaign | null> {
    return this.campaignService.getCampaignById(+id);
  }

  @Post(':id/donate')
  async donateToCampaign(
    @Param('id') id: string,
    @Body() donatorData: Donator
  ): Promise<Donator> {
    return this.campaignService.donateToCampaign(+id, donatorData);
  }

  @Get(':id/donations')
  async getDonationsForCampaign(@Param('id') id: string): Promise<Donator[]> {
    return this.campaignService.getDonationsForCampaign(+id);
  }
}
