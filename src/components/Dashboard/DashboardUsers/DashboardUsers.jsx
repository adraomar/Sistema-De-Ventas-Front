import React, { useState, useEffect } from 'react'


const DashboardUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>DashboardUsers</div>
    )
}

export default DashboardUsers