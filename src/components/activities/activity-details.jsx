import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, Clock, FileText } from "lucide-react"

export function ActivityDetails({ activity, open, onOpenChange }) {
  if (!activity) return null

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isOpen = new Date(activity.due_date) > new Date()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {activity.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium mb-1">Fecha de entrega</p>
              <p className="text-sm text-gray-500">{formatDate(activity.due_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GraduationCap className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium mb-1">Nota mínima requerida</p>
              <p className="text-sm text-gray-500">{activity.min_grade}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm font-medium mb-1">Estado</p>
              <Badge variant={isOpen ? "default" : "secondary"}>
                {isOpen ? "Abierta" : "Cerrada"}
              </Badge>
            </div>
          </div>
          {activity.description && (
            <div className="flex items-start gap-4">
              <FileText className="h-5 w-5 text-purple-500 mt-1" />
              <div>
                <p className="text-sm font-medium mb-1">Descripción</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}