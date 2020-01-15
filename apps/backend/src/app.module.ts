import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { BucketModule } from "./bucket.module";

@Module({
  imports: [BucketModule],
  controllers: [AppController]
})
export class AppModule {}
