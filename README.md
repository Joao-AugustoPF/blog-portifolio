# Blog Usando Shadcn

Este é um projeto de um blog construído usando **Next.js**, **TypeScript** e **Shadcn**. Ele é altamente modular e inclui funcionalidades como autenticação, gerenciamento de posts, upload de imagens e uma interface de administração.

## Funcionalidades

- **Autenticação**: Implementado usando `next-auth`.
- **Gerenciamento de Posts**: CRUD completo para posts de blog.
- **Administração**: Interface de administração para gerenciar o conteúdo do blog.
- **Design Responsivo**: UI adaptável a diversos tamanhos de tela.

## Estrutura do Projeto

Abaixo está uma visão geral da estrutura das pastas e arquivos no projeto:

```
src/
│
├── app/
│   ├── actions/               # Contém as ações do servidor
│   ├── api/                   # Rotas API
│   │   ├── auth/              # Autenticação
│   │   ├── blog/              # Gerenciamento de posts
│   │   │   ├── create/        # Criação de posts
│   │   │   ├── delete/        # Exclusão de posts
│   │   │   ├── load/          # Carregamento de posts
│   │   │   ├── post/          # Obtenção de um post específico
│   │   │   ├── posts/         # Listagem de posts
│   │   │   ├── publish/       # Publicação de posts
│   │   │   ├── save/          # Salvamento de posts
│   │   │   └── upload/        # Upload de imagens
│   │   └── comments/          # Gerenciamento de comentários
│   ├── blog/                  # Páginas relacionadas ao blog
│   │   ├── [id]/              # Página de detalhe do post
│   │   ├── profile/           # Página de perfil do usuário
│   │   ├── privacy-policy/    # Página de política de privacidade
│   │   ├── terms-of-service/  # Página de termos de serviço
│   ├── contact/               # Página de contato
│   ├── dashboard/             # Páginas do dashboard administrativo
│   └── login/                 # Página de login
│
├── components/                # Componentes reutilizáveis
├── constants/                 # Constantes usadas no projeto
├── hooks/                     # Custom React Hooks
├── lib/                       # Funções utilitárias e bibliotecas auxiliares
├── types/                     # Definições de tipos TypeScript
│   └── middleware.ts          # Middleware para autenticação e autorização
│
├── .editorconfig              # Configuração do editor
├── .env                       # Variáveis de ambiente
├── .eslintrc.json             # Configuração do ESLint
├── .gitignore                 # Arquivos e pastas ignorados pelo Git
├── .prettierignore            # Arquivos e pastas ignorados pelo Prettier
├── .prettierrc                # Configuração do Prettier
├── components.json            # Configuração dos componentes
├── next-env.d.ts              # Declarações de tipos Next.js
├── next.config.mjs            # Configuração do Next.js
├── package.json               # Dependências do projeto e scripts
├── postcss.config.mjs         # Configuração do PostCSS
├── README.md                  # Documentação do projeto
├── tailwind.config.ts         # Configuração do Tailwind CSS
├── tsconfig.json              # Configuração do TypeScript
└── yarn.lock                  # Arquivo de lock do Yarn
```

## Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Joao-AugustoPF/blog-portifolio.git
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   ```

3. **Crie um arquivo `.env` e configure as variáveis de ambiente:**

   ```plaintext
   NEXTAUTH_URL=your_nextauth_url
   ```

4. **Execute o servidor de desenvolvimento:**

   ```bash
   yarn dev
   ```

## Scripts Disponíveis

- `yarn dev`: Inicia o servidor de desenvolvimento.
- `yarn build`: Cria a build de produção.
- `yarn start`: Inicia o servidor da build de produção.
- `yarn lint`: Verifica se há erros de linting no código.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma [issue](https://github.com/Joao-AugustoPF/blog-portifolio/issues) ou enviar um PR.

## Contato

- **Nome:** João Augusto
- **Email:** joaoaugustopfpf@gmail.com
- **LinkedIn:** [linkedin.com/in/joaoaugustopf](https://www.linkedin.com/in/joaoaugustopf/)
