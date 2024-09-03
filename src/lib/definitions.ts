import { z } from "zod";

export const SignupFormSchema = z.object({
  // name: z
  //   .string()
  //   .min(2, { message: "Name must be at least 2 characters long." })
  //   .trim(),
  email: z.string().email({ message: "Entre com um email válido." }).trim(),
  password: z
    .string()
    .min(8, { message: "Ter no mínimo 8 caracteres." })
    .regex(/[a-zA-Z]/, { message: "Ter no mínimo uma letra." })
    .regex(/[0-9]/, { message: "Ter no mínimo um número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Ter no mínimo um caractere especial.",
    })
    .trim(),
});

export interface FormState {
  errors?: {
    email?: string[];
    password?: string[];
    auth?: string;
  };
  success?: boolean;
}
