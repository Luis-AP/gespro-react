import { Edit, Trash2, Info, UserPen } from "lucide-react";
import { StatusBadge, TypeBadge } from "../CustomBadges";
import ActionButton from "../ActionButton";

export const ProjectStudentColumns = [
    {
        accessorKey: "title",
        header: "Título",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("title")}</div>
        ),
        size: "w-[20%]",
    },
    {
        accessorKey: "activity",
        header: "Actividad",
        cell: ({ row }) => (
            <div className="flex justify-start font-medium">
                {row.getValue("activity")}
            </div>
        ),
        size: "w-[20%]",
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
        accessorKey: "is_group",
        header: "Tipo",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                <TypeBadge isGroup={row.getValue("is_group")} />
            </div>
        ),
        size: "w-[5%]",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <div className="flex justify-start gap-2">
                <StatusBadge status={row.getValue("status")} />
            </div>
        ),
        size: "w-[5%]",
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
                            if (project.onEdit) {
                                project.onEdit(project);
                            }
                        }}
                    />
                    <ActionButton
                        icon={Trash2}
                        label="Eliminar"
                        onClick={() => {
                            if (project.onDelete) {
                                project.onDelete(project.id);
                            }
                        }}
                    />
                    <ActionButton
                        icon={UserPen}
                        label="Integrantes"
                        onClick={() => {
                            if (project.onMemberManagement) {
                                project.onMemberManagement(project);
                            }
                        }}
                    />
                </div>
            );
        },
        size: "w-[20%]",
    },
];
