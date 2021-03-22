package br.jordaoqualho.back.pedidos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface PedidoRepository extends JpaRepository<Pedido, String> {

    /*
    @Query(value ="select p from Produto p where p.descricao like %:termo%")
    List<Produto> encontrarComTermo(String termo);
    */

    // List<Pedido> findBynomeDoClienteLike(String nomeDoCliente);
    
    Page<Pedido> findBynomeDoClienteLike(Pageable pageRequest, String nomeDoCliente);

}