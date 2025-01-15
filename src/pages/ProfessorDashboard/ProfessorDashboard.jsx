import React from "react";
import { useState } from "react";
import { professorColumns as columns } from "@/components/activities/columns";
import { DataTable } from "@/components/activities/data-table";
import { ActivityDetails } from "@/components/activities/activity-details";
import ActivityForm from "@/components/activities/ActivityForm";
import { Button } from "@/components/ui/button";
import activitiesData from "./activity-data";

const ProfessorDashboard = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

    const handleViewDetails = (activity) => {
        setSelectedActivity(activity);
        setDetailsOpen(true);
    };

    const handleCreateActivity = () => {
        /* Siempre y cuando no se haya seleccionado una actividad previamente */
        setSelectedActivity(null);
        setFormOpen(true);
    };

    const handleSubmitNewActivity = (newActivity) => {
        console.log("Nueva actividad creada:", newActivity);
        setFormOpen(false);
        // setActivities([...activities, newActivity]);
    };

    const dataWithViewDetails = activitiesData.activities.map((activity) => ({
        ...activity,
        onViewDetails: handleViewDetails,
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
            <DataTable columns={columns} data={dataWithViewDetails} />
            <ActivityDetails
                activity={selectedActivity}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
            <ActivityForm
                open={formOpen}
                onOpenChange={setFormOpen}
                isLoading={false}
                onSubmit={handleSubmitNewActivity}
            />
        </div>
    );
};

export default ProfessorDashboard;
