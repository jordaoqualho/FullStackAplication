package br.jordaoqualho.back.pratos;

import java.math.BigDecimal;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Prato {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private String nomeDoPrato;    
    @Getter
    @Setter
    @Column(scale = 2)
    private BigDecimal preco;
    @Getter
    @Setter
    private Integer estoque;
    

    public Prato() {
        this.id = UUID.randomUUID().toString();
    }

    public Prato(String nomeDoPrato, BigDecimal preco, Integer estoque) {
        this();
        this.nomeDoPrato = nomeDoPrato;
        this.preco = preco;
        this.estoque = estoque;
    }    
   
    
}