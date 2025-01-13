import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function RegisterForm({ isLoading, onSubmit }) {
  const [date, setDate] = useState(null);
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Nombre"
          className="bg-neutral-900 border-neutral-800"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Apellido"
          className="bg-neutral-900 border-neutral-800"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="estudiante@ejemplo.com"
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
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Carrera"
          className="bg-neutral-900 border-neutral-800"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Nro. de Matrícula"
          className="bg-neutral-900 border-neutral-800"
        />
      </div>
      <div className="space-y-2">
        <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal bg-neutral-900 border-neutral-800",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP", { locale: es }) : <span>Elegí la fecha de matriculación</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <div className="rounded-md border">
            <Calendar locale={es} mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
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