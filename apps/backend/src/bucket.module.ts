import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/database.module";
import { databaseProviders } from "src/database.providers";
import { BucketService } from "./bucket.service";
import { BucketController } from "./bucket.controller";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [...databaseProviders, BucketService],
  controllers: [BucketController]
})
export class BucketModule { }
