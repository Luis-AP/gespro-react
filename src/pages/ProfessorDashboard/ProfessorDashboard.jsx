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
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
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

    const dataWithViewDetails = activities.map((activity) => ({
        ...activity,
        onViewDetails: () => handleViewDetails(activity),
        // Redirigir a la vista de proyectos al hacer clic en una actividad
        onProjects: () => handleShowProjects(activity),
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
            <Toaster />
        </div>
    );
};

export default ProfessorDashboard;
