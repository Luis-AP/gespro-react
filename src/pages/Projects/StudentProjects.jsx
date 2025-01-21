import React from "react";
import { useState } from "react";
import { studentColumns as columns } from "@/components/projects/columns";
import { DataTable } from "@/components/projects/data-table";
import { ProjectDetails } from "@/components/projects/project-details";
import projectsData from "./project-data";
import { Button } from "@/components/ui/button";

const StudentProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setDetailsOpen(true);
    };

    const dataWithViewDetails = projectsData.projects.map((project) => ({
        ...project,
        onViewDetails: handleViewDetails,
    }));

    const handleCreateProject = () => {
        setSelectedProject(null);
    };

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
            <DataTable columns={columns} data={dataWithViewDetails} />
            <ProjectDetails
                project={selectedProject}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
        </div>
    );
};

export default StudentProjects;
