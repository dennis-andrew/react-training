import { useState } from "react";
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

const USER_LIST: User[] = [
  {
    id: 1,
    name: "Dennis Mathew",
    url: "https://i.pravatar.cc/96?img=12",
    position: "Junior Developer",
    department: "Engineering",
    email: "dennis.mathew@example.com",
    phone: "+91 98765 43210",
    status: UserStatus.active,
  },
  {
    id: 2,
    name: "Aisha Menon",
    url: "https://i.pravatar.cc/96?img=47",
    position: "Product Manager",
    department: "Product",
    email: "aisha.menon@example.com",
    phone: "+91 90084 22611",
    status: UserStatus.active,
  },
  {
    id: 3,
    name: "Rahul Nair",
    url: "https://i.pravatar.cc/96?img=15",
    position: "UX Designer",
    department: "Design",
    email: "rahul.nair@example.com",
    phone: "+91 81234 56789",
    status: UserStatus.inactive,
  },
  {
    id: 4,
    name: "Meera Iyer",
    url: "https://i.pravatar.cc/96?img=32",
    position: "QA Engineer",
    department: "Quality",
    email: "meera.iyer@example.com",
    phone: "+91 99887 76655",
    status: UserStatus.active,
  },
  {
    id: 5,
    name: "Arjun Kapoor",
    url: "https://i.pravatar.cc/96?img=53",
    position: "DevOps Engineer",
    department: "Infrastructure",
    email: "arjun.kapoor@example.com",
    phone: "+91 77665 54433",
    status: UserStatus.inactive,
  },
  {
    id: 6,
    name: "Sara Thomas",
    url: "https://i.pravatar.cc/96?img=25",
    position: "Data Analyst",
    department: "Analytics",
    email: "sara.thomas@example.com",
    phone: "+91 88990 11223",
    status: UserStatus.active,
  },
];

export default function UserListing() {
  const [filterText, setFilterText] = useState("");
  const [showActiveUsers, setShowActiveUsers] = useState(false);

  function handleFilter(user: User) {
    if(showActiveUsers && user.status===UserStatus.inactive){
        return;
    }
    if (user.name.toLowerCase().includes(filterText.toLowerCase())) {
        return user;
    }
    
  }

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
          {USER_LIST.filter(handleFilter).map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
