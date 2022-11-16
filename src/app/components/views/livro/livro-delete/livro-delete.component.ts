import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-delete",
  templateUrl: "./livro-delete.component.html",
  styleUrls: ["./livro-delete.component.css"],
})
export class LivroDeleteComponent implements OnInit {
  livro: Livro = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: "",
  };

  id_cat: String = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LivroService
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  cancelar():void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
    }

  findById(): void {
    this.service.findByiDlivro(this.livro.id!).subscribe((resposta) => {
      this.livro.titulo = resposta.titulo;
      this.livro.nome_autor = resposta.nome_autor;
    });
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe(
      (reposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro Deletado Com Sucesso!");
      },
      (err) => {
        this.service.mensagem(err.error.error);
      }
    );
  }
}
