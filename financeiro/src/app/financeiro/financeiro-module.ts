import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FinanceiroRoutingModule } from './financeiro-routing-module';
import { Financeiro } from './financeiro';
import { FinanceiroHomeComponent } from './pages/financeiro-home/financeiro-home.component';
import { FinanceiroMovimentacoesComponent } from './pages/financeiro-movimentacoes/financeiro-movimentacoes.component';

@NgModule({
  declarations: [Financeiro, FinanceiroHomeComponent, FinanceiroMovimentacoesComponent],
  imports: [CommonModule, RouterModule, FinanceiroRoutingModule],
})
export class FinanceiroModule {}
