import React from 'react';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const user = state?.user;

  const getHomeRoute = () => {
    if (!user) return '/';
    return user.role === 'professor' ? '/activities/professor' : '/activities/student';
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FileQuestion className="w-24 h-24 text-gray-400" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600">
              404
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Página no encontrada</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </Button>

          <Button 
            asChild
            className="gap-2"
          >
            <Link to={getHomeRoute()}>
              <Home className="w-4 h-4" />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;