import { useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { Auth0UserProfile, Auth0Error } from "auth0-js";
import { UserContext } from "~context";
import config from "~config/auth0";

/** Provide state for the UserContext */
export function useAuth0(): UserContext<Auth0UserProfile, Auth0Error> {
  let [auth0Client, setAuth0Client] = useState<Auth0Client>();

  let [isLoading, setLoading] = useState<boolean>(true);
  let [isAuth, setAuth] = useState<boolean>(false);
  let [profile, setProfile] = useState<Auth0UserProfile>(null!);
  let [error, setError] = useState<Auth0Error>(null!);

  /** Login with redirect */
  let login = () => {
    auth0Client?.loginWithRedirect();
  };

  /** Logout with redirect */
  let logout = () => {
    auth0Client?.logout();
  };

  let handleRedirect = async () =>
    new Promise<Auth0UserProfile>(async (resolve, reject) => {
      try {
        await auth0Client?.handleRedirectCallback();
        history.pushState("", document.title, location.pathname);
        resolve(await auth0Client?.getUser());
      } catch (err) {
        reject(err);
      }
    });

  let checkSession = async () =>
    new Promise<Auth0UserProfile>(async (resolve, reject) => {
      try {
        await auth0Client?.getTokenSilently();
        resolve(await auth0Client?.getUser());
      } catch (err) {
        reject(err);
      }
    });

  useEffect(() => {
    createAuth0Client(config).then(setAuth0Client);
  }, []);

  useEffect(() => {
    setLoading(!profile && !error);
    setAuth(!!profile);
  }, [error, profile]);

  useEffect(() => {
    if (!auth0Client) return;
    let isRedirect = location.search.startsWith("?code=");
    if (isRedirect) {
      handleRedirect()
        .then(setProfile)
        .catch(setError);
    } else {
      checkSession()
        .then(setProfile)
        .catch(setError);
    }
  }, [auth0Client]);

  return { profile, isAuth, isLoading, error, login, logout };
}
