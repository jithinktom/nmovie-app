import React from 'react';
import 'antd/dist/antd.dark.css';
import { Layout } from 'antd';
// import { Counter } from './components/counter/Counter';
import { Navbar } from "./containers/navbar/Navbar";
import { Movie } from "./components/MovieDetail/MovieDetail"
import { Actor } from "./components/ActorDetail/ActorDetail"
import { SearchResults } from "./components/SearchResults/SearchResults"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';


const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="app-header">
          <Navbar />
        </Header>
        <Content>
          <Router>
            <Switch>
              <Route exact path="/">
                {/* <Counter /> */}
              </Route>
              <Route path="/search">
                <SearchResults />
              </Route>
              <Route path="/movie/:slug">
                <Movie />
              </Route>
              <Route path="/actor/:slug">
                <Actor />
              </Route>
            </Switch>
          </Router>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
