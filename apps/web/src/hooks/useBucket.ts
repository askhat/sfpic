import nano from "nano";
import nanoid from "nanoid";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { BucketContext, User } from "~context";
import { fileToBase64 } from "~helpers";

let db = nano("http://localhost:5984").use("sfpic");
let rpc = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "multipart/form-data" }
});

export function useBucket(): BucketContext {
  let user = useContext(User);

  let owner = "";

  let [files, setFiles] = useState<File[]>([]);
  let [size, setSize] = useState<number>(0);
  let [isEmpty, setEmpty] = useState<boolean>(true);
  let [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEmpty(files.length === 0);
    setSize(files.reduce((acc, el) => (acc += el.size), 0));
  }, [files]);

  useEffect(() => {
    if (!user.profile) return;
    rpc.defaults.headers.common.Authorization = `Bearer ${user.profile?.__raw}`;
  }, [user.profile]);

  let add = async (filesToAdd: File[]) => {
    setFiles([...filesToAdd, ...files]);
  };

  let remove = (filesToRemove: File[]) => {
    setFiles(files.filter((f: File) => !filesToRemove.includes(f)));
  };

  let upload = async () => {
    setLoading(true);
    let payload = files.map(async (f: File) => ({
      name: f.name,
      data: await fileToBase64(f),
      content_type: f.type
    }));
    await db.multipart.insert(
      { owner: user.profile.sub },
      await Promise.all(payload),
      _id
    );
    setLoading(false);
  };

  return {
    owner,
    files,
    size,
    isEmpty,
    isLoading,
    add,
    remove,
    upload
  };
}
