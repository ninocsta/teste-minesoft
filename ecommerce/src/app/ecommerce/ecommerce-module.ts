import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing-module';
import { Ecommerce } from './ecommerce';

@NgModule({
  declarations: [Ecommerce],
  imports: [CommonModule, EcommerceRoutingModule],
})
export class EcommerceModule {}
