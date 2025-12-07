import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // useHistory en lugar de useNavigate
import { userService } from '../services/userService';
import { User } from '../types/userTypes';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory(); // useHistory en lugar de useNavigate
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await userService.getUserById(parseInt(id));
      setUser(data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los detalles del usuario.');
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.goBack(); // goBack en lugar de navigate(-1)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando detalles del usuario...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{error || 'Usuario no encontrado'}</p>
        <button onClick={handleBack} className="back-button">
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <button onClick={handleBack} className="back-button">
        ← Volver a la lista
      </button>

      <div className="user-detail-card">
        <div className="user-detail-header">
          <h1 className="user-detail-name">{user.name}</h1>
          <p className="user-username">@{user.username}</p>
        </div>

        <div className="user-detail-content">
          <div className="user-info-section">
            <h2>Información de Contacto</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <strong>Teléfono:</strong>
                <span>{user.phone}</span>
              </div>
              <div className="info-item">
                <strong>Sitio Web:</strong>
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          <div className="user-info-section">
            <h2>Dirección</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Calle:</strong>
                <span>{user.address.street}</span>
              </div>
              <div className="info-item">
                <strong>Suite:</strong>
                <span>{user.address.suite}</span>
              </div>
              <div className="info-item">
                <strong>Ciudad:</strong>
                <span>{user.address.city}</span>
              </div>
              <div className="info-item">
                <strong>Código Postal:</strong>
                <span>{user.address.zipcode}</span>
              </div>
              <div className="info-item">
                <strong>Ubicación:</strong>
                <span>Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</span>
              </div>
            </div>
          </div>

          <div className="user-info-section">
            <h2>Empresa</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Nombre:</strong>
                <span>{user.company.name}</span>
              </div>
              <div className="info-item">
                <strong>Eslogan:</strong>
                <span>{user.company.catchPhrase}</span>
              </div>
              <div className="info-item">
                <strong>Negocio:</strong>
                <span>{user.company.bs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;