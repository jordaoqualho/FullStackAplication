import React, { useEffect, useState } from "react";
import "./alerts.css";

const DeleteConfirm = (props) => {
  const { estado } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    mostrarConfirmação();
    console.log("rodou");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  function mostrarConfirmação() {
    if (open) {
      document.getElementById("box").style.display = "none";
      setOpen(false);
    } else {
      document.getElementById("box").style.display = "block ";
      setOpen(true);
    }
  }

  return (
    <>
      <div className="confirm" id="box">
        <div className="al-container">
          <div className="al-title">Deseja realmente excluir ?</div>
          <div className="al-buttons">
            <button
              className="cnf"
              onClick={() => {
                mostrarConfirmação();
              }}
            >
              Confimar
            </button>
            <button className="can" onClick={() => mostrarConfirmação()}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
