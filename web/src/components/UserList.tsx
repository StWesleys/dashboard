import type { User } from "../types/user";

interface Props {
    users: User[];
}

function UserList({ users }: Props){
    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </div>
            ))}
        </div>
    )
}

export default UserList;