import { Inject, Injectable } from "@nestjs/common";
import { exists, readFile } from "fs";
import JSZip from "jszip";
import nano from "nano";
import { Bucket } from "./bucket.interface";
import { File } from "./file.interface";
import { wordGen } from "./helpers";

@Injectable()
export class BucketService {
  constructor(
    @Inject("DATABASE_CONNECTION")
    private readonly db: nano.DocumentScope<Bucket<File>>
  ) {}

  public async fetchMeta(id: string) {
    let { _rev, ...doc } = await this.db.get(id);
    return doc;
  }

  public async fetchBlob(id: string) {
    let zip = new JSZip();
    let { files } = await this.fetchMeta(id);
    for (let {_id, name} of files) {
      let buffer = await this.readFile(_id);
      zip.file(name, buffer);
    }
    console.log(zip)
    return zip.generateAsync({ type: "nodebuffer" });
  }

  public async create(rawFiles: unknown[], owner_id: string) {
    let _id = wordGen(3).join("-");
    let files = this.sanitzeFilesMeta(rawFiles);
    await this.db.insert({ _id, owner_id, files });
    return _id;
  }

  private sanitzeFilesMeta(files: unknown[]): File[] {
    return files.map(({ originalname, mimetype, filename, size }) => ({
      _id: filename,
      name: originalname,
      type: mimetype,
      size
    }));
  }

  private readFile(name) {
    return new Promise<Buffer>(async (resolve, reject) => {
      let path = process.env.UPLOAD_DIR + "/" + name;
      let ex = await this.exists(path);
      if (!(await this.exists(path))) {
        reject(new Error("File does not exist"));
      }
      readFile(path, null, (err, buffer) => {
        if (err) reject(err);
        resolve(buffer);
      });
    });
  }

  private exists(path) {
    return new Promise<boolean>(resolve => {
      exists(path, resolve);
    });
  }
}
