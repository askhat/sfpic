import { Module } from "@nestjs/common";
import { BucketModule } from "./bucket.module";
import { FileModule } from './file.module';

@Module({
  imports: [BucketModule, FileModule],
})
export class AppModule { }
