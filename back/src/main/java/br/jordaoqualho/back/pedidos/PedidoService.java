package br.jordaoqualho.back.pedidos;


import java.math.BigDecimal;
import java.time.LocalDate;

import javax.transaction.Transactional;

import com.github.javafaker.Faker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidoService {
    @Autowired
    private PedidoRepository repository;
      Faker faker = new Faker();


    public Page<Pedido> obterTodos(Pageable pageRequest, String termo) {
        if (termo == null || termo.trim().length() == 0) {
             return repository.findAll(pageRequest);            
        }
        return repository.findBynomeDoClienteLike(pageRequest, "%" + termo + "%");
    } 

    // public List<Pedido> obterTodos(String termo) {
    //     if (termo == null || termo.trim().length() == 0) {
    //         return repository.findAll();            
    //     }
    //     //return repository.encontrarComTermo(termo);            
    //     return repository.findBynomeDoClienteLike("%" + termo + "%");
    // } 

    public Pedido obterPeloId(String id) {
        return repository.findById(id).orElseGet(Pedido::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public Pedido salvar(Pedido pedido) {
        return repository.save(pedido);
    }    

    public void gerarPedidos(){             
        for (int i = 0; i < 5; i++) {
            String nome = faker.name().fullName();            
            LocalDate localDate = LocalDate.now();            
            int preco = faker.number().numberBetween(100, 1000);
            Pedido novo = new Pedido(nome, localDate, new BigDecimal(preco));
            repository.save(novo);            
        }        
    }
   
}