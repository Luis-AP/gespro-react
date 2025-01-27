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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { StatusBadge } from "../CustomBadges";

import userService from "../../services/userService";

export function ProjectDetails({ project, open, onOpenChange }) {
    const [professor, setProfessor] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (project) {
            handleProfessor(project.professor_id);
            handleMembers(project.member_ids);
        }
    }, [project]);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    

    const handleProfessor = async (professorId) => {
        if (!professorId) return;

        try {
            const professor = await userService.getProfessor(professorId);
            setProfessor(`${professor.last_name}, ${professor.first_name}`);
        } catch (error) {
            console.error(error);
        }
    }

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
    }

    return project ? (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            {project.title}
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
                                    to={project.repository_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500"
                                >
                                    {project.repository_url}
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                size="sm"
                                className="w-8 h-8"
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        project.repository_url
                                    );
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
                                <p className="text-sm text-gray-500">
                                    {project.grade ?? "-"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <div>
                                <p className="text-sm font-medium mb-1">Estado</p>
                                <StatusBadge status={project.status} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium mb-1">
                                    Fecha de creación
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatDate(project.created_at)}
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
                                    {formatDate(project.updated_at)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <User className="h-5 w-5 text-crimson-500" />
                            <div>
                                <p className="text-sm font-medium mb-1">Profesor</p>
                                <p className="text-sm text-gray-500">
                                    {professor}
                                </p>
                            </div>
                        </div>
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
            </Dialog>
        ) : null;
}
