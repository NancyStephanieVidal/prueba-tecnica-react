import React from 'react';
import { User } from '../types/userTypes';
import { useHistory } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const history = useHistory(); // useHistory en lugar de useNavigate

  const handleClick = () => {
    history.push(`/user/${user.id}`);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="user-card-header">
        <h3 className="user-name">{user.name}</h3>
        <span className="username">@{user.username}</span>
      </div>
      <div className="user-card-body">
        <p className="user-email">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="user-phone">
          <strong>Teléfono:</strong> {user.phone}
        </p>
        <p className="user-company">
          <strong>Empresa:</strong> {user.company.name}
        </p>
        <p className="user-address">
          <strong>Ciudad:</strong> {user.address.city}
        </p>
      </div>
      <div className="user-card-footer">
        <button className="view-details-btn">Ver detalles</button>
      </div>
    </div>
  );
};

export default UserCard;