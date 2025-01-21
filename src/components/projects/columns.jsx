import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Info } from "lucide-react";

const ActionButton = ({ icon: Icon, label, onClick }) => (
    <TooltipProvider>
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={onClick}
                >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const StatusBadge = ({ status }) => {
    return (
        <Badge variant={status === "borrador" ? "outline" : "default"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
};

const TypeBadge = ({ isGroup }) => {
    return (
        <Badge variant={isGroup ? "default" : "outline"}>
            {isGroup ? "Grupal" : "Individual"}
        </Badge>
    );
};

export const studentColumns = [
    {
        accessorKey: "title",
        header: "Título",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("title")}</div>
        ),
        size: "w-[35%]",
    },
    {
        accessorKey: "professor",
        header: "Profesor",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                {row.getValue("professor")}
            </div>
        ),
        size: "w-[20%]",
    },
    {
        accessorKey: "is_group",
        header: "Tipo",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                <TypeBadge isGroup={row.getValue("is_group")} />
            </div>
        ),
        size: "w-[10%]",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                <StatusBadge status={row.getValue("status")} />
            </div>
        ),
        size: "w-[10%]",
    },
    {
        accessorKey: "grade",
        header: "Calificación",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("grade") ?? "-"}</div>
        ),
        size: "w-[10%]",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const project = row.original;
            return (
                <div className="flex justify-start gap-2">
                    <ActionButton
                        icon={Info}
                        label="Detalles"
                        onClick={() => {
                            if (project.onViewDetails) {
                                project.onViewDetails(project);
                            }
                        }}
                    />
                    <ActionButton
                        icon={Edit}
                        label="Editar"
                        onClick={() => {
                            console.log("Editar proyecto", project);
                        }}
                    />
                    <ActionButton
                        icon={Trash2}
                        label="Eliminar"
                        onClick={() => {
                            console.log("Eliminar proyecto", project);
                        }}
                    />
                </div>
            );
        },
        size: "w-[15%]",
    },
];
