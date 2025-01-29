import React from "react";
import { useState, useEffect } from "react";
import { professorColumns as columns } from "@/components/activities/columns";
import { DataTable } from "@/components/activities/data-table";
import { ActivityDetails } from "@/components/activities/activity-details";
import ActivityForm from "@/components/activities/ActivityForm";
import { Button } from "@/components/ui/button";
import activitiesService from "@/services/activitiesService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const ProfessorDashboard = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    // Detalles de la actividad
    const [detailsOpen, setDetailsOpen] = useState(false);
    // Formulario para crear una actividad
    const [formOpen, setFormOpen] = useState(false);
    // Formulario para edición de una actividad
    const [editFormOpen, setEditFormOpen] = useState(false);
    // Modal para confirmar la eliminación de una actividad
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { state } = useAuth();
    const user = state.user;
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, [user]);

    const fetchActivities = async () => {
        try {
            setIsLoading(true);
            const activities = await activitiesService.getActivities();
            setActivities(activities);
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudieron cargar las actividades",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = async (activity) => {
        try {
            setSelectedActivity(activity);
            setDetailsOpen(true);
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo cargar el detalle de la actividad",
                variant: "destructive",
            });
        }
    };

    const handleCreateActivity = () => {
        setSelectedActivity(null);
        setFormOpen(true);
    };

    const handleSubmitNewActivity = async (activityData) => {
        try {
            setIsLoading(true);
            const newActivityData = {
                ...activityData,
                professorId: user.id,
            };

            await activitiesService.createActivity(newActivityData);

            toast({
                title: "Éxito",
                description: "Actividad creada correctamente",
            });

            setFormOpen(false);
            fetchActivities();
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "No se pudo crear la actividad",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowProjects = (activity) => {
        setSelectedActivity(activity);
        navigate("/projects/professor", { state: { activity } });
    };

    const handleEditActivity = (activity) => {
        setSelectedActivity(activity);
        setEditFormOpen(true);
    };

    const handleSubmitEditActivity = async (activity) => {
        try {
            setIsLoading(true);
            await activitiesService.updateActivity(activity);

            toast({
                title: "Actividad actualizada",
                description: "La actividad se ha actualizado correctamente",
            });
            setEditFormOpen(false);
            fetchActivities();
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error.message || "No se pudo actualizar la actividad",
                variant: "destructive",
            });
        }
    };

    const handleDeleteActivity = async (activityId) => {
        setSelectedActivity(
            projects.find((activity) => activity.id === activityId)
        );
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async (activityId) => {
        try {
            setIsLoading(true);
            await activitiesService.deleteActivity(activityId);
            fetchActivities();
            toast({
                title: "Actividad eliminada",
                description: "La actividad se ha eliminado correctamente",
            });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error.message || "No se pudo eliminar la actividad",
                variant: "destructive",
            });
        }
    };

    const dataWithViewDetails = activities.map((activity) => ({
        ...activity,
        onViewDetails: () => handleViewDetails(activity),
        // Redirigir a la vista de proyectos al hacer clic en una actividad
        onProjects: () => handleShowProjects(activity),
        onEdit: () => handleEditActivity(activity),
        onDelete: () => handleDeleteActivity(activity.id),
    }));

    return (
        <div className="p-8">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-6">Actividades</h1>
                <div className="mb-4">
                    <Button onClick={handleCreateActivity}>
                        Nueva Actividad
                    </Button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={dataWithViewDetails}
                isLoading={isLoading}
            />
            <ActivityDetails
                activity={selectedActivity}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
            <ActivityForm
                open={formOpen}
                onOpenChange={setFormOpen}
                isLoading={isLoading}
                onSubmit={handleSubmitNewActivity}
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
            <Toaster />
        </div>
    );
};

export default ProfessorDashboard;
