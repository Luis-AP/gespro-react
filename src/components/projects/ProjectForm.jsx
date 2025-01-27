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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import activitiesService from "../../services/activitiesService";
import { X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProjectForm = ({
    activity = null,
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

    const [inputValue, setInputValue] = useState("");
    const [availableActivities, setAvailableActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loadingActivities, setLoadingActivities] = useState(false);

    useEffect(() => {
        setSelectedActivity(activity);
        handleLoadActivities();
    }, [activity]);

    const onSubmitForm = async (data) => {
        try {
            setError(null);
            await onSubmit({ ...data, activity_id: selectedActivity?.id });
        } catch (err) {
            setError(
                err.message || "Ha ocurrido un error al crear el proyecto"
            );
        }
    };

    const handleSearchChange = (value) => {
        setInputValue(value);
    };

    const handleLoadActivities = async () => {
        try {
            setLoadingActivities(true);
            const response = await activitiesService.getActivities();
            setAvailableActivities(response);
        } catch (error) {
            setError(
                error.message ||
                    "Ha ocurrido un error al cargar las actividades"
            );
        } finally {
            setLoadingActivities(false);
        }
    };

    // Filtra las actividades basado en el valor del input
    const filteredActivities =
        inputValue.length >= 1
            ? availableActivities.filter((activity) =>
                  activity.name.toLowerCase().includes(inputValue.toLowerCase())
              )
            : [];

    const shouldShowResults = inputValue.length >= 1;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Crear Proyecto
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

                    {/* Actividad, se consulta a la API por las actividades */}
                    <div className="flex flex-col space-y-4">
                        {selectedActivity ? (
                            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
                                <span className="text-sm font-medium">
                                    {selectedActivity.name}
                                </span>
                                {!activity && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="ml-auto"
                                        onClick={() => {
                                            setSelectedActivity(null);
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <Command className="rounded-lg border shadow-md">
                                <CommandInput
                                    placeholder="Buscar por nombre de la actividad"
                                    value={inputValue}
                                    onValueChange={handleSearchChange}
                                />
                                <CommandList>
                                    {shouldShowResults && (
                                        <>
                                            {filteredActivities.length === 0 ? (
                                                <CommandEmpty>
                                                    No se encontraron
                                                    resultados.
                                                </CommandEmpty>
                                            ) : (
                                                <CommandGroup>
                                                    {filteredActivities.map(
                                                        (activity) => (
                                                            <CommandItem
                                                                key={
                                                                    activity.id
                                                                }
                                                                onSelect={() => {
                                                                    setSelectedActivity(
                                                                        activity
                                                                    );
                                                                    setInputValue(
                                                                        ""
                                                                    );
                                                                }}
                                                                className="flex items-center space-x-2 p-2"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-medium">
                                                                        {
                                                                            activity.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            )}
                                        </>
                                    )}
                                </CommandList>
                            </Command>
                        )}
                    </div>

                    {/* Botón para guardar */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || loadingActivities}
                    >
                        {isLoading ? "Cargando..." : "Crear Proyecto"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectForm;
