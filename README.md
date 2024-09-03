# Blog ShadCN

Este é um projeto de blog construído utilizando o framework Next.js com ShadCN, TypeScript, e TailwindCSS. Este repositório inclui todas as funcionalidades necessárias para gerenciar posts, autenticação, uploads, e mais.

## Índice

- [Introdução](#introdução)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução

Este projeto foi desenvolvido para criar um blog onde usuários podem visualizar, criar, editar, publicar, e deletar posts. Além disso, o projeto inclui suporte a comentários e autenticação de usuários.

## Funcionalidades

- **Autenticação**: Login e registro de usuários com NextAuth.
- **CRUD de Posts**: Criação, leitura, atualização e exclusão de posts.
- **Upload de Imagens**: Upload de imagens para os posts com suporte a preview.
- **Sistema de Comentários**: Usuários autenticados podem comentar em posts.
- **Publicação de Posts**: Opção de publicar ou deixar posts como rascunho.
- **Responsividade**: Layout totalmente responsivo.

## Estrutura do Projeto

Aqui está uma visão geral da estrutura do projeto:

```plaintext
app/
├── actions/
│   └── auth.ts
├── api/
│   ├── auth/
│   │   └── [..nextauth]/
│   │       └── route.ts
│   ├── blog/
│   │   ├── create/
│   │   │   └── route.tsx
│   │   ├── delete/
│   │   │   └── [id]/
│   │   │       └── route.tsx
│   │   ├── load/
│   │   │   └── route.tsx
│   │   ├── post/
│   │   │   └── route.tsx
│   │   ├── posts/
│   │   │   └── route.tsx
│   │   ├── publish/
│   │   │   └── route.tsx
│   │   ├── save/
│   │   │   └── route.tsx
│   │   └── upload/
│   │       └── route.tsx
│   └── comments/
│       └── route.tsx
├── components/
│   ├── dashboard-nav.tsx
│   └── ...
├── hooks/
│   └── useSidebar.ts
└── pages/
    ├── _app.tsx
    └── index.tsx
```
