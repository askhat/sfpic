import React from "react";
import styled from "styled-components";

import { Image } from "../components";
import { FileTypes } from "../constants";

interface Props {
  type: FileTypes;
  children?: React.ReactNode;
}

let icons = new Map<FileTypes, string>([
  [FileTypes.AUDIO, "url:../assets/icons/audio.png"],
  [FileTypes.CODE, "url:../assets/icons/code.png"],
  [FileTypes.DOCUMENT, "url:../assets/icons/document.png"],
  [FileTypes.IMAGE, "url:../assets/icons/image.png"],
  [FileTypes.VIDEO, "url:../assets/icons/video.png"],
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
