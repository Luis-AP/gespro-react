const ProjectForm = ({
    project = {},
    open,
    onOpenChange,
    onSubmit,
    isLoading,
}) => {
    if (!open) return null;

    return <div>Formulario para crear un nuevo proyecto</div>;
};

export default ProjectForm;
