import React from "react";
import { useState } from "react";
import { studentColumns as columns } from "@/components/activities/columns";
import { DataTable } from "@/components/activities/data-table";
import { ActivityDetails } from "@/components/activities/activity-details";
import activitiesData from "./activity-data";

const StudentDashboard = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleViewDetails = (activity) => {
        setSelectedActivity(activity);
        setDetailsOpen(true);
    };

    const dataWithViewDetails = activitiesData.activities.map((activity) => ({
        ...activity,
        onViewDetails: handleViewDetails,
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
        </div>
    );
};

export default StudentDashboard;
