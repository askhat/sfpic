import { Controller, Get } from "@nestjs/common";

@Controller("app")
export class AppController {
  @Get("/_status")
  status() {
    return "OK";
  }
}
