import { get, post, remove } from "./api";
import { simulateResponse } from "./api";
import projectsData from "./project-data";
import Cookies from "js-cookie";

class ProjectsService {
    async getProjects(filters = {}) {
        const token = Cookies.get("token");
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const endpoint = `/projects?${queryParams}`;
            const response = await get(endpoint, token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createProject(project) {
        const token = Cookies.get("token");
        try {
            const endpoint = "/projects";
            const response = await post(endpoint, project, token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteProject(projectId) {
        const token = Cookies.get("token");
        try {
            const endpoint = `/projects/${projectId}`;
            const response = await remove(endpoint, token);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProjectsService();
