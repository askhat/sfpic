import { Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { BucketView } from "./bucket.constants";
import { BucketService } from "./bucket.service";

let dest = process.env.UPLOAD_DIR;

@Controller("bucket")
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor("files", 100, { dest }))
  async create(
    @Req() req,
    @Res() res,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    try {
      let owner = req.user.sub;
      let id = await this.bucketService.create(files, owner);
      res.send(id);
    } catch {
      res.status(500).send();
    }
  }

  @Get(":id")
  async inspect(
    @Res() res,
    @Param() { id },
    @Query() { view = BucketView.META }
  ) {
    try {
      switch (view) {
        case BucketView.META:
          res.send(await this.bucketService.fetchMeta(id));
        case BucketView.BLOB:
          let blob = await this.bucketService.fetchBlob(id);
          res.send(blob);
      }
    } catch (err) {
      res.status(err.statusCode).send();
    }
  }

  @Put(":id")
  update() {
    throw "NOT IMPLEMENTED";
  }

  @Delete(":id")
  remove() {
    throw "NOT IMPLEMENTED";
  }
}
