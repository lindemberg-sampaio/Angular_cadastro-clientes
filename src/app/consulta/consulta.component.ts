import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormatadorService } from '../formatador.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  imports: [ FlexLayoutModule
           , MatCardModule
           , FormsModule
           , MatFormFieldModule
           , MatInputModule
           , MatIconModule
           , MatButtonModule
           , MatTableModule
           , CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  listaClientes : Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "email", "cpf", "dataNascimento", "acoes"];
  nomeBusca: string = '';
  private snack: MatSnackBar = inject(MatSnackBar);


  constructor(
    private service : ClienteService,
    private router : Router,
    public formatador: FormatadorService
  ){
  }

  ngOnInit(){
    this.listaClientes = this.service.pesquisarClientes('');
    console.log(this.listaClientes);
  }


  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string)
  {
    this.router.navigate(['/cadastro'], { queryParams: { 'id' : id } } );
  }


  preparaDeletar(cliente : Cliente)
  {
    cliente.deletando = true;
  }

  deletar(cliente : Cliente)
  {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.snack.open("Registro excluído com sucesso", 'Ok');
  }

}
