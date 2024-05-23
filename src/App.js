import logo from './logo.svg';
import './App.css';
import Layout from './layouts';
import Search from './pages/search';
import About from './pages/about';
import Details from './pages/detail';

import { Routes, Route, Navigate, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
          <Routes>
              <Route path={"/"} exact element={<Search />} />
              <Route path={"/about"} exact element={<About />} />
              <Route path={"/detail"} exact element={<Details/>} />
              <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
