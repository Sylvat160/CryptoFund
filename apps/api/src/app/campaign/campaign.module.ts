import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { PrismaCryptoFundModule } from '@alx-portfolio-project/prisma-crypto-fund';

@Module({
  imports: [PrismaCryptoFundModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
