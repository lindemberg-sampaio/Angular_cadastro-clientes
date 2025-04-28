import { Component, OnInit } from '@angular/core';
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
  colunasTable: string[] = ["id", "nome", "email", "cpf", "dataNascimento"];
  nomeBusca: string = '';


  constructor(private service : ClienteService)
  {
  }

  ngOnInit(){
    this.listaClientes = this.service.pesquisarClientes('');
    console.log(this.listaClientes);
  }


  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

}
