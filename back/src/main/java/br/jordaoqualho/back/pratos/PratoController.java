package br.jordaoqualho.back.pratos;



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
@RequestMapping("/api/pratos")
public class PratoController {
    @Autowired
    private PratoService service; 
   

    @GetMapping
    public Page<Prato> get(Pageable pageRequest,  @RequestParam(name = "termo",required = false) String termo) {
        System.out.println(">>>> [" + termo + "]");
        return service.obterTodos(pageRequest, termo);
    }
 
    @GetMapping("/{idParaEditar}")
    public Prato getById(@PathVariable("idParaEditar") String idParaEditar) {
        return service.obterPeloId(idParaEditar);
    }

    @PutMapping("/{id}")
    public void put(@PathVariable String id, @RequestBody Prato pratoEditado) {
        service.salvar(pratoEditado);
    }

    @PostMapping("/gerar-pratos")
    public String postGerarpratos() {
        service.gerarPratos();
        return "pratos gerados com sucesso!";
    }

    @PostMapping
    public String post(@RequestBody Prato novo) {
        Prato pratoSalvo = service.salvar(novo);
        return pratoSalvo.getId();
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.excluirPeloId(id);
    }
    
    @DeleteMapping("/excluir-todos")
    public void deleteAll() {
        service.excluirTodos();
    }


}