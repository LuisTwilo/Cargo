import React, { useState } from "react";
import "./Connector.css";
import { loginUrl } from "../Services/salesfoceConnection";

function Connector({ isSource, name, integrationId, flowId }) {
  const [clientId, setClientId] = useState("");
  const [connectionName, setConnectionName] = useState("");

  return (
    <div className="">
      {isSource ? (
        <div className="connectionCard">
          <div className="connectionCard__header">
            <h2> {name} </h2>
          </div>
          <div className="integrationCard__body">
            <div>
              <input
                type="text"
                value={connectionName}
                placeholder={"Connection Name"}
                onChange={(e) => setConnectionName(e.target.value)}
              />

              <input
                type="text"
                value={clientId}
                placeholder={"Client Id"}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>
            <a
              href={loginUrl(
                clientId,
                `${clientId}+${connectionName}+${integrationId}+${flowId}`
              )}
            >
              <button>Connect</button>
            </a>
          </div>
          <div className="integrationCard__footer"></div>
        </div>
      ) : (
        <div>This is a end connector</div>
      )}
    </div>
  );
}

export default Connector;
