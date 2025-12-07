import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { User } from '../types/userTypes';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setFilteredUsers(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los usuarios. Por favor, intenta nuevamente.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      setCurrentPage(1);
      return;
    }

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Calcular usuarios para la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={fetchUsers} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>Lista de Usuarios</h1>
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
          <div className="results-count">
            {filteredUsers.length} de {users.length} usuarios encontrados
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron usuarios que coincidan con la búsqueda.</p>
          <button onClick={() => handleSearch('')} className="clear-search-button">
            Mostrar todos los usuarios
          </button>
        </div>
      ) : (
        <>
          <div className="user-grid">
            {currentUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserList;