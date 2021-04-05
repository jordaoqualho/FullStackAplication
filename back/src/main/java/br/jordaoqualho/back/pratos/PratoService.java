package br.jordaoqualho.back.pratos;


import java.math.BigDecimal;

import javax.transaction.Transactional;

import com.github.javafaker.Faker;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PratoService {
    @Autowired
    private PratoRepository repository;
      Faker faker = new Faker();

    public Page<Prato> obterTodos(Pageable pageRequest, String termo) {
        if (termo == null || termo.trim().length() == 0) {
             return repository.findAll(pageRequest);            
        }
        return repository.findBynomeDoPratoLike(pageRequest, "%" + termo + "%");
    }  

    public Prato obterPeloId(String id) {
        return repository.findById(id).orElseGet(Prato::new);
    }

    public void excluirPeloId(String id) {
        repository.deleteById(id);
    }

    public void excluirTodos() {
        repository.deleteAll();
    }


    public Prato salvar(Prato prato) {
        return repository.save(prato);
    }    

    public void gerarPratos(){     
        for (int i = 0; i < 10; i++) {
            String name = faker.food().dish();
            Double price = faker.number().randomDouble(1, 2, 6);
            int estoque = faker.number().numberBetween(100, 1000);
            Prato novo = new Prato(name, new BigDecimal(price), estoque);
            repository.save(novo);
        }     
    }
   
}