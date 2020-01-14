import { Module } from "@nestjs/common";
import { BucketModule } from "./bucket.module";
import { ZipModule } from "./zip.module";

@Module({
  imports: [BucketModule, ZipModule]
})
export class AppModule {}
