import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Info } from "lucide-react"

const ActionButton = ({ icon: Icon, label, onClick }) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={onClick}>
          <Icon className="h-4 w-4" />
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const StatusBadge = ({ dueDate }) => {
  const isOpen = new Date(dueDate) > new Date()
  return (
    <Badge variant={isOpen ? "default" : "secondary"}>
      {isOpen ? "Abierta" : "Cerrada"}
    </Badge>
  )
}

export const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    size: "w-[40%]",
  },
  {
    accessorKey: "dueDate",
    header: "Fecha de entrega",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"))
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    size: "w-[20%]",
  },
  {
    accessorKey: "minGrade",
    header: "Nota mínima",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("minGrade")}</div>
    ),
    size: "w-[10%]",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => <StatusBadge dueDate={row.getValue("dueDate")} />,
    size: "w-[15%]",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const activity = row.original
      return (
        <div className="flex justify-end gap-2">
          <ActionButton icon={Edit} label="Editar" />
          <ActionButton icon={Trash2} label="Eliminar" />
          <ActionButton 
            icon={Info} 
            label="Detalles"
            onClick={() => {
              if (activity.onViewDetails) {
                activity.onViewDetails(activity)
              }
            }}
          />
        </div>
      )
    },
    size: "w-[15%]",
  },
]