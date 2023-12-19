import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import { DonatorModule } from './donator/donator.module';
import { PrismaCryptoFundModule } from '@alx-portfolio-project/prisma-crypto-fund';

@Module({
  imports: [PrismaCryptoFundModule, CampaignModule, DonatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
