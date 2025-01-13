import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginForm({ isLoading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="usuario@ejemplo.com"
          className="bg-neutral-900 border-neutral-800"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="••••••••"
          className="bg-neutral-900 border-neutral-800"
        />
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