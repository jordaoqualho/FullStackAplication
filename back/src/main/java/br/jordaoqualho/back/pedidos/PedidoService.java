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
        /*
        for (int i = 0; i < 100; i++) {
            String nome = faker.name().fullName();
            String date = (
                 faker.number().numberBetween(1, 29)+
                faker.number().numberBetween(1, 12)+
                 "-" + 
            LocalDate localDate = LocalDate.parse(date);            
            int preco = faker.number().numberBetween(100, 1000);
            Pedido novo = new Pedido(nome, localDate, new BigDecimal(preco));
            repository.save(novo);            
        }*/

        for (int i = 0; i < 10; i++) {
            Pedido novo = new Pedido("Pedido " + i, LocalDate.now(), new BigDecimal(i * 1.10));
            repository.save(novo);
        }
    }
   
}