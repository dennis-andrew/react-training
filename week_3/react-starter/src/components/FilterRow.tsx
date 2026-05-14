export default function FilterRow({showActiveUsers, onToggleStatus, searchText, onChangeText} : {showActiveUsers: boolean,onToggleStatus: (value:boolean)=>void, searchText:string,onChangeText:(value:string)=>void}){
    return (
        <div>
            <input type="text" value={searchText} placeholder="Search users" onChange={(event)=>onChangeText(event.target.value)}></input>
            <input type="checkbox" id="filter-box" checked={showActiveUsers} onChange={(event)=>onToggleStatus(event.target.checked)}></input>
            <label htmlFor="filter-box"> Show Active Users</label>
        </div>
    );
}
