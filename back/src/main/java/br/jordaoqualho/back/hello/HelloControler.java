package br.jordaoqualho.back.hello;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloControler {
  @GetMapping
  public String get() {
    return new Date().toString();
  }
}
