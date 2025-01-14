import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validations";

function LoginForm({ onSubmit, isLoading }) {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmitForm = async (data) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 mt-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="usuario@ejemplo.com"
          className="bg-neutral-900 border-neutral-800"
          {...register("email", loginSchema.email)}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="••••••••"
          className="bg-neutral-900 border-neutral-800"
          {...register("password", loginSchema.password)}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-white text-black hover:bg-gray-200"
        disabled={isLoading}
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
}

export default LoginForm;