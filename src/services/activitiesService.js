import { get, post } from './api';
import { simulateResponse, simulateError } from './api';
import { activitiesData } from './activity-data';

class ActivitiesService {
  async getActivities(filters = {}) {
    try {
      let filteredActivities = [...activitiesData.activities];
      
      if (filters.professorId) {
        filteredActivities = filteredActivities.filter(
          activity => activity.professorId === parseInt(filters.professorId)
        );
      }

      return simulateResponse({
        activities: filteredActivities
      });
    } catch (error) {
      throw error;
    }
}

  async getActivityById(id) {
    try {
      // Cuando esté listo el backend: return get(`/activities/${id}`, token);
      
      const activity = activitiesData.activities.find(
        activity => activity.id === parseInt(id)
      );

      if (!activity) {
        return simulateError('Actividad no encontrada', 404);
      }

      return simulateResponse({ activity });
    } catch (error) {
      throw error;
    }
  }

  async createActivity(activityData, token) {
    try {
      // Cuando esté listo el backend: return post('/activities', activityData, token);
      
      // Validaciones básicas
      if (!activityData.name || !activityData.dueDate || !activityData.minGrade || !activityData.professorId) {
        return simulateError('Faltan campos requeridos', 400);
      }

      const newId = Math.max(...activitiesData.activities.map(a => a.id)) + 1;

      const newActivity = {
        id: newId,
        ...activityData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      activitiesData.activities.push(newActivity);

      return simulateResponse({ activity: newActivity });
    } catch (error) {
      throw error;
    }
  }
}

export default new ActivitiesService();