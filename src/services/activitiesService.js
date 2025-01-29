import { get, post, patch, remove } from "./api";
import Cookies from "js-cookie";

class ActivitiesService {
    async getActivities() {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("No authentication token found");
        }
        return get("/activities", token);
    }

    async getActivity(activityId) {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        return get(`/activities/${activityId}`, token);
    }

    async createActivity(activityData) {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            // Format yyyy-mm-dd
            let due_date = new Date(activityData.due_date);
            due_date = due_date.toISOString().split("T")[0];

            return post(
                "/activities",
                {
                    name: activityData.name,
                    description: activityData.description,
                    due_date: due_date,
                    min_grade: activityData.min_grade,
                    professor_id: 1,
                },
                token
            );
        } catch (error) {
            throw error;
        }
    }

    async updateActivity(activityData) {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            // Format yyyy-mm-dd
            let due_date = new Date(activityData.due_date);
            due_date = due_date.toISOString().split("T")[0];

            return patch(
                `/activities/${activityData.id}`,
                {
                    name: activityData.name,
                    description: activityData.description,
                    due_date: due_date,
                    min_grade: activityData.min_grade,
                    professor_id: 1,
                },
                token
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteActivity(activityId) {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            return remove(`/activities/${activityId}`, token);
        } catch (error) {
            throw error;
        }
    }
}

export default new ActivitiesService();
