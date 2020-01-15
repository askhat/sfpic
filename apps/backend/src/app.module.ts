import { Module } from "@nestjs/common";
import { BucketModule } from "./bucket.module";
import { AppController } from './app.controller';

@Module({
  imports: [BucketModule],
  controllers: [AppController]
})
export class AppModule {}
