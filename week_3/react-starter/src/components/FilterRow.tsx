import type { FC } from "react";

interface FilterRowProps {
  showActiveUsers: boolean;
  onToggleStatus: (value: boolean) => void;
  searchText: string;
  onChangeText: (value: string) => void;
}

const FilterRow: FC<FilterRowProps> = ({
  showActiveUsers,
  onToggleStatus,
  searchText,
  onChangeText,
}) => {
  return (
    <div>
      <input
        type="text"
        value={searchText}
        placeholder="Search users"
        onChange={(event) => onChangeText(event.target.value)}
      ></input>
      <input
        type="checkbox"
        id="filter-box"
        checked={showActiveUsers}
        onChange={(event) => onToggleStatus(event.target.checked)}
      ></input>
      <label htmlFor="filter-box"> Show Active Users</label>
    </div>
  );
};

export default FilterRow;
