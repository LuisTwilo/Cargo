import React from "react";
import "./IntegrationCard.css";

import { Link } from "react-router-dom";
import { ReactComponent as Menu } from "../assets/fontawesome-free-5.15.1-web/svgs/solid/ellipsis-h.svg";

function IntegrationCard({ id, name, description, flows }) {
  return (
    <Link className="integrationCard__roputeWrapper" to={`/integration/${id}`}>
      <div className="integrationCard">
        <div className="integrationCard__header">
          <h2 className="integrationCard__header"> {name}</h2>
          <Menu />
        </div>
        <div className="integrationCard__body">{description}</div>
        <div className="integrationCard__footer">{flows.length} Flows</div>
      </div>
    </Link>
  );
}

export default IntegrationCard;
