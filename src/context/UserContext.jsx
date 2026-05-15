import { useState, useEffect } from 'react'
import api from "../api/api.js"
import { userContext } from "../context/userContext.js"

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token")

                // SI NO HAY TOKEN
                // NO HAGAS REQUEST
                if (!token) {
                    setLoading(false)
                    return
                }

                const res = await api.get("/users/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(res.data)

            } catch (error) {
                console.log("Error:", error)
                // TOKEN INVALIDO
                localStorage.removeItem("token")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getUser()

    }, [])

    return (
        <userContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserContext