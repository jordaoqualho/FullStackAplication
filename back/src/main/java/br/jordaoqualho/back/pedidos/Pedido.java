package br.jordaoqualho.back.pedidos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Pedido {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private String nomeDoCliente;
    @Getter
    @Setter
    private LocalDate lancadoEm;
    @Getter
    @Setter
    @Column(scale = 2)
    private BigDecimal valorTotal;
    

    public Pedido() {
        this.id = UUID.randomUUID().toString();
    }

    public Pedido(String nomeDoCliente, LocalDate lancadoEm, BigDecimal valorTotal) {
        this();
        this.nomeDoCliente = nomeDoCliente;
        this.lancadoEm = lancadoEm;
        this.valorTotal = valorTotal;
    }    
   
    
}