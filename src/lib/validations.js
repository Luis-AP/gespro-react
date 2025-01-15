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
    dueDate: {
        required: "La fecha de vencimiento es requerida",
    },
    minGrade: {
        required: "La nota de aprobación es requerida",
        min: {
            value: 6,
            message: "La nota de aprobación debe ser mayor o igual a 6",
        },
        max: {
            value: 10,
            message: "La nota máxima es 10",
        },
    },
};
