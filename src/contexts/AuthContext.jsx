import { createContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
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
            };
        default:
            return state;
    }
}

const AuthContext = createContext({
    state: {},
    actions: {},
});

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        token: null,
    });

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            dispatch({ type: ACTIONS.LOGIN, payload: token });
        }
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token) => {
            Cookies.set("token", token, {
                secure: true,
                sameSite: "strict",
            });
            dispatch({ type: ACTIONS.LOGIN, payload: token });
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            Cookies.remove("token");
            dispatch({ type: ACTIONS.LOGOUT });
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
