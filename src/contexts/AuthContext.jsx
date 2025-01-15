import { createContext, useCallback, useEffect, useReducer } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import authService from "@/services/authService";

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SET_USER: "SET_USER",
    SET_LOADING: "SET_LOADING",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
                token: null,
                user: null,
                isLoading: false,
            };
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
}

const AuthContext = createContext({
    state: {},
    actions: {},
});

function AuthProvider() {
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: true,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const validateAndSetUser = useCallback(async (token) => {
        if (!token) return false;
    
        try {
            const userData = await authService.validateToken(token);
            if (!userData) return false;
    
            dispatch({ type: ACTIONS.LOGIN, payload: token });
            dispatch({ type: ACTIONS.SET_USER, payload: userData });
            return true;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    }, []);

    const initializeAuth = useCallback(async () => {
        const token = Cookies.get("token");
        if (token) {
            const isValid = await validateAndSetUser(token);
            if (!isValid) {
                Cookies.remove("token");
            }
        }
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }, [validateAndSetUser]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const login = useCallback(async ({ token, user }) => {
        if (!token || !user) {
            throw new Error("Token o datos de usuario inválidos");
        }

        dispatch({ type: ACTIONS.LOGIN, payload: token });
        dispatch({ type: ACTIONS.SET_USER, payload: user });

        Cookies.set("token", token, {
            secure: true,
            sameSite: "strict",
            expires: 7,
        });

        const redirectPath = user.role === 'professor' ? '/activities' : '/projects';
        const origin = location.state?.from?.pathname || redirectPath;
        navigate(origin);
    }, [location.state, navigate]);

    const logout = useCallback(() => {
        Cookies.remove("token");
        dispatch({ type: ACTIONS.LOGOUT });
        navigate("/login");
    }, [navigate]);

    const value = {
        state,
        actions: {
            login,
            logout,
        },
    };

    if (state.isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={value}>
            <Outlet />
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };