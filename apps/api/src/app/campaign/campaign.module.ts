import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { PrismaCryptoFundController } from '@alx-portfolio-project/prisma-crypto-fund';

@Module({
  imports: [PrismaCryptoFundController],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
