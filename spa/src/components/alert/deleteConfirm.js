import React, { useEffect, useState } from "react";
import "./alerts.css";

const DeleteConfirm = (props) => {
  const { estado, doExcluirPratos, setConfirmState, id, nome } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (estado) {
      mostrarConfirmação();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  function mostrarConfirmação() {
    if (open) {
      document.getElementById("box").style.display = "block ";
      setOpen(false);
    } else {
      document.getElementById("box").style.display = "none";
      setOpen(true);
      console.log("entou");
    }
  }

  return (
    <>
      <div className="confirm" id="box">
        <div className="al-container">
          <div className="al-title">
            Deseja realmente excluir <span>{nome}</span>?
          </div>
          <div className="al-buttons">
            <button
              className="cnf"
              onClick={() => {
                mostrarConfirmação();
                doExcluirPratos(id, nome);
              }}
            >
              Confirmar
            </button>
            <button
              className="can"
              onClick={() => {
                mostrarConfirmação();
                setConfirmState(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
