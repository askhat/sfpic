import React, { useRef } from "react";
import { Button } from "~components";
import { Colors } from "~constants";

interface Props {
  large?: boolean;
  color?: Colors;
  children: string;
  onChange(files: File[]): void;
}

export function FileInput({ onChange, children, large, color }: Props) {
  let fileInput = useRef<HTMLInputElement>(null);

  let openNativeWindow = () => {
    fileInput.current?.click();
  };

  let handleFileList = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          onChange(Array.from(e.target.files));
      }
  };

  return (
    <>
      <Button color={color} large={large} onPress={openNativeWindow}>
        {children}
      </Button>
      <input
        hidden
        multiple
        type="file"
        ref={fileInput}
        onChange={handleFileList}
      />
    </>
  );
}
