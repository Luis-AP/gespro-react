import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/CustomPopOver";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const CalendarInput = ({ field, errors }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        errors && "border-red-500"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                        format(field.value, "PPP", { locale: es })
                    ) : (
                        <span>Elegí la fecha de vencimiento</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    locale={es}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                    className="rounded-md border"
                />
            </PopoverContent>
        </Popover>
    );
};

export default CalendarInput;
