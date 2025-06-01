# MagWishlist

MagWishlist é uma plataforma de gerenciamento de listas de desejos que permite aos usuários rastrear produtos de seu interesse, receber notificações de mudanças de preço e compartilhar suas listas com amigos e familiares.

## 🚀 Ambiente de Desenvolvimento

O MagWishlist utiliza uma arquitetura moderna baseada em containers para garantir um ambiente de desenvolvimento consistente e fácil de configurar. Nosso ambiente é estruturado para suportar uma aplicação fullstack com todos os serviços necessários.

### 📋 Pré-requisitos

- [Docker](https://www.docker.com/get-started) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Node.js](https://nodejs.org/) (v20+)
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado)
- Extensão [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) para VS Code (recomendado)

### 🔧 Serviços Disponíveis

- **API Backend**: API NestJS rodando na porta 3001
- **Frontend Web**: Aplicação Vue.js/Vite rodando na porta 5173
- **MongoDB**: Banco de dados rodando na porta 27017
- **MongoDB Express**: Interface de administração do MongoDB na porta 8081
- **MQTT Broker**: Broker Mosquitto para comunicação em tempo real nas portas 1883 (MQTT) e 9001 (WebSockets)

### ⚡ Inicialização Rápida

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/magwishlist.git
cd magwishlist

# Executar script de configuração
npm run setup

# Iniciar ambiente de desenvolvimento
npm run dev
```

### 🐳 Usando Dev Containers (Recomendado)

Para a melhor experiência de desenvolvimento, recomendamos usar a funcionalidade Dev Containers do VS Code:

1. Instale a extensão [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) no VS Code
2. Abra o projeto no VS Code
3. Quando solicitado, clique em "Reopen in Container" ou use o comando `Remote-Containers: Reopen in Container`
4. O VS Code irá construir e iniciar os containers, e você terá um ambiente de desenvolvimento completo configurado

### 📝 Scripts Disponíveis

- `npm run setup` - Configura o ambiente de desenvolvimento
- `npm run dev` - Inicia todos os serviços no modo desenvolvimento
- `npm run reset` - Limpa o ambiente de desenvolvimento
- `npm run docker:up` - Inicia os containers Docker
- `npm run docker:down` - Para os containers Docker
- `npm run docker:logs` - Mostra logs dos containers
- `npm run docker:ps` - Lista os containers em execução
- `npm run docker:clean` - Para e remove os containers e volumes (⚠️ apaga dados do banco)
- `npm run lint` - Executa a verificação de linting em todo o código
- `npm run test` - Executa todos os testes
- `npm run build` - Compila o projeto

### 🔐 Acessando os Serviços

- **API**: <http://localhost:3001/graphql>
- **Frontend Web**: <http://localhost:5173>
- **MongoDB Express**: <http://localhost:8081>
  - Usuário: admin
  - Senha: admin123

### 🛠️ Estrutura do Ambiente

```
📁 docker/            # Configurações Docker para cada serviço
  📁 api/             # Dockerfile para API
  📁 web/             # Dockerfile para Frontend
  📁 mongodb/         # Configurações para MongoDB
  📁 mqtt/            # Configurações para MQTT broker
📁 .devcontainer/     # Configurações Dev Container
📁 .vscode/           # Configurações recomendadas para VS Code
📁 tools/scripts/     # Scripts utilitários
📄 docker-compose.yml # Orquestração de todos os serviços
```

### 🔌 Depuração (Debugging)

O ambiente vem pré-configurado com suporte para depuração tanto no backend quanto no frontend:

- **Backend**: Attach ao depurador na porta 9229
- **Frontend**: Chrome debugging para a aplicação Vue

Use as configurações de depuração disponíveis no VS Code para iniciar as sessões de debug.

### 📢 CI/CD

O projeto possui workflows de GitHub Actions configurados para:

- Validação de lint
- Build
- Testes automatizados

### 📚 Documentação Relacionada

- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Vue.js](https://vuejs.org/guide/introduction.html)
- [Documentação do MongoDB](https://docs.mongodb.com/)

## 🏗️ Arquitetura

O MagWishlist utiliza uma arquitetura de monorepo com Turborepo para gerenciar os diversos pacotes que compõem a aplicação.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
