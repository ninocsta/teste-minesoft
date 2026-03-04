// O manifesto de microfrontends é carregado via APP_INITIALIZER (sem pré-fetch).
// Edite src/assets/mf.manifest.json — o shell detecta mudanças a cada 3s
// e atualiza rotas e navegação automaticamente, sem reload nem recompilação.
import('./bootstrap').catch((err) => console.error(err));
