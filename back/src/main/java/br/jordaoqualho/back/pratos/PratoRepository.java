package br.jordaoqualho.back.pratos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

public interface PratoRepository extends JpaRepository<Prato, String> {   
    
    Page<Prato> findBynomeDoPratoLike(Pageable pageRequest, String nomeDoPrato);

}