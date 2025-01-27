import { get, post } from "./api";
import Cookies from "js-cookie";

class ActivitiesService {
    async getActivities() {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("No authentication token found");
        }
        return get("/activities", token);
    }

    async createActivity(activityData) {
        try {
            // Cuando esté listo el backend: return post('/activities', activityData, token);
            // Validaciones básicas

            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            // Format yyyy-mm-dd
            let due_date = new Date(activityData.dueDate);
            due_date = due_date.toISOString().split("T")[0];

            return post(
                "/activities",
                {
                    name: activityData.name,
                    description: activityData.description,
                    due_date: due_date,
                    min_grade: activityData.minGrade,
                    professor_id: 1,
                },
                token
            );
        } catch (error) {
            throw error;
        }
    }
}

export default new ActivitiesService();
