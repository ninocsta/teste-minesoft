// O manifesto de microfrontends é carregado via APP_INITIALIZER (sem pré-fetch).
// Edite src/assets/config/mf.manifest.json para ajustar a configuração em runtime.
import('./bootstrap').catch((err) => console.error(err));
