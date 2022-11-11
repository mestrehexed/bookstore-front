import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-criar",
  templateUrl: "./livro-criar.component.html",
  styleUrls: ["./livro-criar.component.css"],
})
export class LivroCriarComponent implements OnInit {
  livro: Livro = {
    titulo: "",
    nome_autor: "",
    texto: "",
  };

  id_cat: String = "";

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  cancelar(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      console.log(resposta);
    });
  }
}
