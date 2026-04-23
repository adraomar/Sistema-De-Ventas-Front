import { useState, useEffect, useContext } from 'react'
import api from "../api/api.js";
import { userContext } from "../context/userContext.js";

const UserContext = ({ children }) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await api.get("/users/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        getUser();
    }, []);

    return (
        <userContext.Provider value={{ user }}>
            { children }
        </userContext.Provider>
    )
}

export default UserContext