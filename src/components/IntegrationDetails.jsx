import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getflows } from "../Services/integrationServices";
import "./IntegrationDetails.css";

function IntegrationDetails() {
  let { id } = useParams();

  const [flows, setflows] = useState([]);

  const getflowsAsync = async () => {
    const flows = await getflows(id);
    console.log(flows);
    setflows(flows);
  };

  useEffect(() => {
    getflowsAsync();
  }, []);

  return (
    <div className="component">
      <table className="table">
        <thead>
          <tr className="table__header">
            <th>Flow Name</th>
            <th>Description</th>
            <th>Created date</th>
          </tr>
        </thead>
        <tbody>
          {flows.map((flow) => {
            return (
              <tr className="tablerows">
                <td className="tablerows">
                  <Link to={`/integration/${id}/flow/${flow.id}`}>
                    {flow.name}
                  </Link>
                </td>
                <td className="tablerows">{flow.description}</td>
                <td>{flow.createdDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default IntegrationDetails;
