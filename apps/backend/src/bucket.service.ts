import nano from "nano";
import { Injectable, Inject } from "@nestjs/common";
import { Bucket } from "./bucket.interface";
import { File } from "./file.interface";

@Injectable()
export class BucketService {
  constructor(
    @Inject("DATABASE_CONNECTION")
    private readonly db: nano.DocumentScope<Bucket<File>>
  ) {}

  fetch(id: string) {
    return this.db.get(id);
  }

  create(bucket: Bucket<File>) {
    return this.db.insert(bucket);
  }
}
