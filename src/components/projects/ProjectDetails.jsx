import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Calendar,
    GraduationCap,
    Clock,
    Users,
    User,
    Link as URL,
    Copy,
    Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { StatusBadge } from "../CustomBadges";
import userService from "../../services/userService";
import projectsService from "../../services/projectsService";
import { useAuth } from "@/hooks/useAuth";

export function ProjectDetails({
    project,
    open,
    onOpenChange,
    onProjectUpdate,
}) {
    const [professor, setProfessor] = useState(null);
    const [members, setMembers] = useState([]);
    const [isEditingGrade, setIsEditingGrade] = useState(false);
    const [gradeInput, setGradeInput] = useState("");
    const [currentProject, setCurrentProject] = useState(project);
    const { toast } = useToast();
    const { state } = useAuth();
    const user = state.user;

    useEffect(() => {
        setCurrentProject(project);
        if (project) {
            handleProfessor();
            handleMembers(project.member_ids);
        }
    }, [project]);

    useEffect(() => {
        setIsEditingGrade(false);
        if (currentProject?.grade) {
            setGradeInput(currentProject.grade.toString());
        } else {
            setGradeInput("");
        }
    }, [open, currentProject]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "America/Argentina/Buenos_Aires",
        });
    };

    const handleProfessor = async () => {
        if (!project?.professor) return;
        try {
            setProfessor(project.professor);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMembers = async (memberIDs) => {
        try {
            const membersData = await Promise.all(
                memberIDs.map(async (studentID) => {
                    const student = await userService.getStudent(studentID);
                    return {
                        id: student.id,
                        first_name: student.first_name,
                        last_name: student.last_name,
                    };
                })
            );
            setMembers(membersData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGradeSubmit = async () => {
        try {
            const grade = parseFloat(gradeInput);
            if (isNaN(grade) || grade < 0 || grade > 10) {
                toast({
                    title: "Error",
                    description:
                        "La calificación debe ser un número entre 0 y 10",
                    variant: "destructive",
                });
                return;
            }

            await projectsService.gradeProject(currentProject.id, grade);

            // Actualizar el estado local
            setCurrentProject({ ...currentProject, grade });

            // Notificar al componente padre
            if (onProjectUpdate) {
                onProjectUpdate({ ...currentProject, grade });
            }

            toast({
                title: "Éxito",
                description: "Proyecto calificado correctamente",
            });
            setIsEditingGrade(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "No se pudo calificar el proyecto",
                variant: "destructive",
            });
        }
    };

    const renderGradeSection = () => {
        const canGrade =
            user?.role === "professor" &&
            (currentProject?.status === "READY" ||
                currentProject?.status === "GRADED");

        if (!canGrade) {
            return (
                <p className="text-sm text-gray-500">
                    {currentProject?.grade ?? "-"}
                </p>
            );
        }

        if (isEditingGrade) {
            return (
                <div className="flex gap-2">
                    <Input
                        type="number"
                        value={gradeInput}
                        onChange={(e) => setGradeInput(e.target.value)}
                        className="w-20"
                        min="0"
                        max="10"
                        step="0.1"
                    />
                    <Button size="sm" onClick={handleGradeSubmit}>
                        Calificar
                    </Button>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                    {currentProject?.grade ?? "-"}
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setIsEditingGrade(true)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    return currentProject ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {currentProject.title}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <URL className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm font-medium mb-1">
                                Repositorio
                            </p>
                            <Link
                                to={currentProject.repository_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500"
                            >
                                {currentProject.repository_url}
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            className="w-8 h-8"
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    currentProject.repository_url
                                );
                                toast({
                                    title: "Copiado",
                                    description:
                                        "URL del repositorio copiada al portapapeles",
                                });
                            }}
                        >
                            <span className="sr-only">Copy</span>
                            <Copy />
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <GraduationCap className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="text-sm font-medium mb-1">
                                Calificación
                            </p>
                            {renderGradeSection()}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Clock className="h-5 w-5 text-yellow-500" />
                        <div>
                            <p className="text-sm font-medium mb-1">Estado</p>
                            <StatusBadge status={currentProject.status} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm font-medium mb-1">
                                Fecha de creación
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatDate(currentProject.created_at)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="text-sm font-medium mb-1">
                                Última actualización
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatDate(currentProject.updated_at)}
                            </p>
                        </div>
                    </div>
                    {user?.role === "student" ? (
                        <div className="flex items-center gap-4">
                            <User className="h-5 w-5 text-crimson-500" />
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    Profesor
                                </p>
                                <p className="text-sm text-gray-500">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium">
                                            Nombre Completo:{" "}
                                            {professor.first_name}{" "}
                                            {professor.last_name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Email: {professor.email}
                                        </span>
                                    </div>
                                </p>
                            </div>
                        </div>
                    ) : null}
                    {members && (
                        <div className="flex items-start gap-4">
                            <Users className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    Integrantes
                                </p>
                                <ul className="text-sm text-gray-500">
                                    {members.map((member) => (
                                        <li
                                            key={member.id}
                                        >{`${member.last_name}, ${member.first_name}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
            <Toaster />
        </Dialog>
    ) : null;
}
