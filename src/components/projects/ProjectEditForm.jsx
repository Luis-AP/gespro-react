const ProjectEditForm = ({
    project = {},
    open,
    onOpenChange,
    onSubmit,
    isLoading,
}) => {
    if (!open) return null;

    return <div>Formulario para editar un proyecto</div>;
};

export default ProjectEditForm;
