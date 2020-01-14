import { Module } from "@nestjs/common";
import { ZipController } from "./zip.controller";
import { ZipService } from "./zip.service";

@Module({
  providers: [ZipService],
  controllers: [ZipController]
})
export class ZipModule {}
