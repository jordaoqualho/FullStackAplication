import { React, useEffect, useState } from "react";
import axios from "axios";

const HelloComponent = (props) => {
  const [mensagem, setMensagem] = useState("Hello Component");

  const get = async () => {
    const response = await axios.get("/api/hello");
    setMensagem(response.data);
  };

  useEffect(() => {
    get();
  }, []);

  return <div>{mensagem}</div>;
};

export default HelloComponent;
