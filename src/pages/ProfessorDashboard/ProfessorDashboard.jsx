import React from 'react';
import { useState } from 'react';
import { columns } from '@/components/activities/columns'
import { DataTable } from '@/components/activities/data-table'
import { ActivityDetails } from '@/components/activities/activity-details'

const activitiesData = {
  "activities": [
    {
      "id": 1,
      "name": "Landing Page Responsive",
      "dueDate": "2025-01-04",
      "minGrade": 4,
      "description": "Desarrollar una landing page responsiva que se adapte a diferentes tamaños de pantalla utilizando HTML, CSS y JavaScript. Debe ser visualmente atractiva y tener una buena experiencia de usuario en dispositivos móviles, tablets y computadoras de escritorio."
    },
    {
      "id": 2,
      "name": "Formulario con Validación en React",
      "dueDate": "2025-01-10",
      "minGrade": 5,
      "description": "Crear un formulario en React con validaciones del lado del cliente.  Debe incluir diferentes tipos de campos (texto, correo electrónico, contraseña, etc.) y mostrar mensajes de error apropiados si la información ingresada no es válida."
    },
    {
      "id": 3,
      "name": "API REST con Node",
      "dueDate": "2025-02-01",
      "minGrade": 6,
      "description": "Desarrollar una API REST utilizando Node.js y Express.  La API debe manejar solicitudes GET, POST, PUT y DELETE, y responder con datos en formato JSON. Debe incluir al menos dos endpoints."
    },
    {
      "id": 4,
      "name": "Integración con Base de Datos MySQL",
      "dueDate": "2025-03-15",
      "minGrade": 4,
      "description": "Integrar la API REST creada en la actividad anterior con una base de datos MySQL.  Debe ser capaz de realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos a través de la API."
    },
    {
      "id": 5,
      "name": "Autenticación y Autorización JWT",
      "dueDate": "2025-03-30",
      "minGrade": 5,
      "description": "Implementar autenticación y autorización utilizando JSON Web Tokens (JWT) en la API REST.  Los usuarios deben poder registrarse, iniciar sesión y acceder a recursos protegidos solo después de autenticarse."
    },
    {
      "id": 6,
      "name": "Dashboard con Charts.js",
      "dueDate": "2025-04-15",
      "minGrade": 6,
      "description": "Crear un dashboard que visualice datos utilizando la librería Charts.js. El dashboard debe mostrar al menos dos tipos de gráficos diferentes y obtener los datos de la API REST."
    },
    {
      "id": 7,
      "name": "Testing con Jest y React Testing Library",
      "dueDate": "2025-04-30",
      "minGrade": 4,
      "description": "Escribir pruebas unitarias y de integración para el formulario de React y la API REST utilizando Jest y React Testing Library.  Las pruebas deben cubrir diferentes casos de uso y asegurar la calidad del código."
    },
    {
      "id": 8,
      "name": "Implementación de Redux/Context",
      "dueDate": "2025-05-15",
      "minGrade": 5,
      "description": "Implementar el manejo de estado en la aplicación React utilizando Redux o Context API.  Se debe gestionar el estado de la autenticación y los datos obtenidos de la API."
    },
    {
      "id": 9,
      "name": "Despliegue en la Nube (AWS/Vercel)",
      "dueDate": "2025-05-30",
      "minGrade": 6,
      "description": "Desplegar la aplicación completa (frontend y backend) en un servicio de nube como AWS o Vercel.  La aplicación debe ser accesible públicamente después del despliegue."
    },
    {
      "id": 10,
      "name": "Proyecto Final Full-Stack",
      "dueDate": "2025-06-15",
      "minGrade": 5,
      "description": "Desarrollar un proyecto full-stack que integre todos los conceptos aprendidos durante el curso.  El proyecto debe tener un frontend en React, un backend en Node.js, una base de datos y estar desplegado en la nube."
    },
    {
      "id": 11,
      "name": "Optimización SEO en un Sitio Web",
      "dueDate": "2025-07-01",
      "minGrade": 5,
      "description": "Optimizar un sitio web existente para mejorar su posicionamiento en motores de búsqueda (SEO).  Se deben implementar técnicas de SEO on-page y off-page."
    },
    {
      "id": 12,
      "name": "Animaciones Avanzadas con Framer Motion",
      "dueDate": "2025-07-15",
      "minGrade": 6,
      "description": "Crear animaciones avanzadas en la aplicación React utilizando la librería Framer Motion.  Las animaciones deben ser fluidas y mejorar la experiencia de usuario."
    },
    {
      "id": 13,
      "name": "Configuración de CI/CD con GitHub Actions",
      "dueDate": "2025-08-01",
      "minGrade": 5,
      "description": "Configurar un pipeline de integración continua y despliegue continuo (CI/CD) utilizando GitHub Actions.  El pipeline debe automatizar el proceso de prueba y despliegue de la aplicación."
    },
    {
      "id": 14,
      "name": "Creación de un Theme Switcher (Dark/Light)",
      "dueDate": "2025-08-15",
      "minGrade": 4,
      "description": "Implementar un selector de temas (dark/light) en la aplicación React.  El usuario debe poder cambiar entre los temas de forma dinámica."
    },
    {
      "id": 15,
      "name": "Consumir APIs Externas con Axios/Fetch",
      "dueDate": "2025-09-01",
      "minGrade": 5,
      "description": "Consumir datos de al menos dos APIs externas utilizando Axios o Fetch API.  Integrar los datos obtenidos en la aplicación React."
    },
    {
      "id": 16,
      "name": "Configuración de Tailwind CSS con PostCSS",
      "dueDate": "2025-09-15",
      "minGrade": 4,
      "description": "Configurar e integrar Tailwind CSS en el proyecto React utilizando PostCSS.  Utilizar las clases de utilidad de Tailwind para estilizar la aplicación."
    },
    {
      "id": 17,
      "name": "Creación de un Blog con Next.js",
      "dueDate": "2025-10-01",
      "minGrade": 6,
      "description": "Crear un blog sencillo utilizando Next.js. El blog debe tener páginas dinámicas para cada artículo y utilizar un sistema de enrutamiento."
    },
    {
      "id": 18,
      "name": "Uso de WebSockets para Chat en Tiempo Real",
      "dueDate": "2025-10-15",
      "minGrade": 6,
      "description": "Implementar un chat en tiempo real utilizando WebSockets.  Los usuarios deben poder enviar y recibir mensajes instantáneamente."
    },
    {
      "id": 19,
      "name": "Autogeneración de Documentación con Swagger",
      "dueDate": "2025-11-01",
      "minGrade": 5,
      "description": "Configurar Swagger para generar documentación automáticamente para la API REST.  La documentación debe incluir información sobre los endpoints, parámetros y respuestas."
    },
    {
      "id": 20,
      "name": "Implementación de un Carrito de Compras con React",
      "dueDate": "2025-11-15",
      "minGrade": 5,
      "description": "Implementar un carrito de compras funcional en la aplicación React.  El usuario debe poder agregar productos al carrito, ver el contenido del carrito y simular un proceso de compra."
    }
  ]
};


const ProfessorDashboard = () => {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity)
    setDetailsOpen(true)
  }

  const dataWithViewDetails = activitiesData.activities.map(activity => ({
    ...activity,
    onViewDetails: handleViewDetails
  }))

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Actividades</h1>
      <DataTable 
        columns={columns}
        data={dataWithViewDetails} 
      />
      <ActivityDetails
        activity={selectedActivity}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  )  
};

export default ProfessorDashboard;