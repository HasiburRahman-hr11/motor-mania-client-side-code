import { createContext } from "react";
import useUsers from "../../hooks/useUsers";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const allContext = useUsers();
    return (
        <UserContext.Provider value={allContext}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;