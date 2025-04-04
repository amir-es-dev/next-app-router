import { sort } from "fast-sort";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: String;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users: User[] = await res.json();
  if (sortOrder === "name" || sortOrder === "email") {
    users = sort(users).asc((u) => (sortOrder === "name" ? u.name : u.email));
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td> {user.name}</td>
            <td> {user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
