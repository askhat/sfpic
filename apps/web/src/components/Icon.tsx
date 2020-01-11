import React from "react";
import styled from "styled-components";
import { Image } from "~components";
import { FileTypes } from "~constants";

interface Props {
  type: FileTypes;
  children?: React.ReactNode;
}

let icons = new Map<FileTypes, string>([
  [FileTypes.AUDIO, require("~assets/icons/audio.png")],
  [FileTypes.CODE, require("~assets/icons/code.png")],
  [FileTypes.DOCUMENT, require("~assets/icons/document.png")],
  [FileTypes.IMAGE, require("~assets/icons/image.png")],
  [FileTypes.VIDEO, require("~assets/icons/video.png")]
]);

export function Icon({ type, children }: Props) {
  return (
    <Container>
      {children && <Sticker>{children}</Sticker>}
      <Image src={icons.get(type)} />
    </Container>
  );
}

let Container = styled.div`
  height: 64px;
  width: 64px;
  position: relative;
`;

let Sticker = styled.div`
  position: absolute;
  right: 0;
`;
