import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// import store from './store/configureStore'

import Jobs from "./components/Jobs";
import Integration from "./components/Integration";
import IntegrationDetails from "./components/IntegrationDetails";
import Flow from "./components/Flow";
import OAuthCallback from "./components/OAuthCallback";
import IntegrationForm from "./components/IntegrationForm";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route
              path="/integration/:integrationId/flow/:flowId"
              component={Flow}
            />
            <Route path="/integration/:id" component={IntegrationDetails} />
            <Route path="/new-integration" component={IntegrationForm} />
            <Route path="/integration" component={Integration} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/oauthcallback" component={OAuthCallback} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
