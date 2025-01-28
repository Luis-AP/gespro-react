import React from "react";
import { useState } from "react";
import { ProjectProfessorColumns as columns } from "@/components/projects/ProjectProfessorColumns";
import { DataTable } from "@/components/projects/DataTable";

import { ProjectDetails } from "@/components/projects/ProjectDetails";

import projectsService from "../../services/projectsService";
import userService from "../../services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import ProjectFilterByActivity from "../../components/projects/ProjectFilterByActivity";
import { useLocation } from "react-router-dom";

const ProfessorProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Proyecto seleccionado
    const [selectedProject, setSelectedProject] = useState(null);

    // Detalles de un proyecto
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const { state } = useAuth();
    const user = state.user;

    const { toast } = useToast();

    const location = useLocation();

    useEffect(() => {
        if (location.state?.activity) {
            setSelectedActivity(location.state.activity);
            toast({
                title: "Actividad seleccionada",
                description: `${location.state.activity.name}`,
            });
        } else {
            fetchProjects();
        }
    }, [location.state, user]);

    useEffect(() => {
        if (selectedActivity) {
            fetchProjects(selectedActivity.id);
        }
    }, [selectedActivity]);

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setDetailsOpen(true);
    };

    const fetchProjects = async (activityId) => {
        try {
            setIsLoading(true);
            const response = await projectsService.getProjects(
                activityId ? { activity_id: activityId } : {}
            );

            const projectsWithProfessors = await Promise.all(
                response.map(async (project) => {
                    const professor = await userService.getProfessor(
                        project.professor_id
                    ); // Servicio para obtener al profesor
                    return { ...project, professor };
                })
            );

            setProjects(projectsWithProfessors);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetProjects = () => {
        setSelectedActivity(null);
        fetchProjects();
    };

    const dataWithViewDetails = projects.map((project) => ({
        ...project,
        onViewDetails: () => handleViewDetails(project),
        onGrade: () => alert("Calificar proyecto: " + project.title),
    }));

    return (
        <div className="p-8">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-6">Proyectos</h1>
                <div className="mb-4">
                    <ProjectFilterByActivity
                        selectedActivity={selectedActivity}
                        setSelectedActivity={setSelectedActivity}
                        onReset={handleResetProjects}
                    />
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
            <Toaster />
        </div>
    );
};

export default ProfessorProjects;
