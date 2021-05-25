import React, { useEffect } from "react";
// import { Redirect } from "react-router";
import { createConnection } from "../Services/integrationServices";
import { getTokenFromURL } from "../Services/salesfoceConnection";

function OAuthCallback(props) {
  console.log(props);
  useEffect(() => {
    const createNewConnection = async () => {
      try {
        const token = getTokenFromURL();
        window.location.hash = "";
        const response = await createConnection(token);
        console.log(response);
        props.history.replace("/integration/2/flow/3");
      } catch (err) {
        console.error(err);
      }
    };
    createNewConnection();
  });

  return <></>;
}

export default OAuthCallback;
