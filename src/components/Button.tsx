import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "~components";
import { Colors, Shadows, Sizes } from "~constants";

interface Props {
  children: React.ReactNode;
  large?: boolean;
  color?: Colors;
  to?: string;
  onPress?: (arg: any) => void;
}

export function Button({ children, large, color, to, onPress }: Props) {
  let renderContent = () => (
    <Container color={color} role="button" large={large} onClick={onPress}>
      <Text color={Colors.WHITE} size={large ? Sizes.LARGE : Sizes.SMALL}>
        {children}
      </Text>
    </Container>
  );

  if (typeof to === "string") return <Link to={to}>{renderContent()}</Link>;

  return renderContent();
}

let Container = styled.button<Pick<Props, "large">>`
  border: unset;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background: ${({ color = Colors.ROSE }) => color};
  padding: ${({ large }) => (large ? "15px" : "5px")};
  min-width: ${({ large }) => large && "100px"};
  border-radius: ${({ large }) => (large ? "10px" : "3px")};
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: ${Shadows.LIGHT};
  &:hover {
    box-shadow: ${Shadows.MEDIUM};
  }
  &:active {
    filter: brightness(110%);
  }
  &:focus {
    outline: none;
  }
`;
