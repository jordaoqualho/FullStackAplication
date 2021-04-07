import React from "react";
import { useHistory } from "react-router-dom";
import Menu from "../menu/menu";
import "./landing.css";

export const LandingPage = () => {
    const history = useHistory();
  return (
    <div>
      <Menu></Menu>
      <h2 className='h2-lnd'>Seja Bem Vindo ao</h2>
      <h1 className='h1-lnd'>
        Food<span className='span-lnd'>Able</span>
      </h1>
      <button className='btn-lnd' onClick={() => history.push(`/pratos`)}>
        Ver Cardápio
      </button>
    </div>
  );
};

export default LandingPage;
