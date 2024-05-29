import { Module } from '@nestjs/common';
import { AntiFraudController } from './controller/antifraud.controller';
import { AntifraudService } from './service/antifraud.service';

@Module({
  imports: [],
  controllers: [AntiFraudController],
  providers: [AntifraudService],
})
export class AntiFraudModule {}
