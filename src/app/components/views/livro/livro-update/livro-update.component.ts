import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  livro: Livro = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: "",
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    const url = this.service.findByiDlivro(this.livro.id!).subscribe((resposta) => {
        this.livro.titulo = resposta.titulo;
        this.livro.nome_autor = resposta.nome_autor;
        this.livro.texto = resposta.texto;
      });
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate(["categorias"]);
    });
  }

  cancelar():void{
    this.router.navigate(["categorias"]);
  }
}
