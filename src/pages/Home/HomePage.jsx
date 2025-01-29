import React from 'react';
import { GraduationCap, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const { state } = useAuth();
  const isAuthenticated = state?.isAuthenticated;
  const user = state?.user;

  const getRedirectPath = () => {
    if (!user) return '/login';
    return user.role === 'professor' ? '/activities/professor' : '/activities/student';
  };

  const features = [
    {
      icon: BookOpen,
      title: "Gestión de Actividades",
      description: "Crea y administra actividades académicas de manera eficiente"
    },
    {
      icon: Users,
      title: "Trabajo Colaborativo",
      description: "Facilita el trabajo en equipo entre estudiantes"
    },
    {
      icon: CheckCircle,
      title: "Seguimiento de Progreso",
      description: "Monitorea el avance de los proyectos en tiempo real"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-neutral-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-12 w-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">GesPro</h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 max-w-2xl mb-6">
            Plataforma de gestión de proyectos académicos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-12">
            Simplifica la gestión de actividades y proyectos académicos, facilitando la colaboración entre profesores y estudiantes.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-200"
            asChild
          >
            <Link to={getRedirectPath()}>
              {isAuthenticated ? 'Ir al Dashboard' : 'Comenzar'}
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-neutral-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <feature.icon className="h-8 w-8 text-white" />
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;