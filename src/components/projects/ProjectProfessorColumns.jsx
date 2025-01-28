import { Info } from "lucide-react";
import { StatusBadge, TypeBadge } from "../CustomBadges";
import ActionButton from "../ActionButton";

export const ProjectProfessorColumns = [
    {
        accessorKey: "title",
        header: "Título",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("title")}</div>
        ),
        size: "w-[25%]",
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
                </div>
            );
        },
        size: "w-[20%]",
    },
];
