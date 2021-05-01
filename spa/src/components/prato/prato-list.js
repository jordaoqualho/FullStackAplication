import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import Menu from "../menu/menu";
import tempAlert from "../alert/alert";
import DeleteConfirm from "../alert/deleteConfirm";

const PratoList = (props) => {
  const { statusPesquisa, setStatusPesquisa } = props;
  const history = useHistory();
  const [pratos, setPratos] = useState({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [confirmState, setConfirmState] = useState(false);
  const [tempNome, setTempNome] = useState("");
  const [tempId, setTempId] = useState("");

  const doGetPratos = async (páginaRequerida, termoDePesquisa) => {
    const response = await axios.get(
      `/api/pratos?termo=${termoDePesquisa}&page=${páginaRequerida}`
    );
    setPratos(response.data);
  };

  useEffect(() => {
    doGetPratos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInputChange = async (event) => {
    const novoStatusPesquisa = {
      ...statusPesquisa,
      termoDePesquisa: event.target.value,
    };
    setStatusPesquisa(novoStatusPesquisa);
  };

  useEffect(() => {
    doGetPratos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPesquisa.termoDePesquisa]);

  const doGerarPratos = async () => {
    await axios.post(`/api/pratos/gerar-pratos`);
    tempAlert("10 Pratos gerados!", 5000);
    doGetPratos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleGerar = () => {
    doGerarPratos();
  };

  const doExcluirPratos = async (id, name) => {
    await axios.delete(`/api/pratos/${id}`);
    if (pratos.content.length === 1) {
      doGetPratos(
        statusPesquisa.páginaAtual - 1,
        statusPesquisa.termoDePesquisa
      );
    } else {
      doGetPratos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
    }
    tempAlert("Prato de " + name + " excluído!", 5000);
    setConfirmState(false);
  };

  const handleExcluir = (id, name) => {
    setConfirmState(true);
    setTempId(id);
    setTempNome(name);
  };

  const doExcluirTodosPratos = async () => {
    await axios.delete(`/api/pratos/excluir-todos`);
    tempAlert("Todos Pratos excluídos!", 5000);
    doGetPratos(statusPesquisa.páginaAtual, statusPesquisa.termoDePesquisa);
  };

  const handleExcluirTodos = () => {
    doExcluirTodosPratos();
  };

  const renderConfirmDelete = () => {
    return (
      <DeleteConfirm
        estado={confirmState}
        doExcluirPratos={doExcluirPratos}
        id={tempId}
        nome={tempNome}
        setConfirmState={setConfirmState}
      ></DeleteConfirm>
    );
  };

  const tableData =
    pratos.content.length === 0 ? (
      <p>Nada encontrado!</p>
    ) : (
      pratos.content.map((row) => {
        return (
          <div className="tb" key={row.id}>
            <div className="tb-title">
              <p>{row.id}</p>
              <h2>{row.nomeDoPrato}</h2> <p>{row.estoque} no estoque</p>
            </div>
            <div className="tb-price">
              <button onClick={() => history.push(`/pratos/editar/${row.id}`)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="i-lixo"
                onClick={() => handleExcluir(row.id, row.nomeDoPrato)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <h2>R$ {row.preco}0</h2>
            </div>
          </div>
        );
      })
    );

  const requestPage = (requestedPage) => {
    if (requestedPage <= 0) {
      requestedPage = 0;
    }
    if (requestedPage >= pratos.totalPages) {
      requestedPage = pratos.totalPages - 1;
    }
    doGetPratos(requestedPage, statusPesquisa.termoDePesquisa);
  };

  return (
    <div className="container">
      <Menu></Menu>
      {renderConfirmDelete()}
      <h2>Lista de Pratos</h2>
      <button className="btn-page" onClick={handleGerar}>
        Gerar Pratos
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
      <button className="btn" onClick={() => history.push("/pratos/novo")}>
        Criar Novo Prato
      </button>
      <button
        className="btn-page"
        onClick={() => requestPage(pratos.pageable.pageNumber - 1)}
      >
        {"<"}
      </button>
      <span>
        Página {pratos.totalPages > 0 ? pratos.pageable.pageNumber + 1 : 0} de{" "}
        {pratos.totalPages}
      </span>
      <button
        className="btn-page"
        onClick={() => requestPage(pratos.pageable.pageNumber + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default PratoList;
