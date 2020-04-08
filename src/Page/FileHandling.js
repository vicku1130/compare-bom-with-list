import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { navigate } from "@reach/router";
import DragCard from "../Component/DragCard";
import { FaSearch } from "react-icons/fa";

export default function FileHandling() {
  const [nud, setNud] = useState({});
  const [bom, setBom] = useState({});
  const [nudSet, setNudFlag] = useState(false);
  const [bomSet, setBomFlag] = useState(false);

  const receivedNud = (obj) => {
    setNud(obj);
    setNudFlag(true);
  };

  const receivedBom = (obj) => {
    setBom(obj);
    setBomFlag(true);
  };

  const transferData = (e) => {
    navigate(`/result`, { state: { NUD: nud, BOM: bom } });
  };

  return (
    <div>
      <Container>
        <h1 className="text-center font-weight-bold m-auot mb-5">
          Pick The Files For Comparing
        </h1>
        <Row>
          <Col>
            <DragCard
              title="New Component List"
              fileType="NUD"
              callback={(obj) => receivedNud(obj)}
            />
          </Col>
          <Col>
            <DragCard
              title="BOM File"
              fileType="BOM"
              callback={(obj) => receivedBom(obj)}
            />
          </Col>
        </Row>
        <div style={{ height: "50px" }} />
        <Row className="d-flex justify-content-center">
          <Button
            disabled={!nudSet && !bomSet}
            style={{ width: "50%" }}
            onClick={transferData}
          >
            <span className="m-1">
              <FaSearch color="white" />
            </span>{" "}
            Let's Compare
          </Button>
        </Row>
      </Container>
    </div>
  );
}
