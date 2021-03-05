import { React, useState } from "react";
import "../App.css";

const ContadorComponent = (props) => {
  const [atual, setAtual] = useState(props.min);

  const decrementar = () => {
    if (atual > props.min) {
      setAtual(atual - 1);
    } else {
      alert("Não podemos substituir mais!");
    }
  };

  const incrementar = () => {
    if (atual < props.max) {
      setAtual(atual + 1);
    } else {
      alert("Já chegou no limite!");
    }
  };

  return (
    <div>
      Contador de {props.min} até {props.max}
      <br />
      Atual = {atual}
      <br />
      <button className="btn" onClick={() => decrementar()}>
        -
      </button>
      <button className="btn" onClick={() => incrementar()}>
        +
      </button>
    </div>
  );
};

export default ContadorComponent;
