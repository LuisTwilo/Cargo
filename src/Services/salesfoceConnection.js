export const authEndpoint =
  "https://login.salesforce.com/services/oauth2/authorize";
const redirectUri = "http://localhost:3000/oauthcallback";
// const clientId =
//   "3MVG9vtcvGoeH2biZPGpStsY7dMsSr9mXXvpOnoLg.IBPqvJKmM6FUC0.tWCBGdfTRD2EW2ih.1p1lkuRyqks";

export const loginUrl = (clientId, state) =>
  `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
