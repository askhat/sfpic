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
    // const
    // we don'nt need _rev
    let { _rev, ...doc } = await this.db.get(id);
    return doc;
  }

  public async fetchBlob(id: string) {
    // const
    let zip = new JSZip();
    // const
    let { files } = await this.fetchMeta(id);
    // const
    for (let {_id, name} of files) {
      // const
      // _id as a file name - weird
      let buffer = await this.readFile(_id);
      zip.file(name, buffer);
    }
    return zip.generateAsync({ type: "nodebuffer" });
  }

  // types
  public async create(rawFiles: unknown[], owner_id: string) {
    let _id = wordGen(3).join("-");
    let files = this.sanitzeFilesMeta(rawFiles);
    await this.db.insert({ _id, owner_id, files });
    // maybe better get id from insert? I'm not sure if this await return this _id
    return _id;
  }

  // type
  private sanitzeFilesMeta(files: unknown[]): File[] {
    return files.map(({ originalname, mimetype, filename, size }) => ({
      _id: filename,
      name: originalname,
      type: mimetype,
      size
    }));
  }

  private readFile(name) {
    // fs.readFile ? instead of this function

    // i think that better function will be like that
    //  const fileName = path.resolve(__dirname, name);
    //     readFile(fileName, null, (err, buffer) => {
    //       if (err) throw err;
    //       return buffer;
    //     });
    // we don't need a promise because async func will return a promise
    return new Promise<Buffer>(async (resolve, reject) => {
      let path = process.env.UPLOAD_DIR + "/" + name;
      let ex = await this.exists(path);
      // we can check it by ex
      // i'm not sure, but i think that this check not necessary, because readFile from node js can check
      // it by itself and say us about this in err
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
    // useless promise we can return exists and that all, and it will be useless function, because we can check
    // it by path.resolve ?
    return new Promise<boolean>(resolve => {
      exists(path, resolve);
    });
  }
}
