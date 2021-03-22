import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import Menu from "../menu/menu";
import tempAlert from "../alert/alert";

const PedidoList = () => {
  const history = useHistory();
  const [pedidos, setPedidos] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [páginaRequerida, setPáginaRequerida] = useState(0);

  const doGetPedidos = async (páginaRequerida) => {
    const response = await axios.get(
      `/api/pedidos?termo=${termoDeBusca}&page=${páginaRequerida}`
    );
    setPedidos(response.data);
  };

  useEffect(() => {
    doGetPedidos(0);
  }, []);

  const doExcluirPedidos = async (id) => {
    await axios.delete(`/api/pedidos/${id}`);
    tempAlert("Pedido removido!", 5000);
    doGetPedidos(0);
  };

  const handleExcluir = (id) => {
    doExcluirPedidos(id);
  };

  const handleSearchInputChange = (event) => {
    setTermoDeBusca(event.target.value);
    doGetPedidos(páginaRequerida);
  };

  const handleSearch = () => {
    doGetPedidos(0);
  };

  const tableData = pedidos.content.map((row) => {
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

  useEffect(() => {
    doGetPedidos(páginaRequerida);
  }, []);

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= pedidos.totalPages) {
      requestedPage = pedidos.totalPages - 1;
    }
    setPáginaRequerida(requestedPage);
  };

  return (
    <div>
      <Menu></Menu>
      <h2>Pedidos Feitos</h2>
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
      <button
        className="btn-page"
        onClick={() => requestPage(pedidos.pageable.pageNumber - 1)}
      >
        {"<"}
      </button>
      <span>
        Página  {pedidos.pageable.pageNumber + 1} de {pedidos.totalPages}
      </span>
      <button
        className="btn-page"
        onClick={() => requestPage(pedidos.pageable.pageNumber + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default PedidoList;
