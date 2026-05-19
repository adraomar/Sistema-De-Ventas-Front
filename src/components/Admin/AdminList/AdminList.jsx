import React, { useEffect, useState } from "react";
import api from "../../../api/api.js";
import DataTable from "../../DataTable/DataTable";

const AdminList = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {
            const response = await api.get("/users/");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    /* EDIT */
    const handleEdit = (user) => {
        console.log("Editar:", user);
    };

    /* DELETE */

    const handleDelete = async (user) => {
        const confirmDelete =
            window.confirm(
                `¿Eliminar usuario ${user.username}?`
            );
        if (!confirmDelete) return;

        try {
            await api.delete(`/users/${user.id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    /* CREATE */

    const handleCreate = () => {
        console.log("Nuevo usuario");
    };

    /* DATA */

    const formattedUsers = users.map((user) => ({

        id: user.id,
        name: `${user.lastname}, ${user.firstname}`,
        username: user.username,
        email: user.email,
        role: user.rol
    }));

    return (
        <DataTable

            title="Administrar Usuarios"

            columns={[
                "ID",
                "Apellido y Nombre",
                "Usuario",
                "Correo",
                "Rol"
            ]}

            data={formattedUsers}
            search={search}
            setSearch={setSearch}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default AdminList;