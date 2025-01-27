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

    async getProjectById(projectId) {
      const projects = await this.getProjects();
      return projects.find(project => project.id === projectId);
    }

    async addMember(projectId, studentId) {
        const token = Cookies.get("token");
        try {
            const endpoint = `/projects/${projectId}/members`;
            return await post(endpoint, { student_id: studentId }, token);
        } catch (error) {
            throw error;
        }
    }

    async removeMember(projectId, studentId) {
        const token = Cookies.get("token");
        try {
            const endpoint = `/projects/${projectId}/members/${studentId}`;
            return await remove(endpoint, token);
        } catch (error) {
            throw error;
        }
    }

    async searchStudents(searchTerm) {
        const token = Cookies.get("token");
        try {
            if (!searchTerm || searchTerm.length < 2) {
                return [];
            }
            const endpoint = `/users/students/search?q=${encodeURIComponent(searchTerm)}`;
            return await get(endpoint, token);
        } catch (error) {
            throw error;
        }
    }
}

export default new ProjectsService();
