import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../App.css";

export const DoceList = () => {
  const [doces, setDoces] = useState([]);

  const doGetCores = async () => {
    const response = await axios.get("/api/doces");
    setDoces(response.data);
  };

  useEffect(() => {
    doGetCores();
  }, []);

  const tableData = doces.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.nome}</td>
        <td>{row.preco}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Listagem de Doces</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Preço</td>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default DoceList;
