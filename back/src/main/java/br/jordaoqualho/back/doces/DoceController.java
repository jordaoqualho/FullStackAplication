package br.jordaoqualho.back.doces;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doces")
public class DoceController {
  private List<Doce> doces = new ArrayList<>();

  public DoceController (){
    doces.add(new Doce("Bombom de morango", "3.20"));
    doces.add(new Doce("Brigadeiro tradicional", "1.50"));
    doces.add(new Doce("Trufa tradicional", "2.00"));
    doces.add(new Doce("Bombom de uva", "2.20"));
  }

  @GetMapping
  public List<Doce> get (){
    return this.doces;
  }

  @PostMapping
  public String post(@RequestBody Doce novo) {
    if (this.doces.contains(novo)) {
      throw new RuntimeException("Já tem esse doce!");      
    }
    this.doces.add(novo);
    return novo.getNome();
  }

  @DeleteMapping("/{id}")
  public void delete (@PathVariable String id) {
    this.doces = this.doces.stream()
    .filter(cor -> cor.getId().equals(id))
    .collect(Collectors.toList());
  }
}
