import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Financeiro } from './financeiro';

const routes: Routes = [{ path: '', component: Financeiro }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceiroRoutingModule {}
