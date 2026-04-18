import { useEffect, useState } from "react"
import type { User } from "./types/user"
import { getUsers } from "./services/userService";

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetUsers();
    }, []);

    async function fetUsers(){
        try{
            setLoading(true);

            const response = await getUsers();

            setUsers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if(loading) return <p>Carregando...</p>;

    return (
        <div>
            <h1>User Dashboard</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </div>
            ))}
        </div>
    )
}

export default App
