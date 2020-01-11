import { exists, readFile } from "fs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {
  open(name: string) {
    return new Promise((resolve, reject) => {
      let path = process.env.UPLOAD_DIR + "/" + name;
      exists(path, isExist => {
        if (isExist)
          readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
          });
      });
    });
  }
}
