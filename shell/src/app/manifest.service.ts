import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface MfeConfig {
  name: string;
  remoteEntry: string;
  exposedModule: string;
  moduleName: string;
  routePath: string;
  displayName: string;
}

@Injectable({ providedIn: 'root' })
export class ManifestService {
  private readonly configsSubject = new BehaviorSubject<MfeConfig[]>([]);
  private readonly defaultManifestUrl = '/assets/config/mf.manifest.json';
  private lastSignature = '';
  private pollingId: ReturnType<typeof setInterval> | null = null;

  setConfigs(configs: MfeConfig[]): void {
    this.configsSubject.next(configs);
  }

  getConfigs(): MfeConfig[] {
    return this.configsSubject.getValue();
  }

  async load(router: Router): Promise<void> {
    const configs = await this.fetchManifest();
    this.applyConfigs(router, configs);
  }

  startPolling(router: Router, intervalMs = 3000): void {
    if (this.pollingId) return;
    this.pollingId = setInterval(async () => {
      try {
        const configs = await this.fetchManifest();
        this.applyConfigs(router, configs);
      } catch (err) {
        // Mantem a configuracao atual em caso de falha temporaria.
        console.warn('[ManifestService] falha ao atualizar o manifest:', err);
      }
    }, intervalMs);
  }

  private getManifestUrl(): string {
    const win = window as any;
    const override = win.__mfManifestUrl || localStorage.getItem('mfManifestUrl');
    return override || this.defaultManifestUrl;
  }

  private async fetchManifest(): Promise<MfeConfig[]> {
    const url = this.getManifestUrl();
    const res = await fetch(`${url}?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Manifest fetch failed: ${res.status} ${res.statusText}`);
    }
    const configs = await res.json();
    return Array.isArray(configs) ? configs : [];
  }

  private applyConfigs(router: Router, configs: MfeConfig[]): void {
    const signature = JSON.stringify(configs);
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;

    this.setConfigs(configs);
    const dynamicRoutes: Routes = configs.map((config) => ({
      path: config.routePath,
      loadChildren: () =>
        import('@angular-architects/module-federation').then(({ loadRemoteModule }) =>
          loadRemoteModule({
            type: 'module' as const,
            remoteEntry: config.remoteEntry,
            exposedModule: config.exposedModule,
          }).then((m) => m[config.moduleName]),
        ),
    }));

    router.resetConfig(dynamicRoutes);

    const currentPath = router.url.split('?')[0].replace(/^\//, '');
    const hasRoute = currentPath === '' || configs.some((c) => c.routePath === currentPath);
    if (!hasRoute) {
      router.navigateByUrl('/');
    }
  }
}
