import { Controller, Post, Get, Put, Delete, UseInterceptors, UploadedFiles, Param, Body, Res, HttpCode } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { BucketService } from "./bucket.service";
import { Bucket } from "./bucket.interface";
import { File } from "./file.interface";
import { wordGen } from "./helpers";

let dest = process.env.UPLOAD_DIR

@Controller("bucket")
export class BucketController {
  constructor(private readonly bucketService: BucketService) { }

  @Post()
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor("files", 100, { dest }))
  async create(@Res() res, @Body() { owner }: Bucket<File>, @UploadedFiles() uploadedFiles) {
    try {
      let _id = wordGen(3).join("-");
      let files = uploadedFiles.map(({ originalname, mimetype, filename }) => ({
        _id: filename,
        name: originalname,
        type: mimetype
      }));
      await this.bucketService.create({ _id, owner, files });
      res.send(_id)
    } catch {
      res.statusCode(500).send();
      return
    }
  }

  @Get(":id")
  async inspect(@Res() res, @Param() params) {
    try {
      let { _rev, ...doc } = await this.bucketService.fetch(params.id);
      res.send(doc);
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
