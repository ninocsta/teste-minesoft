import { Injectable } from '@angular/core';

export type BuildInfo = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class BuildInfoService {
  private buildInfo: BuildInfo = {};

  getBuildInfo(): BuildInfo {
    return this.buildInfo;
  }

  async load(url = '/assets/build-info.json'): Promise<void> {
    try {
      const res = await fetch(`${url}?v=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) {
        console.warn('[BuildInfoService] build-info nao encontrado:', res.status, res.statusText);
        this.buildInfo = {};
        return;
      }
      const data = await res.json();
      this.buildInfo = data && typeof data === 'object' ? (data as BuildInfo) : {};
    } catch (err) {
      console.warn('[BuildInfoService] falha ao carregar build-info:', err);
      this.buildInfo = {};
    }
  }
}
