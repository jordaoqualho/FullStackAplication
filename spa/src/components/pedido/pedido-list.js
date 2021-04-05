import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doExcluirPedidos = async (id, name) => {
    await axios.delete(`/api/pedidos/${id}`);
    tempAlert("Pedido de " + name + " excluído!", 5000);
    doGetPedidos(0);
  };

  const doGerarPedidos = async () => {
    await axios.post(`/api/pedidos/gerar-pedidos`);
    tempAlert("10 Pedidos gerados!", 5000);
    doGetPedidos(0);
  };

  const doExcluirTodosPedidos = async () => {
    await axios.delete(`/api/pedidos/excluir-todos`);
    tempAlert("Todos Pedidos excluídos!", 5000);
    doGetPedidos(0);
  };

  const handleExcluir = (id, name) => {
    doExcluirPedidos(id, name);
  };

  const handleGerar = () => {
    doGerarPedidos();
  };

  const handleExcluirTodos = () => {
    doExcluirTodosPedidos();
  };

  const handleSearchInputChange = async (event) => {
    setTermoDeBusca(event.target.value);
    // await doGetPedidos(páginaRequerida);
  };

  const handleSearch = () => {
    doGetPedidos(0);
  };

  const tableData = pedidos.content.map((row) => {
    return (
      <div className="tb" key={row.id}>
        <div className="tb-title">
          <p>{row.id}</p>
          <h2>{row.nomeDoCliente}</h2> <p>{row.lancadoEm}</p>
        </div>
        <div className="tb-price">
          <button onClick={() => history.push(`/pedidos/editar/${row.id}`)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="i-lixo"
            onClick={() => handleExcluir(row.id, row.nomeDoCliente)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <h2>R$ {row.valorTotal},00</h2>
        </div>
      </div>
    );
  });

  useEffect(() => {
    doGetPedidos(páginaRequerida);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [páginaRequerida]);

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
    <div className="container">
      <Menu></Menu>
      <h2>Pedidos Feitos</h2>
      <button className="btn-page" onClick={handleGerar}>
        Gerar Pedidos
      </button>
      <button className="btn-page lixo" onClick={handleExcluirTodos}>
        Excluir Todos
      </button>
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
      <div className="tb-cnt">{tableData}</div>
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
        Página {pedidos.totalPages > 0 ? pedidos.pageable.pageNumber + 1 : 0} de{" "}
        {pedidos.totalPages}
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
