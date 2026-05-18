import type { FC } from "react";
import type { User } from "../UserListing";

interface UserRowProps {
  user: User;
}

const UserRow: FC<UserRowProps> = ({ user }) => {
  return (
    <tr >
      <td>
        <img src={user.url} alt="photo" />
        {user.name}
      </td>
      <td>
        {user.position}
      </td>
      <td>
        {user.department}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {user.phone}
      </td>
      <td>
        <div className={`status-box ${user.status}`}>
            {user.status}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
