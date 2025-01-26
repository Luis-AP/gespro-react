import { get } from "./api";
import Cookies from "js-cookie";

class UserService {
    async getProfessor(professorId) {
        const token = Cookies.get("token");
        try {
            const endpoint = `/users/professors/${professorId}`;
            const response = await get(endpoint, token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getStudent(studentId) {
        const token = Cookies.get("token");
        try {
            const endpoint = `/users/students/${studentId}`;
            const response = await get(endpoint, token);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();