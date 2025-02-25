export const patterns = {
    email: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "El email no es válido",
    },
    password: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
        message:
            "La contraseña debe tener al menos 8 caracteres, una letra y un número",
    },
    enrollmentNumber: {
        value: /^\d{6}$/,
        message: "El número de matrícula debe tener 6 dígitos",
    },
};

export const loginSchema = {
    email: {
        required: "El email es requerido",
        pattern: patterns.email,
    },
    password: {
        required: "La contraseña es requerida",
        minLength: {
            value: 4,
            message: "La contraseña debe tener al menos 8 caracteres",
        },
    },
};

export const registerSchema = {
    name: {
        required: "El nombre es requerido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
        },
    },
    lastName: {
        required: "El apellido es requerido",
        minLength: {
            value: 3,
            message: "El apellido debe tener al menos 3 caracteres",
        },
    },
    email: {
        required: "El email es requerido",
        pattern: patterns.email,
    },
    password: {
        required: "La contraseña es requerida",
        pattern: patterns.password,
    },
    career: {
        required: "La carrera es requerida",
    },
    enrollmentNumber: {
        required: "El número de matrícula es requerido",
        pattern: patterns.enrollmentNumber,
    },
    enrollmentDate: {
        required: "La fecha de matriculación es requerida",
    },
};

export const activitySchema = {
    name: {
        required: "El nombre es requerido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
        },
    },
    description: {
        required: "La descripción es requerida",
        minLength: {
            value: 17,
            message: "La descripción debe tener al menos 10 caracteres",
        },
    },
    due_date: {
        required: "La fecha de vencimiento es requerida",
    },
    min_grade: {
        required: "La nota de aprobación es requerida",
        min: {
            value: 1,
            message: "La nota de aprobación debe ser mayor o igual a 1",
        },
        max: {
            value: 10,
            message: "La nota máxima es 10",
        },
    },
};

export const projectSchema = {
    title: {
        required: "El título es requerido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
        },
    },
    repository_url: {
        required: "El enlace de repositorio es requerido",
        //Patrón para aceptar enlaces de GitHub y GitLab
        pattern: {
            value: /^(https:\/\/github.com\/|https:\/\/gitlab.com\/)([a-zA-Z0-9-]+\/[a-zA-Z0-9-]+)$/,
            message: "El enlace debe ser de GitHub o GitLab",
        },
    },
    activity: {
        required: "La actividad es requerida",
    },
};
