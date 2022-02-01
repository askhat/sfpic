import React from "react";
import styled from "styled-components";
import { Colors } from "../constants";

interface Props {
  color?: Colors;
}

// https://loading.io/css/
export function Spinner({ color = Colors.WHITE }: Props) {
  return (
    <Container>
      <Ellipsis color={color}>
        <div/>
        <div/>
        <div/>
        <div/>
      </Ellipsis>
    </Container>
  );
}

let Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

let Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & > div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${({ color }) => color};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & > div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & > div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & > div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & > div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
