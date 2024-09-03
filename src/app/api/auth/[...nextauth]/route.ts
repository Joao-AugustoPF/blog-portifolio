import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Acessar as variáveis de ambiente para obter as credenciais
        const storedEmail = process.env.AUTH_EMAIL;
        const storedPassword = process.env.AUTH_PASSWORD;

        // Verificar se as credenciais fornecidas correspondem às armazenadas
        if (
          credentials?.email === storedEmail &&
          credentials?.password === storedPassword
        ) {
          // Retornar um objeto de usuário se as credenciais estiverem corretas
          return { id: "1", name: "User", email: storedEmail };
        }

        // Retornar null se as credenciais estiverem incorretas
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Opcional: especifica a página de login
  },
});

export { handler as GET, handler as POST };
