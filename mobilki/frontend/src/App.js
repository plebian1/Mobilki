import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import AppointmentDetailsPage from "./Pages/AppointmentDetailsPage";
import AppointmentPage from "./Pages/AppointmentPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ResultsDetailsPage from "./Pages/ResultsDetailsPage";
function App() {
  return (
    <Router>
      <div class="App">
        
        <Switch>
          <Route 
            exact path='/'
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )
            } 
          />

          <Route 
          path="/login"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <Redirect to="/home" />
              ) : (
                <LoginPage {...props} />
              )
            }
          />

          <Route 
            path="/register"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <Redirect to="/home" />
              ) : (
                <RegisterPage {...props} />
              )
            }
          />

          <Route 
            path="/appointment/details/:id"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <AppointmentDetailsPage id={props.match.params.id} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route 
            path="/appointment"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <AppointmentPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route 
            path="/results/:id"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <ResultsDetailsPage id={props.match.params.id} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route 
            path="/home"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <HomePage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
