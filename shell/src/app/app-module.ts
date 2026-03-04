import {
  EnvironmentProviders,
  Injector,
  NgModule,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  runInInjectionContext,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ManifestService } from './manifest.service';
import { RuntimeConfigService } from './core/services/runtime-config.service';
import { ThemeLoaderService } from './core/services/theme-loader.service';
import { BuildInfoService } from './core/services/build-info.service';

function provideRuntimeConfigWithManifest(): EnvironmentProviders {
  return provideAppInitializer(async () => {
    const injector = inject(Injector);

    const configService = injector.get(RuntimeConfigService);
    await configService.load();

    await runInInjectionContext(injector, async () => {
      const themeService = inject(ThemeLoaderService);
      await themeService.loadTheme();
    });

    const buildInfoService = injector.get(BuildInfoService);
    await buildInfoService.load();

    const manifestService = injector.get(ManifestService);
    const router = injector.get(Router);
    await manifestService.load(router);
    manifestService.startPolling(router);
  });
}

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRuntimeConfigWithManifest(),
  ],
  bootstrap: [App],
})
export class AppModule {}
