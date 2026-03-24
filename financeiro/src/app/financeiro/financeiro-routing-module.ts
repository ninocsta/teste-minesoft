import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Financeiro } from './financeiro';
import { FinanceiroHomeComponent } from './pages/financeiro-home/financeiro-home.component';
import { FinanceiroMovimentacoesComponent } from './pages/financeiro-movimentacoes/financeiro-movimentacoes.component';

const routes: Routes = [
  {
    path: '',
    component: Financeiro,
    children: [
      { path: '', component: FinanceiroHomeComponent, pathMatch: 'full' },
      { path: 'movimentacoes', component: FinanceiroMovimentacoesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceiroRoutingModule {}
