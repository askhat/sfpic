import React from "react";
import { useBucket } from "~hooks";
import { Bucket } from "~context";

// props better naming like BucketProviderProps

interface Props {
  children: React.ReactNode;
}

// all utils looking like hooks because return itself

export function BucketProvider({ children }: Props) {
  return <Bucket.Provider value={useBucket()}>{children}</Bucket.Provider>;
}
