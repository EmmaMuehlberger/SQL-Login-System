import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Login from "./components/Authentification/Login";
import Register from "./components/Authentification/Register";
import Welcome from "./components/Welcome/Welcome";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Register} />
      </Router>
    </div>
  );
}

export default App;
