import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [ FlexLayoutModule
           , MatCardModule
           , FormsModule
           , MatFormFieldModule
           , MatInputModule
           , MatIconModule
           , MatButtonModule
           , MatDatepickerModule
           , NgxMaskDirective
           , MatSelectModule
           , CommonModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente : Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  private snack: MatSnackBar = inject(MatSnackBar);
  estados : Estado[] = [];
  municipios : Municipio[] = [];

  constructor(
    private service: ClienteService,
    private brasilApiService : BrasilapiService,
    private router: Router,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe( (query: any) => {
      
      const params = query['params'];
      const id = params['id'];

      if(id) {
        
        let clienteEncontrado = this.service.buscarClientePorId(id);

        if (clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }

      }

      this.carregarUfs();

    });
  }


  carregarUfs()
  {
    this.brasilApiService.listarUFs().subscribe({
      next: (listaEstados) =>
        (this.estados = listaEstados.sort((a, b) =>
          a.sigla.localeCompare(b.sigla)
        )),           // consumindo a API para popular o array, em ordem alfabética
      error: erro => console.log("Ocorreu um erro", erro)
    });

  }


  carregarMunicipios(event: MatSelectChange)
  {
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log("Ocorreu um erro: ", erro)
    });
  }


  salvarDadosCliente(){

    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Salvo com sucesso!");
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem("Atualizado com sucesso!");
    }
  }


  mostrarMensagem(mensagem: string)
  {
    this.snack.open(mensagem, 'Ok');
  }
  
  
}
