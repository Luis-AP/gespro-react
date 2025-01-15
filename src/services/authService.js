import { simulateResponse, simulateError } from './api';
import { get, post } from './api';

const mockUsers = [
  {
    id: 2,
    email: 'profesor@ejemplo.com',
    password: 'password123',
    role: 'professor',
    name: 'Carlos',
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
    id: user.id,
    sub: user.email,
    role: user.role,
    name: `${user.name} ${user.lastName}`,
  };
  
  return btoa(JSON.stringify(payload));
}

class AuthService {
  async login(credentials) {
    try {
        const formData = new FormData();
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        
        const response = await post('/auth/login', formData);
        
        if (!response || !response.token) {
            throw new Error('Respuesta inválida del servidor');
        }

        // Obtener la información completa del usuario validando el token
        const userData = await this.validateToken(response.token);
        console.log('User data:', userData);
        
        return {
            token: response.token,
            user: userData
        };
    } catch (error) {
        console.error('Login error:', error);
        if (error.status === 404) {
            throw new Error('Email o contraseña incorrectos');
        }
        throw new Error('Error al iniciar sesión');
    }
  }

  async register(studentData) {
    try {
      const formData = new FormData();
      formData.append('email', studentData.email);
      formData.append('password', studentData.password);
      formData.append('first_name', studentData.name);
      formData.append('last_name', studentData.lastName);
      formData.append('enrollment_number', studentData.enrollmentNumber);
      formData.append('major', studentData.career);

      const enrollmentDate = new Date(studentData.enrollmentDate);
      formData.append('enrolled_at', enrollmentDate.toISOString().split('T')[0]);

      const response = await post('/auth/register', formData);

      if (!response) {
        throw new Error('Error al registrar estudiante');
      }

      // Login automático después del registro exitoso
      return this.login({
        email: studentData.email,
        password: studentData.password
      });
    } catch (error) {
      console.error('Register error:', error);
      if (error.response?.status === 401) {
        throw new Error('La contraseña no cumple con los requisitos mínimos');
      }
      if (error.response?.status === 500) {
        const data = await error.response.json();
        if (data.message.includes('duplicated')) {
          throw new Error('El email o número de matrícula ya está registrado');
        }
      }
      throw new Error('Error al registrar estudiante');
    }
  }

  async validateToken(token) {
    if (!token) return null;

    try {
        // Usar la utilidad get() que ya maneja headers y errores
        const userData = await get('/auth/validate', token);
        return userData;
    } catch (error) {
        console.error('Token validation error:', error);
        // Mantener el formato de error específico para el token
        if (error.status === 401) {
            throw new Error('Token inválido o expirado');
        }
        if (error.status === 404) {
            throw new Error('Usuario no encontrado');
        }
        throw new Error(error.message || 'Error al validar token');
    }
}
}

export default new AuthService();