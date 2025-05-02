import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatadorService {

  constructor() { }

  cpf(valor: string): string {
    const numeros = valor?.replace(/\D/g, '');
    if (!numeros || numeros.length !== 11) return valor;
    return numeros.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  telefone(valor: string): string
  {
    const numeros = valor?.replace(/\D/g, '');
    
    if (!numeros)
      return valor;

    if (numeros.length === 10)
      return numeros.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');

    if (numeros.length === 11)
      return numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    return valor;
  }

  dataNascimento(valor: string): string
  {
    const numeros = valor?.replace(/\D/g, '');

    if (!numeros || numeros.length !== 8)
      return valor;

    return numeros.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
  }

}
