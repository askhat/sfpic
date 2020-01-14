import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BucketContext, User } from "~context";

let rpc = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "multipart/form-data" }
});

export function useBucket(): BucketContext {
  let user = useContext(User);

  let [owner, setOwner] = useState<string>();
  let [size, setSize] = useState<number>(0);
  let [files, setFiles] = useState<File[]>([]);

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

  let open = async (id: string): Promise<void> => {
    let { data } = await rpc.get("/bucket/" + id);
    setOwner(data.owner);
    setFiles(data.files);
  };

  let add = async (filesToAdd: File[]) => {
    setFiles([...filesToAdd, ...files]);
  };

  let remove = (filesToRemove: File[]) => {
    setFiles(files.filter((f: File) => !filesToRemove.includes(f)));
  };

  let upload = (filesToUpload: File[] = []) => {
    return new Promise<string>(async (resolve, reject) => {
      setLoading(true);
      try {
        let formData = new FormData();
        filesToUpload.forEach(f => formData.append("files", f));
        let { data } = await rpc.post("/bucket", formData);
        resolve(data);
      } catch (err) {
        reject(err);
      }
      setLoading(false);
    });
  };

  let download = (ids: string[]): Promise<File[]> => {
    return Promise.resolve(files);
  };

  return {
    owner,
    files,
    size,
    isEmpty,
    isLoading,
    add,
    remove,
    upload,
    download,
    open
  };
}
