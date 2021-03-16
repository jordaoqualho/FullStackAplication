package br.jordaoqualho.back.pedidos;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidoService {
    @Autowired
    private PedidoRepository repository;

    public List<Pedido> obterTodos(String termo) {
        if (termo == null || termo.trim().length() == 0) {
            return repository.findAll();            
        }
        //return repository.encontrarComTermo(termo);            
        return repository.findBynomeDoClienteLike("%" + termo + "%");
    } 

    public Pedido obterPeloId(String id) {
        return repository.findById(id).orElseGet(Pedido::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public Pedido salvar(Pedido pedido) {
        return repository.save(pedido);
    }
    
}