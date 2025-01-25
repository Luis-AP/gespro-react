import { get, post } from "./api";
import { simulateResponse } from "./api";
import projectsData from "./project-data";

class ProjectsService {
    async getProjects(filters = {}) {
        try {
            let filteredProjects = [...projectsData.projects];

            if (filters.studentId) {
                filteredProjects = filteredProjects.filter(
                    (project) =>
                        project.studentId === parseInt(filters.studentId)
                );
            }

            return simulateResponse({
                projects: filteredProjects,
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteProject(projectId) {
        try {
            const projectIndex = projectsData.projects.findIndex(
                (project) => project.id === projectId
            );

            if (projectIndex === -1) {
                throw new Error("Project not found");
            }

            projectsData.projects.splice(projectIndex, 1);

            return simulateResponse({});
        } catch (error) {
            throw error;
        }
    }
}

export default new ProjectsService();
