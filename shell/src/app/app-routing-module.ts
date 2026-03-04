import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Rotas são registradas DINAMICAMENTE via APP_INITIALIZER (app-module.ts)
// a partir do arquivo src/assets/mf.manifest.json.
// Edite o JSON para adicionar novos microfrontends sem recompilar o shell.
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
