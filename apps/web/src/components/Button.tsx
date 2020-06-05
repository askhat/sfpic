import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "~components";
import { Colors, Shadows, Sizes } from "~constants";

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
  large?: boolean;
  color?: Colors;
  to?: string;
  onPress?(): void;
}

export function Button({
  children,
  large,
  color,
  to,
  onPress = () => null,
  disabled
}: Props) {
  let handleClick = () => {
    if (disabled) return;
    onPress();
  };

  let renderContent = () => (
    <Container
      color={color}
      role="button"
      large={large}
      onClick={handleClick}
      disabled={disabled}
    >
      <Text color={Colors.WHITE} size={large ? Sizes.LARGE : Sizes.SMALL}>
        {children}
      </Text>
    </Container>
  );

  // TODO r u sure this link stuff is gonna work out?
  // to always string as interface say it, so useless checking
  if (typeof to === "string") return <Link to={to}>{renderContent}</Link>;
  // never rise it because return on top will be all the time
  return renderContent();
}

// dir styles? const
let Container = styled.button<Pick<Props, "large"> & Pick<Props, "disabled">>`
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
  filter: ${({ disabled }) => disabled && "opacity(10%)"};
  &:hover {
    box-shadow: ${Shadows.MEDIUM};
  }
  &:active {
    filter: ${({disabled}) => !disabled && "brightness(110%)"};
  }
  &:focus {
    outline: none;
  }
`;
