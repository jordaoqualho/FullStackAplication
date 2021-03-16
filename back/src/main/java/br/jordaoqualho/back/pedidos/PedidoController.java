package br.jordaoqualho.back.pedidos;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    @Autowired
    private PedidoService service;    

    @GetMapping
    public List<Pedido> get(@RequestParam(name = "termo",required = false) String termo) {
        System.out.println(">>>> [" + termo + "]");
        return service.obterTodos(termo);
    }
 
    @GetMapping("/{idParaEditar}")
    public Pedido getById(@PathVariable("idParaEditar") String idParaEditar) {
        return service.obterPeloId(idParaEditar);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable String id, @RequestBody Pedido pedidoEditado) {
        service.salvar(pedidoEditado);
    }

    @PostMapping
    public String post(@RequestBody Pedido novo) {
        Pedido pedidoSalvo = service.salvar(novo);
        return pedidoSalvo.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.excluirPeloId(id);
    }
    
}