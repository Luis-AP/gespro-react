import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Info, Send, BookCheck } from "lucide-react";
import formatDate from "../../lib/format-date";

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

const StatusBadge = ({ due_date }) => {
    const isOpen = new Date(due_date) > new Date();
    return (
        <Badge variant={isOpen ? "default" : "secondary"}>
            {isOpen ? "Abierta" : "Cerrada"}
        </Badge>
    );
};

export const professorColumns = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <div
                    className="font-medium cursor-pointer hover:underline"
                    onClick={() => {
                        if (activity.onProjects) {
                            activity.onProjects(activity);
                        }
                    }}
                >
                    {row.getValue("name")}
                </div>
            );
        },
        size: "w-[40%]",
    },
    {
        accessorKey: "due_date",
        header: "Fecha de entrega",
        cell: ({ row }) => {
            return (
                <div className="flex justify-start">
                    {formatDate(row.getValue("due_date"))}
                </div>
            );
        },
        size: "w-[20%]",
    },
    {
        accessorKey: "min_grade",
        header: "Nota mínima",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("min_grade")}</div>
        ),
        size: "w-[10%]",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                <StatusBadge due_date={row.getValue("due_date")} />
            </div>
        ),
        size: "w-[15%]",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <div className="flex justify-start gap-2">
                    <ActionButton
                        icon={Info}
                        label="Detalles"
                        onClick={() => {
                            if (activity.onViewDetails) {
                                activity.onViewDetails(activity);
                            }
                        }}
                    />
                    <ActionButton
                        icon={Edit}
                        label="Editar"
                        onClick={() => {
                            if (activity.onEdit) {
                                activity.onEdit(activity);
                            }
                        }}
                    />
                    <ActionButton
                        icon={Trash2}
                        label="Eliminar"
                        onClick={() => {
                            if (activity.onDelete) {
                                activity.onDelete(activity);
                            }
                        }}
                    />
                    <ActionButton
                        icon={BookCheck}
                        label="Ver Proyectos"
                        onClick={() => {
                            if (activity.onProjects) {
                                activity.onProjects(activity);
                            }
                        }}
                    />
                </div>
            );
        },
        size: "w-[15%]",
    },
];

export const studentColumns = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("name")}</div>
        ),
        size: "w-[25%]",
    },
    {
        accessorKey: "professor",
        header: "Profesor",
        cell: ({ row }) => {
            const professor = row.getValue("professor");
            return (
                <div className="flex flex-col gap-1">
                    <span className="font-medium">
                        {professor.first_name} {professor.last_name}
                    </span>
                    <span className="text-sm text-gray-500">
                        {professor.email}
                    </span>
                </div>
            );
        },
        size: "w-[20%]",
    },
    {
        accessorKey: "due_date",
        header: "Fecha de entrega",
        cell: ({ row }) => {
            return (
                <div className="flex justify-start">
                    {formatDate(row.getValue("due_date"))}
                </div>
            );
        },
        size: "w-[20%]",
    },
    {
        accessorKey: "min_grade",
        header: "Nota mínima",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("min_grade")}</div>
        ),
        size: "w-[10%]",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                <StatusBadge due_date={row.getValue("due_date")} />
            </div>
        ),
        size: "w-[15%]",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <div className="flex justify-start gap-2">
                    <ActionButton
                        icon={Info}
                        label="Detalles"
                        onClick={() => {
                            if (activity.onViewDetails) {
                                activity.onViewDetails(activity);
                            }
                        }}
                    />
                    <ActionButton
                        icon={Send}
                        label={"Enviar Proyecto"}
                        onClick={() => {
                            if (activity.onAddProject) {
                                activity.onAddProject(activity);
                            }
                        }}
                    />
                </div>
            );
        },
        size: "w-[10%]",
    },
];
