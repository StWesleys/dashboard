import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { getUsers } from "../services/userService";
import UserList from "../components/UserList";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if(loading) return <p>Carregando...</p>

    return(
        <div>
            <h1>Usuários</h1>
            <UserList users={users} />
        </div>
    )
}

export default Users;