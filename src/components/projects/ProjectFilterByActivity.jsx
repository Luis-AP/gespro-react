import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { projectSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { X } from "lucide-react";
import activitiesService from "../../services/activitiesService";

export default function ProjectFilterByActivity({
    selectedActivity,
    setSelectedActivity,
    onReset,
}) {
    const [inputValue, setInputValue] = useState("");
    const [availableActivities, setAvailableActivities] = useState([]);

    useEffect(() => {
        handleLoadActivities();
        setInputValue("");
    }, []);

    const handleSearchChange = (value) => {
        setInputValue(value);
    };

    const handleLoadActivities = async () => {
        try {
            const response = await activitiesService.getActivities();
            setAvailableActivities(response);
        } catch (error) {
            console.error(error);
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
        <div className="space-y-2">
            {selectedActivity ? (
                <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
                    <span className="text-sm font-medium">
                        {selectedActivity.name || "Actividad"}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => {
                            onReset();
                            setInputValue("");
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
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
                                        No se encontraron resultados.
                                    </CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {filteredActivities.map((activity) => (
                                            <CommandItem
                                                key={activity.id}
                                                onSelect={() => {
                                                    setSelectedActivity(
                                                        activity
                                                    );
                                                    setInputValue("");
                                                }}
                                                className="flex items-center space-x-2 p-2"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        {activity.name}
                                                    </span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </>
                        )}
                    </CommandList>
                </Command>
            )}
        </div>
    );
}
