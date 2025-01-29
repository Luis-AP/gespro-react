import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { activitySchema } from "@/lib/validations";
import { Controller } from "react-hook-form";

import CalendarInput from "@/components/CalendarInput";
import RichTextEditor from "./RichTextEditor";

const ActivityForm = ({
    activity,
    open,
    onOpenChange,
    onSubmit,
    isLoading,
    errorMessage,
}) => {
    const [error, setError] = useState(null);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (open) {
            reset(activity);
        }
    }, [open]);

    const onSubmitForm = async (data) => {
        try {
            setError(null);
            await onSubmit(data);
        } catch (err) {
            setError(err.message || errorMessage);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {activity?.name
                            ? "Editar Actividad"
                            : "Crear Actividad"}
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
                            name="due_date"
                            control={control}
                            rules={activitySchema.due_date}
                            render={({ field }) => (
                                <CalendarInput
                                    field={field}
                                    errors={errors.due_date}
                                />
                            )}
                        />
                        {errors.due_date && (
                            <p className="text-sm text-red-500">
                                {errors.due_date.message}
                            </p>
                        )}
                    </div>

                    {/* Nota de aprobación */}
                    <div className="space-y-2">
                        <Input
                            type="number"
                            placeholder="Nota de Aprobación"
                            {...register("min_grade", activitySchema.min_grade)}
                            aria-invalid={errors.min_grade ? "true" : "false"}
                        />
                        {errors.min_grade && (
                            <p className="text-sm text-red-500">
                                {errors.min_grade.message}
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
                            : activity?.name
                            ? "Guardar Cambios"
                            : "Crear Actividad"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityForm;
