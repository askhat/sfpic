import styled from "styled-components";
import { Sizes } from "../constants";

interface Props {
  round?: boolean;
  size?: Sizes;
}

const pixelSize = new Map<Sizes, string>([
  [Sizes.LARGE, "400px"],
  [Sizes.REGULAR, "250px"],
  [Sizes.SMALL, "25px"]
]);

export let Image = styled.img<Props>`
  max-height: ${({ size = Sizes.REGULAR }) => pixelSize.get(size)};
  border-radius: ${({ round }) => round && "50%"};
`;
