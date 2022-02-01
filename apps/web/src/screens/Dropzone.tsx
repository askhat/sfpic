import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Card, Image, Text, FileInput, Button, Spinner } from "../components";
import { User, Bucket } from "../context";
import { Sizes, Alignments } from "../constants";

export function Dropzone() {
	let bucket = useContext(Bucket);
	let user = useContext(User);

	if (user.isLoading) return <Spinner />;
	if (!bucket.isEmpty) return <Redirect to="/files" />;

	let renderMenu = () => [
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

	return (
		<Card extra={renderMenu()}>
			<Text size={Sizes.LARGE}>Drag stuff over here</Text>
			<Image src={require("../assets/dropzone.png")} />
			<FileInput large onChange={bucket.add}>
				Select files and folders
			</FileInput>
		</Card>
	);
}

// FIXME Repeated in Welcome
const UserBadge = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 5px;
  }
`;
