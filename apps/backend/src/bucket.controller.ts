import { Controller, Delete, Get, HttpCode, Param, Post, Put, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { BucketService } from "./bucket.service";
import { wordGen } from "./helpers";

let dest = process.env.UPLOAD_DIR;

@Controller("bucket")
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor("files", 100, { dest }))
  async create(@Req() req, @Res() res, @UploadedFiles() uploadedFiles) {
    try {
      let _id = wordGen(3).join("-");
      let owner = req.user?.sub;
      let files = uploadedFiles.map(({ originalname, mimetype, filename, size }) => ({
        _id: filename,
        name: originalname,
        type: mimetype,
        size
      }));
      await this.bucketService.create({ _id, owner, files });
      res.send(_id);
    } catch {
      res.statusCode(500).send();
      return;
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
