import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

const PedidoList = () => {
  const history = useHistory();

  const [pedidos, setPedidos] = useState([]);
  const [termoDeBusca, setTermoDeBusca] = useState("");

  const doGetpedidos = async () => {
    const response = await axios.get("/api/pedidos");
    setPedidos(response.data);
  };

  const doSearchPedidos = async () => {
    const response = await axios.get(`/api/pedidos?termo=${termoDeBusca}`);
    setPedidos(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    doGetpedidos();
  }, []);

  const doExcluirPedidos = async (id) => {
    await axios.delete(`/api/pedidos/${id}`);
    doGetpedidos();
  };

  const handleExcluir = (id) => {
    doExcluirPedidos(id);
  };

  const handleSearchInputChange = (event) => {
    setTermoDeBusca(event.target.value);
  };

  const handleSearch = (event) => {
    console.log("Pesquisando por: " + termoDeBusca);
    doSearchPedidos();
  };

  const tableData = pedidos.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.nomeDoCliente}</td>
        <td>{row.lancadoEm}</td>
        <td>{row.valorTotal}</td>
        <td>
          <button onClick={() => handleExcluir(row.id)}>Excluir</button>
          <Link to={`/pedidos/editar/${row.id}`}>
            <button>Editar</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Listagem de pedidos</h2>
      <button className="btn" onClick={() => history.push("/")}>
        Doces
      </button>
      <hr></hr>
      <div className="pd">
        <input
          className="cb"
          type="text"
          placeholder="O que deseja buscar?"
          onChange={handleSearchInputChange}
        />
        <button className="bb" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>Nome Do Cliente</td>
            <td>Lançado em</td>
            <td>Valor Total</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
      <button className="btn" onClick={() => history.push("/pedidos/novo")}>
        Criar Novo Pedido
      </button>
    </div>
  );
};

export default PedidoList;
