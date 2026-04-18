import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { getUsers } from "../services/userService";
import UserList from "../components/UserList";
import { useDebounce } from "../hooks/useDebounce";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<{
        total: number;
        page: number;
        lastPage: number;
    }| null>(null);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        fetchUsers();
    }, [debouncedSearch, page]);

    async function fetchUsers() {
        try {
            setLoading(true);

            const response = await getUsers({
                page,
                search: debouncedSearch
            });

            setUsers(response.data);
            setMeta(response.meta);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleNext(){
        if(meta && page < meta?.lastPage){
            setPage((prev) => prev + 1);
        }
    }

    function handlePrev(){
        if(page > 1){
            setPage((prev) => prev - 1);
        }
    }

    return(
        <div>
            <h1>Usuários</h1>

            <input 
                type="text"
                placeholder="Buscar usuário..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1)
                }} 
            />

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <UserList users={users} />

                    <div>
                        <button onClick={handlePrev} disabled={page === 1}>
                            Anterior
                        </button>

                        <span>
                            Página {page} de {meta?.lastPage || 1}
                        </span>

                        <button onClick={handleNext} disabled={!meta || page === meta?.lastPage}>
                            Próxinma
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Users;