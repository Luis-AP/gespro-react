import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/lib/validations";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function RegisterForm({ onSubmit, isLoading }) {
  const [error, setError] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmitForm = async (data) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error al registrarse');
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
          type="text"
          placeholder="Nombre"
          className="bg-neutral-900 border-neutral-800"
          {...register("name", registerSchema.name)}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Apellido"
          className="bg-neutral-900 border-neutral-800"
          {...register("lastName", registerSchema.lastName)}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="estudiante@ejemplo.com"
          className="bg-neutral-900 border-neutral-800"
          {...register("email", registerSchema.email)}
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
          {...register("password", registerSchema.password)}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Carrera"
          className="bg-neutral-900 border-neutral-800"
          {...register("career", registerSchema.career)}
          aria-invalid={errors.career ? "true" : "false"}
        />
        {errors.career && (
          <p className="text-sm text-red-500">{errors.career.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Nro. de Matrícula"
          className="bg-neutral-900 border-neutral-800"
          {...register("enrollmentNumber", registerSchema.enrollmentNumber)}
          aria-invalid={errors.enrollmentNumber ? "true" : "false"}
        />
        {errors.enrollmentNumber && (
          <p className="text-sm text-red-500">{errors.enrollmentNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Controller
          name="enrollmentDate"
          control={control}
          rules={registerSchema.enrollmentDate}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-neutral-900 border-neutral-800",
                    !field.value && "text-muted-foreground"
                  )}
                  aria-invalid={errors.enrollmentDate ? "true" : "false"}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP", { locale: es })
                  ) : (
                    <span>Elegí la fecha de matriculación</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  locale={es}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2000-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.enrollmentDate && (
          <p className="text-sm text-red-500">{errors.enrollmentDate.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-white text-black hover:bg-gray-200"
        disabled={isLoading}
      >
        {isLoading ? "Creando cuenta..." : "Crear Cuenta de Estudiante"}
      </Button>
    </form>
  );
}

export default RegisterForm;