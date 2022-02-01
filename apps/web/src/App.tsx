import React from "react";
import styled from "styled-components";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Dropzone, Welcome, FileList } from "./screens";
import { Colors } from "./constants";
import { random } from "./helpers";
import { PrivateRoute, UserProvider, BucketProvider } from "./utils";

document.cookie = "SameSite=Secure;"

function App() {
  return (
    <Container>
      <BrowserRouter>
        <UserProvider>
          <BucketProvider>
            <Switch>
              <Route exact path="/welcome">
                <Welcome />
              </Route>
              <PrivateRoute exact path="/">
                <Dropzone />
              </PrivateRoute>
              <PrivateRoute exact path="/files">
                <FileList />
              </PrivateRoute>
              <PrivateRoute exact path="/files/:bucketId">
                <FileList />
              </PrivateRoute>
            </Switch>
          </BucketProvider>
        </UserProvider>
      </BrowserRouter>
    </Container>
  );
}

let backgrounds = [Colors.CIAN, Colors.CORAL, Colors.YELLOW];
let Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: ${backgrounds[random(0, 2)]};
`;

render(<App />, document.getElementById("root"));
