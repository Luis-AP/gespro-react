import React from "react";
import { useState } from "react";
import { ProjectStudentColumns as columns } from "@/components/projects/ProjectStudentColumns";
import { DataTable } from "@/components/projects/DataTable";

import { ProjectDetails } from "@/components/projects/ProjectDetails";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectEditForm from "@/components/projects/ProjectEditForm";
import { DeleteDialog as ProjectDeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";

import projectsService from "../../services/projectsService";
import activitiesService from "../../services/activitiesService";
import userService from "../../services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import GroupManagement from "@/components/projects/groups/GroupManagement";

const StudentProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Proyecto seleccionado
    const [selectedProject, setSelectedProject] = useState(null);

    // Formulario para creación de proyecto
    const [formOpen, setFormOpen] = useState(false);
    // Formulario para edición de proyecto
    const [editFormOpen, setEditFormOpen] = useState(false);
    // Detalles de un proyecto
    const [detailsOpen, setDetailsOpen] = useState(false);
    // Modal para confirmar la eliminación de un proyecto
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // Modal para la gestión de grupos
    const [groupManagementOpen, setGroupManagementOpen] = useState(false);

    const { state } = useAuth();
    const user = state.user;

    const { toast } = useToast();

    useEffect(() => {
        fetchProjects();
    }, [user]);

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setDetailsOpen(true);
    };

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const response = await projectsService.getProjects();

            const projectsWithProfessors = await Promise.all(
                response.map(async (project) => {
                    const professor = await userService.getProfessor(
                        project.professor_id
                    ); // Servicio para obtener al profesor
                    return { ...project, professor };
                })
            );

            const projectsWithActivities = await Promise.all(
                projectsWithProfessors.map(async (project) => {
                    const activity = await activitiesService.getActivity(
                        project.activity_id
                    );
                    return { ...project, activity: activity.name };
                })
            );

            setProjects(projectsWithActivities);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = () => {
        setSelectedProject(null);
        setFormOpen(true);
    };

    const handleSubmitNewProject = async (project) => {
        try {
            setIsLoading(true);
            await projectsService.createProject(project);
            fetchProjects();

            toast({
                title: "Proyecto creado",
                description: "El proyecto se ha creado correctamente",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "No se pudo crear el proyecto",
                variant: "destructive",
            });
        } finally {
            setFormOpen(false);
            setIsLoading(false);
        }
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setEditFormOpen(true);
    };

    const handleSubmitEditProject = async (project) => {
        try {
            setIsLoading(true);
            await projectsService.updateProject(project);

            toast({
                title: "Proyecto actualizado",
                description: "El proyecto se ha actualizado correctamente",
            });
            fetchProjects();
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error.message || "No se pudo actualizar el proyecto",
                variant: "destructive",
            });
        } finally {
            setEditFormOpen(false);
            setIsLoading(false);
        }
    };

    const handleDeleteProject = async (projectId) => {
        setSelectedProject(
            projects.find((project) => project.id === projectId)
        );
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async (projectId) => {
        try {
            setIsLoading(true);
            await projectsService.deleteProject(projectId);
            fetchProjects();
            toast({
                title: "Proyecto eliminado",
                description: "El proyecto se ha eliminado correctamente",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "No se pudo eliminar el proyecto",
                variant: "destructive",
            });
        } finally {
            setDeleteDialogOpen(false);
            setIsLoading(false);
        }
    };

    const handleMemberManagement = (project) => {
        setSelectedProject(project);
        setGroupManagementOpen(true);
    };

    const handleUpdateProject = async (project) => {
        let updatedProject = await projectsService.getProjectById(project.id);
        //Update professor
        const professor = await userService.getProfessor(
            updatedProject.professor_id
        );
        updatedProject.professor = professor;

        const updatedProjects = projects.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
        );

        setProjects(updatedProjects);
    };

    const dataWithViewDetails = projects.map((project) => ({
        ...project,
        onViewDetails: () => handleViewDetails(project),
        onEdit: () => handleEditProject(project),
        onDelete: () => handleDeleteProject(project.id),
        onMemberManagement: () => handleMemberManagement(project),
    }));

    return (
        <div className="p-8">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-6">Proyectos</h1>
                <div className="mb-4">
                    <Button onClick={handleCreateProject}>
                        Nuevo Proyecto
                    </Button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={dataWithViewDetails}
                isLoading={isLoading}
            />
            <ProjectDetails
                project={selectedProject}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
            <ProjectForm
                project={selectedProject || {}}
                open={formOpen}
                onOpenChange={setFormOpen}
                isLoading={isLoading}
                onSubmit={(project) => handleSubmitNewProject(project)}
            />
            <ProjectEditForm
                project={selectedProject}
                open={editFormOpen}
                onOpenChange={setEditFormOpen}
                isLoading={isLoading}
                onSubmit={(project) => handleSubmitEditProject(project)}
            />
            <ProjectDeleteDialog
                title="¿Estás completamente seguro?"
                description="Esta acción no se puede deshacer. Esto eliminará
                        permanentemente el proyecto."
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={() => handleConfirmDelete(selectedProject.id)}
            />
            <GroupManagement
                project={selectedProject}
                updateProject={handleUpdateProject}
                open={groupManagementOpen}
                onOpenChange={setGroupManagementOpen}
                memberLimit={5}
            />
            <Toaster />
        </div>
    );
};

export default StudentProjects;
