import React, { useContext } from "react";
import styled from "styled-components";
import { FadeIn } from "animate-css-styled-components";
import { Redirect } from "react-router-dom";
import { Card, Text, Image, Button, Spinner } from "~components";
import { Sizes, Alignments } from "~constants";
import { User, Bucket } from "~context";

export function Welcome() {
  let user = useContext(User);
  let bucket = useContext(Bucket);

  let renderMenu = () => {
    if (!user.isAuth) return;
    return [
      <UserBadge key={0}>
        <Image round size={Sizes.SMALL} src={user.profile?.picture} />
        <Text align={Alignments.LEFT} bold size={Sizes.SMALL}>
          {user.profile?.name}
        </Text>
      </UserBadge>,
      <Button key={1} onPress={user.logout}>
        Log Out
      </Button>
    ];
  };

  if (user.isLoading) return <Spinner />;
  if (!bucket.isEmpty) return <Redirect to="/files" />;

  return (
    <Card extra={renderMenu()}>
      <Text size={Sizes.LARGE}>
        SFPic is an easy and secure way&nbsp;to share files
      </Text>
      <Image src={require("~assets/welcome.png")} />
      {user.isAuth ? (
        <Button large to={"/"}>
          Get Started
        </Button>
      ) : (
        <Button large onPress={user.login}>
          Log In
        </Button>
      )}
    </Card>
  );
}

// FIXME Repeated in Dropzone
const UserBadge = styled(FadeIn)`
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
  }
`;
