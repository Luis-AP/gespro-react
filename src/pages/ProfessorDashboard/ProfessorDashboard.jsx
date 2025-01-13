import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Info } from "lucide-react";

const activitiesData = {
  "activities": [
    {
      "id": 1,
      "name": "Landing Page Responsive",
      "dueDate": "2025-01-04",
      "minGrade": 4
    },
    {
      "id": 2,
      "name": "Formulario con Validación en React",
      "dueDate": "2025-01-10",
      "minGrade": 5
    },
    {
      "id": 3,
      "name": "API REST con Node",
      "dueDate": "2025-02-01",
      "minGrade": 6
    },
    {
      "id": 4,
      "name": "Integración con Base de Datos MySQL",
      "dueDate": "2025-03-15",
      "minGrade": 4
    },
    {
      "id": 5,
      "name": "Autenticación y Autorización JWT",
      "dueDate": "2025-03-30",
      "minGrade": 5
    },
    {
      "id": 6,
      "name": "Dashboard con Charts.js",
      "dueDate": "2025-04-15",
      "minGrade": 6
    },
    {
      "id": 7,
      "name": "Testing con Jest y React Testing Library",
      "dueDate": "2025-04-30",
      "minGrade": 4
    },
    {
      "id": 8,
      "name": "Implementación de Redux/Context",
      "dueDate": "2025-05-15",
      "minGrade": 5
    },
    {
      "id": 9,
      "name": "Despliegue en la Nube (AWS/Vercel)",
      "dueDate": "2025-05-30",
      "minGrade": 6
    },
    {
      "id": 10,
      "name": "Proyecto Final Full-Stack",
      "dueDate": "2025-06-15",
      "minGrade": 5
    }
  ]
};

const ActionButton = ({ icon: Icon, label }) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Icon className="h-4 w-4" />
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const StatusBadge = ({ dueDate }) => {
  const isOpen = new Date(dueDate) > new Date();
  return (
    <Badge variant={isOpen ? "default" : "secondary"}>
      {isOpen ? "Abierta" : "Cerrada"}
    </Badge>
  );
};

const ProfessorDashboard = () => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Actividades</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Nombre</TableHead>
              <TableHead className="w-[20%]">Fecha de entrega</TableHead>
              <TableHead className="w-[10%] text-center">Nota mínima</TableHead>
              <TableHead className="w-[15%]">Estado</TableHead>
              <TableHead className="w-[15%] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activitiesData.activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.name}</TableCell>
                <TableCell>{formatDate(activity.dueDate)}</TableCell>
                <TableCell className="text-center">{activity.minGrade}</TableCell>
                <TableCell>
                  <StatusBadge dueDate={activity.dueDate} />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <ActionButton icon={Edit} label="Editar" />
                    <ActionButton icon={Trash2} label="Eliminar" />
                    <ActionButton icon={Info} label="Detalles" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProfessorDashboard;