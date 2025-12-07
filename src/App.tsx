import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <Link to="/" className="logo">
              <h1>Dashboard</h1>
            </Link>
            <nav>
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <UserList />
              </Route>
              <Route path="/user/:id">
                <UserDetail />
              </Route>
            </Switch>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>Prueba Técnica Front-End React - {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;