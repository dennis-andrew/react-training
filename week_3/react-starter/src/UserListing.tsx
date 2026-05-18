import { type FC, useEffect, useState } from "react";
import FilterRow from "./components/FilterRow";
import UserRow from "./components/UserRow";

const UserStatus = {
  active: "active",
  inactive: "inactive",
} as const;

type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export interface User {
  id: number;
  name: string;
  url: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: UserStatus;
}

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    bs: string;
    name: string;
  };
}

const UserListing: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterText, setFilterText] = useState("");
  const [showActiveUsers, setShowActiveUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleFilter = (user: User) => {
    if (showActiveUsers && user.status === UserStatus.inactive) {
      return false;
    }

    const searchValue = filterText.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.department.toLowerCase().includes(searchValue)
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Unable to fetch users");
        }

        const data: ApiUser[] = await response.json();
        const userList = data.map((user) => ({
          id: user.id,
          name: user.name,
          url: `https://i.pravatar.cc/96?img=${user.id + 10}`,
          position: user.company.bs,
          department: user.company.name,
          email: user.email,
          phone: user.phone,
          status: user.id % 3 === 0 ? UserStatus.inactive : UserStatus.active,
        }));

        setUsers(userList);
      } catch {
        setError("Something went wrong while loading users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(handleFilter);

  return (
    <section className="user-listing">
      <FilterRow
        showActiveUsers={showActiveUsers}
        searchText={filterText}
        onToggleStatus={(value: boolean) => setShowActiveUsers(value)}
        onChangeText={(value: string) => setFilterText(value)}
      ></FilterRow>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className="table-message" colSpan={6}>
                Loading users...
              </td>
            </tr>
          )}
          {!isLoading && error && (
            <tr>
              <td className="table-message error-message" colSpan={6}>
                {error}
              </td>
            </tr>
          )}
          {!isLoading && !error && filteredUsers.length === 0 && (
            <tr>
              <td className="table-message" colSpan={6}>
                No users found.
              </td>
            </tr>
          )}
          {!isLoading &&
            !error &&
            filteredUsers.map((user) => <UserRow key={user.id} user={user} />)}
        </tbody>
      </table>
    </section>
  );
};

export default UserListing;
