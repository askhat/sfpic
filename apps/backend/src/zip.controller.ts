import { Controller, Get } from "@nestjs/common";
import { ZipService } from "./zip.service";

@Controller("zip")
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Get(":id") // id of a bucket
  fetch() {
  }
}
