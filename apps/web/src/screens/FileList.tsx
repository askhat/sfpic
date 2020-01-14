import { FadeIn } from "animate-css-styled-components";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Card, FileInput, Icon, Spinner, Text } from "~components";
import { Alignments, Colors, FileTypes, Sizes } from "~constants";
import { Bucket, User } from "~context";
import { bytesToSize, ellipsize } from "~helpers";

export function FileList() {
  let history = useHistory();
  let bucket = useContext(Bucket);
  let user = useContext(User);

  if (user.isLoading) return <Spinner />;

  let [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  let [selectedSize, setSelectedSize] = useState<number>(0);

  useEffect(() => {
    let id = history.location.pathname.replace(/\/files\/?/, "");
    if (!id) return;
    bucket.open(id);
  }, [history.location.pathname]);

  useEffect(() => {
    setSelectedSize(selectedFiles.reduce((acc, el) => (acc += el.size), 0));
  }, [selectedFiles]);

  let handleCheck = (state: boolean, file: File) => {
    if (state) setSelectedFiles([...selectedFiles, file]);
    else setSelectedFiles(selectedFiles.filter(f => f != file));
  };

  let handleRemove = () => {
    bucket.remove(selectedFiles);
    setSelectedFiles([]);
  };

  let handleUpload = async () => {
    let id = await bucket.upload(bucket.files);
    history.push("/files/" + id);
  };

  let renderReport = () => {
    let { length } = selectedFiles;
    if (length) {
      return `${length} files, ${bytesToSize(selectedSize)}`;
    }
    return `${bucket.files.length} files, ${bytesToSize(bucket.size)} total`;
  };

  let renderMenu = () => (
    <Menu>
      <Text align={Alignments.LEFT}>{renderReport()}</Text>
      <ButtonBlock>
        {selectedFiles.length ? (
          <Button color={Colors.CORAL} onPress={handleRemove}>
            Remove
          </Button>
        ) : (
          <FileInput color={Colors.CIAN} onChange={bucket.add}>
            Add More
          </FileInput>
        )}
        <Button onPress={() => bucket.remove(bucket.files)}>Cancel</Button>
      </ButtonBlock>
    </Menu>
  );

  return (
    <Card extra={renderMenu()} block={bucket.isLoading}>
      <List>
        {bucket.files.map((file: File) => {
          return (
            <Item key={file.name}>
              <Icon type={FileTypes.IMAGE}>
                <input
                  onChange={e => handleCheck(e.target.checked, file)}
                  type="checkbox"
                />
              </Icon>
              <Info>
                <Text size={Sizes.LARGE} align={Alignments.LEFT}>
                  {ellipsize(file.name, 18)}
                </Text>
                <Text align={Alignments.LEFT} size={Sizes.SMALL}>
                  {bytesToSize(file.size)}
                </Text>
              </Info>
            </Item>
          );
        })}
      </List>
      <Button large onPress={handleUpload}>
        Upload
      </Button>
    </Card>
  );
}

let Menu = styled(FadeIn)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

let ButtonBlock = styled.div`
  & > * {
    margin: 0 5px;
  }
`;

let List = styled.ul`
  width: 100%;
  position: relative;
  overflow-y: scroll;
  margin-bottom: 10px;
`;

let Item = styled.li`
  display: flex;
`;

let Info = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
