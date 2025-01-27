import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import RichTextEditor from "./RichTextEditor";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { activitySchema } from "@/lib/validations";
import { Controller } from "react-hook-form";

const ActivityForm = ({
    activity = {},
    open,
    onOpenChange,
    onSubmit,
    isLoading,
}) => {
    const [error, setError] = useState(null);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmitForm = async (data) => {
        try {
            setError(null);
            await onSubmit(data);
        } catch (err) {
            setError(err.message || "Ha ocurrido un error al guardar la actividad");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {activity.name ? "Editar Actividad" : "Crear Actividad"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="grid gap-4 py-4"
                >
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {/* Nombre */}
                    <div className="space-y-2">
                        <Input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre"
                            {...register("name", activitySchema.name)}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Editor de texto enriquecido */}
                    <div className="space-y-2 h-52 overflow-hidden">
                        <Controller
                            name="description"
                            control={control}
                            rules={activitySchema.description}
                            render={({ field }) => (
                                <RichTextEditor
                                    field={field}
                                    placeholder="Descripción de la actividad"
                                />
                            )}
                        />
                    </div>
                    {errors.description && (
                        <p className="text-sm text-red-500">
                            {errors.description.message}
                        </p>
                    )}

                    {/* Fecha de vencimiento */}
                    <div className="space-y-2">
                        <Controller
                            name="dueDate"
                            control={control}
                            rules={activitySchema.dueDate}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal"
                                            )}
                                            aria-invalid={
                                                errors.dueDate
                                                    ? "true"
                                                    : "false"
                                            }
                                        >
                                            <CalendarIcon />
                                            {field.value ? (
                                                format(field.value, "PPP", {
                                                    locale: es,
                                                })
                                            ) : (
                                                <span>
                                                    Elegí la fecha de
                                                    vencimiento
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                        <div>
                                            <DatePicker
                                                locale={es}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date <= new Date()
                                                }
                                                initialFocus
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.dueDate && (
                            <p className="text-sm text-red-500">
                                {errors.dueDate.message}
                            </p>
                        )}
                    </div>

                    {/* Nota de aprobación */}
                    <div className="space-y-2">
                        <Input
                            type="number"
                            placeholder="Nota de Aprobación"
                            {...register("minGrade", activitySchema.minGrade)}
                            aria-invalid={errors.minGrade ? "true" : "false"}
                        />
                        {errors.minGrade && (
                            <p className="text-sm text-red-500">
                                {errors.minGrade.message}
                            </p>
                        )}
                    </div>

                    {/* Botón para guardar */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Guardando..."
                            : activity.name
                            ? "Guardar Cambios"
                            : "Crear Actividad"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityForm;
