import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import MemberListItem from './MemberListItem';
import DeleteMemberDialog from './DeleteMemberDialog';
import AddMemberDialog from './AddMemberDialog';
import ProjectsService from '../../../services/projectsService';
import UserService from '../../../services/userService';
import MemberSkeleton from './MemberSkeleton';


const GroupManagement = () => {
  const PROJECT_ID = 1;

  const { toast } = useToast();
  const [members, setMembers] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectData();
  }, []);

  const loadStudentsInfo = async (memberIds) => {
    try {
      const studentsInfo = await Promise.all(
        memberIds.map(async (memberId) => {
          const studentInfo = await UserService.getStudent(memberId);
          return {
            ...studentInfo,
            id: memberId,
            role: 'Integrante',
          };
        })
      );
      return studentsInfo;
    } catch (error) {
      console.error('Error loading students info:', error);
      throw error;
    }
  };

  const loadProjectData = async () => {
    try {
      setLoading(true);
      const project = await ProjectsService.getProjectById(PROJECT_ID);
      
      if (project && project.member_ids) {
        const membersInfo = await loadStudentsInfo(project.member_ids);
        setMembers(membersInfo);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los miembros del grupo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (memberToDelete) {
      try {
        await ProjectsService.removeMember(PROJECT_ID, memberToDelete.id);
        setMembers(members.filter(member => member.id !== memberToDelete.id));
        toast({
          title: "Éxito",
          description: "Miembro eliminado correctamente",
        });
      } catch (error) {
        const errorMessage = error.data?.mensaje || "No se pudo eliminar al miembro";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleAddMember = async (person) => {
    if (person) {
      try {
        await ProjectsService.addMember(PROJECT_ID, person.id);
        setMembers([...members, { ...person, role: 'Integrante' }]);
        toast({
          title: "Éxito",
          description: "Miembro añadido correctamente",
        });
      } catch (error) {
        const errorMessage = error.data?.mensaje || "No se pudo añadir al miembro";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      setIsAddDialogOpen(false);
      setSelectedPerson(null);
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Gestionar grupo</h2>
          <Button 
            variant="default" 
            onClick={() => setIsAddDialogOpen(true)}
            disabled={loading}
          >
            Añadir integrante
          </Button>
        </div>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {loading ? (
              <>
                <MemberSkeleton />
                <MemberSkeleton />
                <MemberSkeleton />
              </>
            ) : (
              members.map((member) => (
                <MemberListItem
                  key={member.id}
                  member={member}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <DeleteMemberDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        memberName={`${memberToDelete?.first_name} ${memberToDelete?.last_name}`}
      />

      <AddMemberDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setSelectedPerson(null);
        }}
        onAdd={handleAddMember}
        searchStudents={(term) => ProjectsService.searchStudents(term)}
        selectedPerson={selectedPerson}
        onSelectPerson={setSelectedPerson}
      />
      <Toaster />
    </>
  );
};

export default GroupManagement;