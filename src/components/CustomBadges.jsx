import badgeVariants from "../helpers/BadgeHelpers";

const CustomBadge = ({ variant, type, text, rounded = false }) => {
    const variantClass = badgeVariants[variant];
    const roundedClass = rounded ? "rounded-full" : "rounded-md";

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 ${roundedClass} text-sm font-medium ${variantClass[type]}`}
        >
            {text}
        </span>
    );
};

const StatusBadge = ({ status, rounded = false }) => {
    return (
        <CustomBadge
            variant="status"
            type={status}
            text={
                status === "OPEN"
                    ? "Abierto"
                    : status === "READY"
                    ? "Listo"
                    : "Calificado"
            }
            rounded={rounded}
        />
    );
};

const TypeBadge = ({ isGroup, rounded = false }) => {
    return (
        <CustomBadge
            variant="type"
            type={isGroup ? "grupal" : "individual"}
            text={isGroup ? "Grupal" : "Individual"}
            rounded={rounded}
        />
    );
};

export { StatusBadge, TypeBadge };
