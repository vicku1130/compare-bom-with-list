import React from "react";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Navbar from "./Component/NavBar";
import Landing from "./Page/Landing";
import FileHandling from "./Page/FileHandling";
import ResultPresent from "./Page/ResultPresent";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar />
      <Container className="p-5 m-5">
        <Row className="d-flex  justify-content-center mx-auto text-center">
          <Router>
            <Landing path="/" />
            <FileHandling path="/file-handle" />
            <ResultPresent path="/result" />
          </Router>
        </Row>
      </Container>
    </>
  );
}

export default App;
