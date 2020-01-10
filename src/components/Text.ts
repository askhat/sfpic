import styled from "styled-components";
import { Sizes, Colors, Alignments } from "~constants";

interface Props {
  color?: Colors;
  size?: Sizes;
  bold?: boolean;
  align?: Alignments;
}

const pixelSize = new Map<Sizes, string>([
  [Sizes.LARGE, "24px"],
  [Sizes.REGULAR, "20px"],
  [Sizes.SMALL, "14px"]
]);

export let Text = styled.p<Props>`
  font-family: "Nunito", sans-serif;
  font-weight: ${({ bold }) => bold && "bold"};
  font-size: ${({ size = Sizes.REGULAR }) => pixelSize.get(size)};
  text-align: ${({ align = Alignments.CENTER }) => align};
  color: ${({ color = Colors.GRAY }) => color};
`;
