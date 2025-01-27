import React from "react";
import { useState } from "react";
import { studentColumns as columns } from "@/components/projects/columns";
import { DataTable } from "@/components/projects/data-table";

import { ProjectDetails } from "@/components/projects/ProjectDetails";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectEditForm from "@/components/projects/ProjectEditForm";
import { DeleteDialog as ProjectDeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";

import projectsService from "../../services/projectsService";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

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

    const { state } = useAuth();
    const user = state.user;

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
            setProjects(response);
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
            const response = await projectsService.createProject(project);
            setFormOpen(false);
            fetchProjects();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setEditFormOpen(true);
    };

    const handleSubmitEditProject = async (project) => {
        try {
            // Llamar al servicio para editar un proyecto
            //...
            // Cerrar el formulario
            setEditFormOpen(false);
        } catch (error) {
            console.error(error);
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
        } catch (error) {
            console.error(error);
        }
    };

    const dataWithViewDetails = projects.map((project) => ({
        ...project,
        onViewDetails: () => handleViewDetails(project),
        onEdit: () => handleEditProject(project),
        onDelete: () => handleDeleteProject(project.id),
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
        </div>
    );
};

export default StudentProjects;
