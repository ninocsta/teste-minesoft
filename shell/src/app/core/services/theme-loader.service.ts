import { Injectable } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';

@Injectable({ providedIn: 'root' })
export class ThemeLoaderService {
  constructor(private runtimeConfig: RuntimeConfigService) {}

  async loadTheme(): Promise<void> {
    const config = this.runtimeConfig.getConfig() as {
      themeUrl?: string;
      theme?: { cssUrl?: string };
    };
    const url = config?.theme?.cssUrl || config?.themeUrl;
    if (!url) return;

    const id = 'runtime-theme';
    const link = document.getElementById(id) as HTMLLinkElement | null;
    if (link) {
      link.href = url;
      return;
    }

    const el = document.createElement('link');
    el.id = id;
    el.rel = 'stylesheet';
    el.href = url;
    document.head.appendChild(el);
  }
}
