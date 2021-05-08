import React from "react";

import { Bucket } from "../context";
import { useBucket } from "../hooks";

interface Props {
  children: React.ReactNode;
}

export function BucketProvider({ children }: Props) {
  return <Bucket.Provider value={useBucket()}>{children}</Bucket.Provider>;
}
