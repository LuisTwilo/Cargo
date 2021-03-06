import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  getConnections,
  getObjectFields,
  getSalesforceObjects,
} from "../Services/integrationServices";
import "./Flow.css";

function Flow() {
  // let { integrationId, flowId } = useParams();
  const [connections, setConnections] = useState([]);
  const [isSalesforce, setIsSalesforce] = useState(false);
  const [isCsv, setIsCsv] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceConnectionId, setSourceConnectionId] = useState("");
  const [endConnectionId, setEndConnectionId] = useState("");
  const [sourceSalesforceObjects, setSourceSalesforceObjects] = useState([]);
  const [endSalesforceObjects, setEndSalesforceObjects] = useState([]);
  const [currentSourceObject, setCurrentSourceObject] = useState("");
  const [currentEndObject, setCurrentEndObject] = useState("");
  const [sourceFields, setSourceFields] = useState([]);
  const [endFields, setEndFields] = useState([]);
  const [selectedfields, setSelectedFields] = useState([]);
  const [query, setQuery] = useState("");

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const setIntegrationsOnFirstRender = async () => {
      setConnections(await getConnections());
    };
    setIntegrationsOnFirstRender();
  }, []);

  const handleInitialChange = async (initial) => {
    if (initial === "salesforce") {
      setIsSalesforce(true);
      setIsCsv(false);
    } else {
      setIsSalesforce(false);
      setIsCsv(true);
    }
  };

  const handleSourceConnectionChange = async (connectionId) => {
    setIsLoading(true);
    setSourceConnectionId(connectionId);
    setSourceSalesforceObjects(await getSalesforceObjects(connectionId));
    setIsLoading(false);
  };

  const handleEndConnectionChange = async (connectionId) => {
    setIsLoading(true);
    setEndConnectionId(connectionId);
    setEndSalesforceObjects(await getSalesforceObjects(connectionId));
    setIsLoading(false);
  };

  const handleSourceObjectChange = async (currentObject) => {
    setCurrentSourceObject(currentObject);
    setSourceFields(await getObjectFields(sourceConnectionId, currentObject));
  };

  const handleEndObjectChange = async (currentObject) => {
    setCurrentEndObject(currentObject);
    setEndFields(await getObjectFields(endConnectionId, currentObject));
    console.log(endFields);
  };

  const handleCSVSubmit = async (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let lines = reader.result.split("\n");
      let result = [];
      let headers = lines[0]
        .split(",")
        .map((title) => title.replace(/['"]+/g, ""));

      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j]
            ? currentline[j].replace(/['"]+/g, "")
            : "";
        }
        result.push(obj);
      }
      setCsvColumns(
        headers.map((header) => ({ value: header, label: header }))
      );
      setSelectedFields(
        headers.map((header) => ({ value: header, label: header }))
      );
      setCsvData(result);
    };
  };

  const handleSelectedFields = (selectedFields) => {
    setSelectedFields(selectedFields);
    createQuery(selectedFields);
  };

  const createQuery = (selectedfields) => {
    if (selectedfields) {
      const queryText = selectedfields.map((item) => item.value).join(",+");
      const query = `SELECT+${queryText}+FROM+${currentSourceObject}`;
      setQuery(query);
    }
  };

  return (
    <div className="flow">
      <div className="source">
        <div>
          <label htmlFor="initial">What do you want to do?</label>
          <Select
            options={[
              { value: "1", label: " " },
              { value: "salesforce", label: "Connect with a Salesforce Org" },
              { value: "csv", label: "Import CSV File" },
            ]}
            onChange={(e) => handleInitialChange(e.value)}
            // styles={{ menu: (base) => ({ ...base, position: "relative" }) }}
          />
        </div>

        {isSalesforce && (
          <>
            <div>
              <label htmlFor="connections">Connections</label>
              <div className="connection">
                <div className="connection__select">
                  <Select
                    options={
                      connections
                        ? connections.map((connection) => ({
                            value: connection._id,
                            label: connection.name,
                          }))
                        : []
                    }
                    onChange={(e) => handleSourceConnectionChange(e.value)}
                  />
                </div>
                <button>create new connection</button>
              </div>
            </div>
            <div>
              <label htmlFor="sourceSalesforceObjects">
                Salesforce Objects
              </label>

              <Select
                options={sourceSalesforceObjects}
                onChange={(e) => handleSourceObjectChange(e.value)}
                styles={{ menu: (base) => ({ ...base, position: "relative" }) }}
                isLoading={isLoading}
              />
            </div>
            <div>
              <label htmlFor="sourceFields">Object Fields</label>
              <Select
                closeMenuOnSelect={false}
                onSelectResetsInput={false}
                components={animatedComponents}
                isMulti
                options={sourceFields}
                onChange={(selected) => handleSelectedFields(selected)}
              />
            </div>
          </>
        )}
        {isCsv && (
          <>
            <div>
              <label htmlFor="csvfile">submit csv file</label>
              <input
                id="csvfile"
                type="file"
                accept=".csv"
                onChange={(e) => handleCSVSubmit(e.target.files[0])}
              />
            </div>
          </>
        )}
      </div>

      <div className="destination">
        <div>
          <label htmlFor="connections">End Connection</label>

          <Select
            options={connections.map((connection) => ({
              value: connection._id,
              label: connection.name,
            }))}
            onChange={(e) => handleEndConnectionChange(e.value)}
          />
        </div>

        <div>
          <label htmlFor="sourceSalesforceObjects">Salesforce Objects</label>

          <Select
            options={endSalesforceObjects}
            onChange={(e) => handleEndObjectChange(e.value)}
            styles={{ menu: (base) => ({ ...base, position: "relative" }) }}
            isLoading={isLoading}
          />
        </div>

        <div className="mapping">
          <table>
            <tr>
              <th>End fields</th>
              <th>Source Fields</th>
            </tr>
            {endFields
              ? endFields.map((field) => (
                  <tr>
                    <td>{field.label}</td>
                    <td>
                      <Select options={selectedfields} />
                    </td>
                  </tr>
                ))
              : null}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Flow;
