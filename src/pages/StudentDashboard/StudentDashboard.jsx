import { useState, useEffect } from "react";
import { studentColumns as columns } from "@/components/activities/columns";
import { DataTable } from "@/components/activities/data-table";
import { ActivityDetails } from "@/components/activities/activity-details";
import activitiesService from "@/services/activitiesService";
import projectsService from "@/services/projectsService";
import { useAuth } from "@/hooks/useAuth";
import ProjectForm from "@/components/projects/ProjectForm";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const StudentDashboard = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useAuth();
    const user = state.user;
    const { toast } = useToast();

    useEffect(() => {
        fetchActivities();
    }, [user]);

    const handleViewDetails = async (activity) => {
        setSelectedActivity(activity);
        setDetailsOpen(true);
    };

    const fetchActivities = async () => {
        try {
            setIsLoading(true);
            const activities = await activitiesService.getActivities();
            setActivities(activities);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = (activity) => {
        setSelectedActivity(activity);
        setFormOpen(true);
    };

    const handleSubmitNewProject = async (project) => {
        try {
            setIsLoading(true);
            const response = await projectsService.createProject(project);
            setFormOpen(false);
            // Toast notification de éxito
            toast({
                title: "Proyecto creado",
                description: "El proyecto ha sido creado con éxito",
            });
        } catch (error) {
            // Toast notification de error
            toast({
                title: "Error",
                description: error.message || "Ha ocurrido un error al crear el proyecto",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const dataWithViewDetails = activities.map((activity) => ({
        ...activity,
        onViewDetails: () => handleViewDetails(activity),
        onAddProject: () => handleCreateProject(activity),
    }));

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Actividades</h1>
            <DataTable columns={columns} data={dataWithViewDetails} />
            <ActivityDetails
                activity={selectedActivity}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
            <ProjectForm
                activity={selectedActivity}
                open={formOpen}
                onOpenChange={setFormOpen}
                isLoading={isLoading}
                onSubmit={(project) => handleSubmitNewProject(project)}
            />
            <Toaster />
        </div>
    );
};

export default StudentDashboard;
