import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Calendar components
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Quill editor
import RichTextEditor from "./RichTextEditor";

function ActivityForm({ isLoading, onSubmit }) {
    const [date, setDate] = useState(null);

    return (
        <form onSubmit={onSubmit} className="space-y-4 mt-6">
            {/* Nombre */}
            <div className="space-y-2">
                <Input
                    type="text"
                    placeholder="Nombre"
                    className="bg-neutral-800 border border-neutral-800 text-white placeholder:text-neutral-500"
                />
            </div>

            {/* Editor de texto enriquecido */}
            <div className="space-y-2">
                <div className="h-60 overflow-auto rounded-md">
                    <RichTextEditor placeholder="Descripción de la actividad" />
                </div>
            </div>

            {/* Fecha de vencimiento */}
            <div className="space-y-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal bg-neutral-800 border border-neutral-800 text-white placeholder:text-neutral-500",
                                !date && "text-neutral-500"
                            )}
                        >
                            <CalendarIcon />
                            {date ? (
                                format(date, "PPP", { locale: es })
                            ) : (
                                <span>Elegí la fecha de vencimiento</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                        <div className="rounded-md border border-neutral-800 bg-neutral-800">
                            <Calendar
                                locale={es}
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="bg-neutral-800 text-white"
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Nota de aprobación */}
            <div className="space-y-2">
                <Input
                    type="number"
                    placeholder="Nota de Aprobación"
                    className="bg-neutral-800 border border-neutral-800 text-white placeholder:text-neutral-500"
                />
            </div>

            {/* Botón para crear actividad */}
            <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200"
                disabled={isLoading}
            >
                {isLoading ? "Creando actividad..." : "Crear Actividad"}
            </Button>
        </form>
    );
}

export default ActivityForm;
