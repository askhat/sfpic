import { Module } from "@nestjs/common";
import { BucketModule } from "./bucket.module";
import { ZipModule } from "./zip.module";
import { AppController } from './app.controller';

@Module({
  imports: [BucketModule, ZipModule],
  controllers: [AppController]
})
export class AppModule {}
