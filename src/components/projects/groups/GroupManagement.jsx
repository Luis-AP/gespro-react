import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MemberListItem from "./MemberListItem";
import DeleteMemberDialog from "./DeleteMemberDialog";
import AddMemberDialog from "./AddMemberDialog";
import projectsService from "../../../services/projectsService";
import UserService from "../../../services/userService";
import MemberSkeleton from "./MemberSkeleton";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const GroupManagement = ({
    project,
    updateProject,
    open,
    onOpenChange,
    memberLimit,
}) => {
    const { toast } = useToast();
    const [members, setMembers] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [loading, setLoading] = useState(false); // Cambiar a true y ajustar el estado loading
    const [memberLimitReached, setMemberLimitReached] = useState(false);

    useEffect(() => {
        if (open) {
            loadProjectData();
        }
    }, [open]);

    useEffect(() => {
        setMemberLimitReached(members.length >= memberLimit);
    }, [members, memberLimit]);

    const loadStudentsInfo = async (memberIds) => {
        try {
            const studentsInfo = await Promise.all(
                memberIds.map(async (memberId) => {
                    const studentInfo = await UserService.getStudent(memberId);
                    return {
                        ...studentInfo,
                        id: memberId,
                        role: "Integrante",
                    };
                })
            );
            return studentsInfo;
        } catch (error) {
            console.error("Error loading students info:", error);
            throw error;
        }
    };

    const loadProjectData = async () => {
        try {
            setLoading(true);

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
                await projectsService.removeMember(
                    project.id,
                    memberToDelete.id
                );
                setMembers(
                    members.filter((member) => member.id !== memberToDelete.id)
                );
                updateProject(project);
                toast({
                    title: "Éxito",
                    description: "Miembro eliminado correctamente",
                });
            } catch (error) {
                const errorMessage =
                    error.data?.message || "No se pudo eliminar al miembro";
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
            if (members.length >= memberLimit) {
                toast({
                    title: "Error",
                    description:
                        "No se pueden añadir más de {memberLimit} integrantes",
                    variant: "destructive",
                });
                return;
            }

            try {
                await projectsService.addMember(project.id, person.id);
                setMembers([...members, { ...person, role: "Integrante" }]);
                updateProject(project);

                // Verificar si se llegó al límite de integrantes
                if (members.length + 1 >= memberLimit) {
                    setMemberLimitReached(true);
                }

                toast({
                    title: "Éxito",
                    description: "Miembro añadido correctamente",
                });
            } catch (error) {
                const errorMessage =
                    error.data?.message || "No se pudo añadir al miembro";
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
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex items-center justify-between p-6 border-b">
                            <DialogTitle className="text-xl font-bold">
                                Gestionar grupo
                            </DialogTitle>
                            <Button
                                variant="default"
                                onClick={() => setIsAddDialogOpen(true)}
                                disabled={loading || memberLimitReached}
                            >
                                Añadir integrante
                            </Button>
                        </div>
                    </DialogHeader>
                    <div className="space-y-4">
                        {loading ? (
                            <>
                                <MemberSkeleton />
                                <MemberSkeleton />
                                <MemberSkeleton />
                            </>
                        ) : members.length > 0 ? (
                            members.map((member) => (
                                <MemberListItem
                                    key={member.id}
                                    member={member}
                                    onDelete={handleDeleteClick}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">
                                No hay integrantes en este grupo
                            </p>
                        )}
                    </div>

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
                        searchStudents={(term) =>
                            projectsService.searchStudents(term)
                        }
                        selectedPerson={selectedPerson}
                        onSelectPerson={setSelectedPerson}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GroupManagement;
