import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export function RoleRoute({ children, roles }) {
    const { isAuthenticated, user } = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si no hay roles especificados o el rol del usuario está incluido, permitir acceso
    if (!roles || roles.includes(user?.role)) {
        return children;
    }

    // Si el usuario no tiene el rol requerido, redirigir según su rol
    const redirectPath = user?.role === 'professor' ? '/activities' : '/projects';
    return <Navigate to={redirectPath} replace />;
}

// Componentes específicos para cada rol
export function ProfessorRoute({ children }) {
    return <RoleRoute roles={['professor']}>{children}</RoleRoute>;
}

export function StudentRoute({ children }) {
    return <RoleRoute roles={['student']}>{children}</RoleRoute>;
}