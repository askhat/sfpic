import React from "react";
import styled from "styled-components";
import { BounceInUp } from "animate-css-styled-components";
import { Spinner } from "../components";
import { Colors, Shadows } from "../constants";

interface Props {
  extra?: React.ReactNode;
  children: React.ReactNode;
  block?: boolean;
}

export function Card({ children, extra, block }: Props) {
  return (
    <Container>
      {extra && <Header>{extra}</Header>}
      <Content>
        <Blurring blur={block!}>{children}</Blurring>
      </Content>
      {block && (
        <Blocker>
          <Spinner color={Colors.GRAY} />
        </Blocker>
      )}
    </Container>
  );
}

let Container = styled.div`
  box-shadow: ${Shadows.MEDIUM};
  background: ${Colors.WHITE};
  width: 440px;
  height: 640px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

let Header = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

let Content = styled(BounceInUp)`
  background: ${Colors.WHITE};
  box-shadow: ${Shadows.MEDIUM};
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex: 1;
  overflow: hidden;
`;

let Blurring = styled.div<{ blur: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  filter: ${({ blur }) => blur && "blur(1px)"};
`;

let Blocker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
`;
