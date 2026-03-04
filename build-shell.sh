#!/bin/bash
set -e

# ========================
# CONFIGURACOES
# ========================
NODE_VERSION="v22.13.1"
PROJECT_DIR="/home/c0rv0/minesoft/teste-minesoft/shell"
DEPLOY_DIR="/var/www/shell"
BUILD_OUTPUT_DIR="$PROJECT_DIR/dist/shell"
BASE_HREF="/shell/"
DEPLOY_URL="/shell/"

# ========================
# SETUP NODE COM NVM
# ========================
echo ">> Ativando Node.js $NODE_VERSION via NVM..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

if ! command -v nvm >/dev/null 2>&1; then
  echo "ERRO: nvm nao encontrado em $NVM_DIR/nvm.sh"
  exit 1
fi

nvm use "$NODE_VERSION"

# ========================
# BUILD SHELL
# ========================
echo ">> Gerando build do Shell..."
cd "$PROJECT_DIR"
ng build --configuration production --output-hashing=all --base-href "$BASE_HREF" --deploy-url "$DEPLOY_URL"

# ========================
# DEPLOY
# ========================
echo ">> Limpando diretorio atual em $DEPLOY_DIR..."
sudo rm -rf "$DEPLOY_DIR"/*

echo ">> Copiando novos arquivos para $DEPLOY_DIR..."
sudo mkdir -p "$DEPLOY_DIR"
sudo cp -r "$BUILD_OUTPUT_DIR"/* "$DEPLOY_DIR"/

echo ">> Ajustando permissoes..."
sudo chown -R www-data:www-data "$DEPLOY_DIR"

echo ">> Deploy do Shell concluido com sucesso!"
