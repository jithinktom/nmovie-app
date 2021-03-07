import React from 'react';
import 'antd/dist/antd.dark.css';
import { Layout } from 'antd';
// import { Counter } from './components/counter/Counter';
import { Navbar } from "./containers/navbar/Navbar";
import { Movie } from "./components/MovieDetail/MovieDetail"
import { Actor } from "./components/ActorDetail/ActorDetail"
import { Show } from "./components/ShowDetail/ShowDetail"
import { SearchResults } from "./components/SearchResults/SearchResults"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';


const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Header className="app-header">
            <Navbar />
          </Header>
          <Content>
            <Switch>
              <Route exact path="/">
                <SearchResults />
              </Route>
              <Route path="/search">
                <SearchResults />
              </Route>
              <Route path="/movie/:id">
                <Movie />
              </Route>
              <Route path="/cast/:id">
                <Actor />
              </Route>
              <Route path="/show/:id">
                <Show />
              </Route>
            </Switch>

          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
