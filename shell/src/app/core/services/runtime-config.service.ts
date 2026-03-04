import { Injectable } from '@angular/core';

export type RuntimeConfig = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private config: RuntimeConfig = {};

  getConfig(): RuntimeConfig {
    return this.config;
  }

  async load(url = '/assets/env/environments.json'): Promise<void> {
    try {
      const res = await fetch(`${url}?v=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) {
        console.warn('[RuntimeConfigService] config nao encontrado:', res.status, res.statusText);
        this.config = {};
        return;
      }
      const data = await res.json();
      this.config = data && typeof data === 'object' ? (data as RuntimeConfig) : {};
    } catch (err) {
      console.warn('[RuntimeConfigService] falha ao carregar config:', err);
      this.config = {};
    }
  }
}
