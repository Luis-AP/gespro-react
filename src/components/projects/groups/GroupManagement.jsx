import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MemberListItem from './MemberListItem';
import DeleteMemberDialog from './DeleteMemberDialog';
import AddMemberDialog from './AddMemberDialog';

const GroupManagement = () => {
  // Estados para la lista de miembros
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Diego Omar Yapura',
      email: 'diego@ejemplo.com',
      role: 'Integrante',
      avatarUrl: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria@ejemplo.com',
      role: 'Propietario',
      avatarUrl: '/api/placeholder/40/40'
    }
  ]);

  // Estados para diálogos y selección
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Datos de ejemplo de personas disponibles
  const availablePeople = [
    { id: 3, name: 'Juan Pérez', email: 'juan@ejemplo.com', avatarUrl: '/api/placeholder/40/40' },
    { id: 4, name: 'Ana Silva', email: 'ana@ejemplo.com', avatarUrl: '/api/placeholder/40/40' },
    { id: 5, name: 'Carlos López', email: 'carlos@ejemplo.com', avatarUrl: '/api/placeholder/40/40' },
  ];

  // Manejadores de eventos
  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      setMembers(members.filter(member => member.id !== memberToDelete.id));
    }
    setIsDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  const handleAddMember = (person) => {
    if (person) {
      setMembers([...members, { ...person, role: 'Integrante' }]);
      setIsAddDialogOpen(false);
      setSelectedPerson(null);
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Gestionar grupo</h2>
          <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
            Añadir integrante
          </Button>
        </div>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {members.map((member) => (
              <MemberListItem
                key={member.id}
                member={member}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteMemberDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        memberName={memberToDelete?.name}
      />

      <AddMemberDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setSelectedPerson(null);
        }}
        onAdd={handleAddMember}
        availablePeople={availablePeople}
        selectedPerson={selectedPerson}
        onSelectPerson={setSelectedPerson}
      />
    </>
  );
};

export default GroupManagement;