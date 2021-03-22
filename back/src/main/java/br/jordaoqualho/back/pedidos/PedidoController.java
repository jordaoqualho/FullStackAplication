package br.jordaoqualho.back.pedidos;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Pedido> get(Pageable pageRequest,  @RequestParam(name = "termo",required = false) String termo) {
        System.out.println(">>>> [" + termo + "]");
        return service.obterTodos(pageRequest, termo);
    }
 
    @GetMapping("/{idParaEditar}")
    public Pedido getById(@PathVariable("idParaEditar") String idParaEditar) {
        return service.obterPeloId(idParaEditar);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable String id, @RequestBody Pedido pedidoEditado) {
        service.salvar(pedidoEditado);
    }

    @PostMapping("/gerar-pedidos")
    public String postGerarPedidos() {
        service.gerarPedidos();
        return "Pedidos gerados com sucesso!";
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