# AppGym FrontEnd

Frontend do projeto **AppGym**, construído com Next.js + TypeScript, para gestão de academias, treinos e perfis de usuários. Integra-se diretamente com o [AppGym-Backend](https://github.com/Kcarlos-dev/AppGym-Backend).

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Como Contribuir](#como-contribuir)
- [Contato](#contato)

---

## Sobre o Projeto

Este repositório contém a interface web do AppGym, permitindo a alunos e gestores de academia:
- Visualizar treinos e histórico
- Gerenciar perfis
- Interagir com a API do backend para operações CRUD

---

## Estrutura de Diretórios

```
├── next.config.ts           # Configuração Next.js
├── next-env.d.ts            # Tipagem Next.js para TypeScript
├── node_modules/            # Dependências instaladas
├── package.json             # Scripts e dependências
├── package-lock.json        # Locks de dependências
├── public/                  # Arquivos estáticos (SVGs, imagens)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   └── img/                 # Imagens do projeto
├── README.md                # Documentação
├── src/                     # Código-fonte principal
│   └── app/                 # Páginas e rotas
│       ├── components/      # Componentes reutilizáveis
│       ├── globals.css      # Estilos globais
│       ├── layout.tsx       # Layout global
│       ├── page.module.css  # CSS da página principal
│       ├── page.tsx         # Página inicial
│       └── profile/         # Página/perfil do usuário
└── tsconfig.json            # Configuração TypeScript
```

### Detalhes dos diretórios

- **public/**  
  SVGs de ícones, logos e arquivos de imagem. O subdiretório `img` guarda imagens do domínio do projeto.

- **src/app/components/**  
  Componentes React reutilizáveis como botões, cards, headers etc.

- **src/app/profile/**  
  Rota/página com lógica e componentes relacionados ao perfil do usuário.

- **src/app/layout.tsx**  
  Layout global compartilhado entre todas as páginas (menu, rodapé etc).

- **src/app/page.tsx**  
  Página inicial, geralmente dashboard ou tela de login/cadastro.

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- [Vercel](https://vercel.com/) (deploy e preview)
- [Node.js](https://nodejs.org/) (backend do Next.js)

---

## Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Kcarlos-dev/AppGym-frontEnd.git
   cd AppGym-frontEnd
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em modo desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
   Acesse: [http://localhost:3000](http://localhost:3000)

---

## Scripts Disponíveis

- `dev`: Executa em modo desenvolvimento
- `build`: Faz o build de produção
- `start`: Inicia o servidor Next.js em produção
- `lint`: Executa o linter

---

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha feature'`)
4. Push para o repositório remoto (`git push origin minha-feature`)
5. Abra um Pull Request

---

## Contato

- Autor: [@Kcarlos-dev](https://github.com/Kcarlos-dev)
- Dúvidas/sugestões: Via issues ou diretamente no GitHub

---
