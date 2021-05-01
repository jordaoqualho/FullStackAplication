import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import Menu from "../menu/menu";
import tempAlert from "../alert/alert";
import DeleteConfirm from "../alert/deleteConfirm";

const PedidoList = (props) => {
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [pedidos, setPedidos] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [confirmState, setConfirmState] = useState(false);
  const [tempNome, setTempNome] = useState("");
  const [tempId, setTempId] = useState("");

  const doGetPedidos = async (páginaRequerida, termoDePesquisa) => {
    const response = await axios.get(
      `/api/pedidos?termo=${termoDePesquisa}&page=${páginaRequerida}`
    );
    setPedidos(response.data);
  };

  useEffect(() => {
    doGetPedidos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doExcluirPedidos = async (id, name) => {
    await axios.delete(`/api/pedidos/${id}`);
    if (pedidos.content.length === 1) {
      doGetPedidos(
        statusPesquisa.páginaAtual - 1,
        statusPesquisa.termoDePesquisa
      );
    } else {
      doGetPedidos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    }
    tempAlert("Pedido de " + name + " excluído!", 5000);
    setConfirmState(false);
  };

  const handleExcluir = (id, name) => {
    setConfirmState(true);
    setTempId(id);
    setTempNome(name);
  };

  const handleSearchInputChange = async (event) => {
    const novoStatusPesquisa = {
      ...statusPesquisa,
      termoDePesquisa: event.target.value,
    };
    setStatusPesquisa(novoStatusPesquisa);
  };

  useEffect(() => {
    doGetPedidos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa]);

  const doGerarPedidos = async () => {
    await axios.post(`/api/pedidos/gerar-pedidos`);
    tempAlert("10 Pedidos gerados!", 5000);
    doGetPedidos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarPedidos();
  };

  const doExcluirTodosPedidos = async () => {
    await axios.delete(`/api/pedidos/excluir-todos`);
    tempAlert("Todos Pedidos excluídos!", 5000);
    doGetPedidos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleExcluirTodos = () => {
    doExcluirTodosPedidos();
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluirPratos={doExcluirPedidos}
        id={tempId}
        nome={tempNome}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const tableData =
    pedidos.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      pedidos.content.map((row) => {
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
      })
    );

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= pedidos.totalPages) {
      requestedPage = pedidos.totalPages - 1;
    }
    doGetPedidos(requestedPage, statusPesquisa.termoDePesquisa);
  };

  return (
    <div className="container">
      <Menu></Menu>
      {renderConfirmDelete()}
      <h2>Pedidos Feitos</h2>
      <button className="btn-page" onClick={handleGerar}>
        Gerar Pedidos
      </button>
      <button className="btn-page lixo" onClick={handleExcluirTodos}>
        Excluir Todos
      </button>
      <form className="pd">
        <input
          className="cb"
          type="text"
          value={statusPesquisa.termoDePesquisa}
          placeholder="O que deseja buscar?"
          onChange={handleSearchInputChange}
        />
        <button className="bb">Pesquisar</button>
      </form>
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
