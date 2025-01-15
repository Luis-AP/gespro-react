import { simulateResponse, simulateError } from './api';

const mockUsers = [
  {
    email: 'profesor@ejemplo.com',
    password: 'password123',
    role: 'professor',
    name: 'Juan',
    lastName: 'Pérez'
  },
  {
    email: 'estudiante@ejemplo.com',
    password: 'password123',
    role: 'student',
    name: 'María',
    lastName: 'García',
    enrollmentNumber: '12345',
    career: 'Ingeniería',
    enrollmentDate: '2024-01-15'
  }
];

// Función auxiliar para generar tokens JWT simulados
function generateMockToken(user) {
  // Cuando esté lista la parte de Flask lo cambio a: return post('/auth/token', { email: user.email });
  const payload = {
    sub: user.email,
    role: user.role,
    name: `${user.name} ${user.lastName}`,
  };
  
  return btoa(JSON.stringify(payload));
}

class AuthService {
  async login(credentials) {
    try {
      // Cuando esté listo el controlador de Auth lo cambio a: return post('/auth/login', credentials);
      
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user || user.password !== credentials.password) {
        return simulateError('Credenciales inválidas', 401);
      }

      const token = generateMockToken(user);
      
      return simulateResponse({
        token,
        user: {
          email: user.email,
          role: user.role,
          name: `${user.name} ${user.lastName}`
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async register(studentData) {
    try {
      // Cuando esté listo el controlador de Auth lo cambio a: return post('/auth/register', studentData);
      
      // Validaciones que se van a hacer en backend cuando esté listo
      if (mockUsers.some(u => u.email === studentData.email)) {
        return simulateError('El email ya está registrado', 400);
      }

      if (!studentData.enrollmentNumber || !studentData.career) {
        return simulateError('Faltan datos obligatorios', 400);
      }

      const newUser = {
        ...studentData,
        role: 'student'
      };

      mockUsers.push(newUser);
      
      const token = generateMockToken(newUser);
      
      return simulateResponse({
        token,
        user: {
          email: newUser.email,
          role: newUser.role,
          name: `${newUser.name} ${newUser.lastName}`
        }
      });
    } catch (error) {
      throw error;
    }
  }

  // Método mock para validar token, después se va a hacer en backend
  validateToken(token) {
    try {
      const payload = JSON.parse(atob(token));
      console.log(payload);
      return payload;
    } catch {
      return null;
    }
  }
}

export default new AuthService();