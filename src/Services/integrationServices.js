import axios from "axios";
import {
  INTEGRATIONS_URL,
  INSTANCE_URL,
  CONNECTIONS_URL,
  FLOWS_URL,
} from "./properties";

const headers = {
  "Access-Control-Allow-Origin": "*",
};

export const getIntegrations = async () => {
  try {
    const response = await axios({
      method: "GET",
      headers: headers,
      url: INSTANCE_URL + INTEGRATIONS_URL,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createConnection = async (token) => {
  try {
    const response = await axios({
      method: "POST",
      headers: headers,
      url: INSTANCE_URL + CONNECTIONS_URL + "/oauthcallback",
      data: token,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getflows = async (integrationId) => {
  try {
    const response = await axios({
      method: "GET",
      headers,
      url: INSTANCE_URL + FLOWS_URL + "/" + integrationId,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = async () => {
  try {
    const response = await axios({
      method: "GET",
      headers,
      url: INSTANCE_URL + "/" + CONNECTIONS_URL,
    });

    let data = response.data.map((connection) => {
      return {
        value: connection._id,
        ...connection,
      };
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSalesforceObjects = async (connectionId) => {
  try {
    const response = await axios({
      method: "GET",
      headers,
      url: `${INSTANCE_URL}/flow/salesforce/${connectionId}/objects`,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getObjectFields = async (connectionId, object) => {
  try {
    const response = await axios({
      method: "GET",
      headers,
      url: `${INSTANCE_URL}/flow/salesforce/${connectionId}/objects/${object}`,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
