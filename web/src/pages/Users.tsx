import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { createUser, getUsers } from "../services/userService";
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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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

    async function handleCreateUser(e: React.FormEvent) {
        e.preventDefault();

        try{
            await createUser({ name, email });

            setName('');
            setEmail('');

            fetchUsers();
        } catch(error) {
            console.error(error);
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

            <form onSubmit={handleCreateUser}>
                <input 
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e?.target?.value)} 
                />

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)} 
                />

                <button type="submit">Criar</button>
            </form>

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