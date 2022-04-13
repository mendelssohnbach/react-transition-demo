import React, { useEffect, useState, useTransition } from 'react';

const userList = [...new Array(20000)].map((_, i) => ({
  id: i,
  name: `User ${i}`,
}));

export default function Demo() {
  const [isPending, startTransition] = useTransition();
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userList);

  useEffect(() => {
    // Tell react setFilteredUsers is of low priority
    startTransition(() =>
      setFilteredUsers(
        userList.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    );
  }, [searchText]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <h2>Demo - React 18 useTransition</h2>
      <label htmlFor="searchBox">
        <input
          id="searchBox"
          className="inputBox"
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          placeholder="Search user by name..."
        />
      </label>
      {isPending && <div>Loading...</div>}
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="user"
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}
