import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function useAuth(type) {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    if (type) {
        if (type !== "state" && type !== "actions") {
            throw new Error("useAuth type must be either 'state' or 'actions'");
        }
        return context[type];
    }

    return context;
}

export { useAuth };