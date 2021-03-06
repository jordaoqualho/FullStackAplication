package br.jordaoqualho.back.doces;

import java.util.UUID;
import lombok.Data;

@Data
public class Doce {
  private String id;
  private String nome;
  private double preco;

  public Doce() {
    this.id = UUID.randomUUID().toString();
  }

  public Doce(String nome, double preco) {
    this();
    this.nome = nome;
    this.preco = preco;
    
  }  
}
