import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { projectSchema } from "@/lib/validations";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProjectEditForm = ({
    project,
    open,
    onOpenChange,
    onSubmit,
    isLoading,
}) => {
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (open) {
            reset(project);
        }
    }, [open]);

    const onSubmitForm = async (data) => {
        try {
            setError(null);
            await onSubmit({ ...data });
        } catch (err) {
            setError(
                err.message || "Ha ocurrido un error al crear el proyecto"
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Editar Proyecto
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
                    {/* Título */}
                    <div className="space-y-2">
                        <Input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Título"
                            {...register("title", projectSchema.title)}
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Enlace de repositorio */}
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Enlace de repositorio"
                            {...register(
                                "repository_url",
                                projectSchema.repository_url
                            )}
                            aria-invalid={
                                errors.repository_url ? "true" : "false"
                            }
                        />
                        {errors.repository_url && (
                            <p className="text-sm text-red-500">
                                {errors.repository_url.message}
                            </p>
                        )}
                    </div>

                    {/* Botón para guardar */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cargando..." : "Guardar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectEditForm;
