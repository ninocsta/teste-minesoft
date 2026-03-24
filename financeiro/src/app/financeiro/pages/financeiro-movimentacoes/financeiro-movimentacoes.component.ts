import { Component } from '@angular/core';

@Component({
  selector: 'app-financeiro-movimentacoes',
  templateUrl: './financeiro-movimentacoes.component.html',
  styleUrl: './financeiro-movimentacoes.component.css',
  standalone: false,
})
export class FinanceiroMovimentacoesComponent {
  protected readonly rows = [
    { id: 'FIN-001', descricao: 'Recebimento clientes', valor: '+R$ 12.540,00', tipo: 'entrada' },
    { id: 'FIN-002', descricao: 'Pagamento fornecedores', valor: '-R$ 4.320,00', tipo: 'saida' },
    { id: 'FIN-003', descricao: 'Taxa operacional', valor: '-R$ 320,00', tipo: 'saida' },
  ];
}
