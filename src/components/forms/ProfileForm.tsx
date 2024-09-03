"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import content from "@/app/content.json"; // Importa o JSON

// Esquema de validação do formulário
const profileFormSchema = z.object({
  name: z
    .string()
    .min(content.profileForm.fields.name.validation.minLength, {
      message: content.profileForm.fields.name.validation.minMessage,
    })
    .max(content.profileForm.fields.name.validation.maxLength, {
      message: content.profileForm.fields.name.validation.maxMessage,
    }),
  email: z
    .string({
      required_error: "Selecione um e-mail a ser mostrado.",
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: ProfileFormValues }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user, // Carrega os valores do perfil a partir das props
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.profileForm.fields.name.label}</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>
                {content.profileForm.fields.name.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.profileForm.fields.email.label}</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormDescription>
                {content.profileForm.fields.email.description}{" "}
                <Link href={content.profileForm.links.emailSettings}>
                  email settings
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled type="submit">
          {content.profileForm.fields.button.text}
        </Button>
      </form>
    </Form>
  );
}
