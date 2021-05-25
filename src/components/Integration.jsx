import React, { useEffect, useState } from "react";
import { getIntegrations } from "../Services/integrationServices";
import "./Integration.css";
import IntegrationCard from "./IntegrationCard";


function Integration() {
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    const otherIntegrations = async () => {
      try {
        const otherIntegrations = await getIntegrations();
        setIntegrations(otherIntegrations);
      } catch (err) {
        console.error(err.message);
      }
    };
    otherIntegrations();
  }, []);

  return (
    <div className="integration">
      <div className="integration__header">
        <h2 className="integration__title">Integrations</h2>
        <button className="integration__new_button">
          Create new integration
        </button>
      </div>
      <div className="integration__body">
        {integrations.length ? (
          integrations.map((i) => (
            <IntegrationCard
              id={i.id}
              name={i.name}
              description={i.description}
              flows = {i.flows}
            />
          ))
        ) : (
          <div>
            There are not integrations, create one
          </div>
        )}
      </div>
    </div>
  );
}

export default Integration;
