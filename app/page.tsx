'use client';
import { useState, useEffect } from 'react';
import { Pog, User } from '@/lib/types';

const Home = () => {
  const [pogs, setPogs] = useState<Pog[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const pogResponse = await fetch('/api/pogs');
      const pogData = await pogResponse.json();
      setPogs(pogData);

      const userResponse = await fetch('/api/users');
      const userData = await userResponse.json();
      setUsers(userData);
    };
    fetchData();
  }, []);

  const handleCreatePog = async (pog: Pog) => {
    const response = await fetch('/api/pogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pog),
    });
    const data = await response.json();
    setPogs([...pogs, data]);
  };

  const handleUpdatePog = async (pog: Pog) => {
    const response = await fetch(`/api/pogs?id=${pog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pog),
    });
    const data = await response.json();
    setPogs(pogs.map((p) => (p.id === data.id ? data : p)));
  };

  const handleDeletePog = async (id: number | undefined) => {
    if (typeof id === 'number') {
      await fetch(`/api/pogs?id=${id}`, {
        method: 'DELETE',
      });
      setPogs(pogs.filter((p) => p.id !== id));
    } else {
      console.error('Invalid pog ID');
    }
  };

  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <h1>PogsChamp</h1>
      <h2>Pogs</h2>
      <ul>
        {pogs.map((pog) => (
          <li key={pog.id}>
            {pog.name} - {pog.ticker_symbol} - {pog.price} - {pog.color}
            <button onClick={() => handleUpdatePog(pog)}>Update</button>
            <button onClick={() => handleDeletePog(pog.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.isAdmin ? 'Admin' : 'User'} -{' '}
            {user.balance}
          </li>
        ))}
      </ul>
      <h2>Create Pog</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const pog: Pog = {
            name: formData.get('name') as string,
            ticker_symbol: formData.get('ticker_symbol') as string,
            price: parseFloat(formData.get('price') as string),
            color: formData.get('color') as string,
          };
          handleCreatePog(pog);
          (e.target as HTMLFormElement).reset();
        }}
      >
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Ticker Symbol:
          <input type="text" name="ticker_symbol" />
        </label>
        <label>
          Price:
          <input type="number" name="price" />
        </label>
        <label>
          Color:
          <input type="text" name="color" />
        </label>
        <button type="submit">Create Pog</button>
      </form>
    </div>
  );
};

export default Home;
