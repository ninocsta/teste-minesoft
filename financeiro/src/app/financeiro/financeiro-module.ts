import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing-module';
import { Financeiro } from './financeiro';

@NgModule({
  declarations: [Financeiro],
  imports: [CommonModule, FinanceiroRoutingModule],
})
export class FinanceiroModule {}
