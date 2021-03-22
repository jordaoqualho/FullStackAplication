package br.jordaoqualho.back.doces;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.github.javafaker.Faker;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doces")
public class DoceController {
  private List<Doce> doces = new ArrayList<>();
  Faker faker = new Faker();


  public DoceController (){
    // doces.add(new Doce("Bombom de morango", "3.20"));
    // doces.add(new Doce("Brigadeiro tradicional", "1.50"));
    // doces.add(new Doce("Trufa tradicional", "2.00"));
    // doces.add(new Doce("Bombom de uva", "2.20"));
    for (int i = 0; i < 15; i++) {
      String name = faker.food().dish();
      Double price = faker.number().randomDouble(1, 2, 6);
      String preco = price.toString();
      doces.add(new Doce(name, preco));      
    }
  }

  @GetMapping
  public List<Doce> get (){
    return this.doces;
  }
  

  @GetMapping("/{idParaEditar}")
  public Doce getById(@PathVariable("idParaEditar") String idParaEditar) {
      return this.doces.stream().filter(doce -> doce.getId().equals(idParaEditar) )
      .findFirst().orElseGet(Doce::new);
  }

  @PostMapping
  public String post(@RequestBody Doce novo) {
    if (this.doces.contains(novo)) {
      throw new RuntimeException("Já tem esse doce!");      
    }
    this.doces.add(novo);
    return novo.getNome();
  }

  @PutMapping("/{id}")
    public void put(@PathVariable String id, @RequestBody Doce doceEditado) {
        this.doces = this.doces.stream()
            .filter(doce -> !doce.getId().equals(id))
            .collect(Collectors.toList());
            
        this.doces.add(doceEditado);
    }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) {
      this.doces = this.doces.stream()
          .filter(doce -> !doce.getId().equals(id))
          .collect(Collectors.toList());
  }
}
