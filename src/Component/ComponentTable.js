import React from "react";
import { Table } from "react-bootstrap";

export default function ComponentTable({ data, exsitedBOM, checkExist }) {
  const checkIsExsit = (item) => {
    return (
      checkExist &&
      exsitedBOM.filter((existItem) => existItem.smcPn === item.smcPn).length >
        0
    );
  };

  return (
    <Table striped bordered hover size="sm" style={{ fontSize: "12px" }}>
      <thead>
        <tr>
          <th>BOM-item</th>
          <th>SMC P/N</th>
          <th>MFGR</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.item}
            style={checkIsExsit(item) ? { color: "Green" } : { color: "black" }}
          >
            <th scope="row">{item.item}</th>
            <td>{item.smcPn}</td>
            <td>{item.mfg}</td>
            <td className="text-left">{item.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
