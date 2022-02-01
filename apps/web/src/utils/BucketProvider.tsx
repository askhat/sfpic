import React from "react";
import { useBucket } from "../hooks";
import { Bucket } from "../context";

interface Props {
	children: React.ReactNode;
}

export function BucketProvider({ children }: Props) {
	return <Bucket.Provider value={useBucket()}>{children}</Bucket.Provider>;
}
