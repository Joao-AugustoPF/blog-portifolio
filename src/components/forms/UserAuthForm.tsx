"use client";

import { signup } from "@/app/actions/auth";
import { useFormState } from "react-dom";
import { useState } from "react";
import { FormState } from "@/lib/definitions";

export function UserAuthForm() {
  const initialState: FormState = {
    errors: {},
    success: undefined,
  };

  const [state, action, pending] = useFormState<FormState, FormData>(
    signup,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function isEmailError(errors: any): errors is { email: string[] } {
    return errors && "email" in errors;
  }

  function isPasswordError(errors: any): errors is { password: string[] } {
    return errors && "password" in errors;
  }

  return (
    <form action={action} className="space-y-6">
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="example@example.com"
          placeholder="Seu Email"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
        />
        {isEmailError(state?.errors) && (
          <p className="mt-2 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            defaultValue="P@ssw0rd!"
            placeholder="Sua Senha"
            className="px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 dark:text-gray-400 focus:outline-none"
          >
            {showPassword ? "Esconder" : "Mostrar"}
          </button>
        </div>
        {isPasswordError(state?.errors) && (
          <div className="mt-2 text-sm text-red-600">
            <p>A senha deve:</p>
            <ul className="list-disc list-inside">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        aria-disabled={pending}
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
