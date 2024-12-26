import { useEffect, useState } from 'react';
import './UserDetails.scss';
import { SystemBoolean } from '@/utilities/System';
import DataLoader from '@/dataLoaders/DataLoader';
import User from '@/models/User';
import { FaEdit, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Captions from '@/captions/captions';
import { GiConfirmed } from "react-icons/gi";

const UserDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [isEditing, setIsEditing] = useState<boolean>(SystemBoolean.False);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [editableUser, setEditableUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const token = sessionStorage.getItem('token');
        const response = await DataLoader.getCurrentUserData(token);
        const data: User = await response;
        setUser(data);
        setEditableUser(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (field: keyof User, value: string) => {
    setEditableUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      setLoading(SystemBoolean.True);
      const token = sessionStorage.getItem('token');
      await DataLoader.updateUserData(token, editableUser);
      setUser({ ...user, ...editableUser } as User);
      setIsEditing(SystemBoolean.False);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setLoading(SystemBoolean.False);
    }
  };

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-details">
      <button className="user-details__return" onClick={() => BoatifyGoTo(`/`)}>
        <FaRegArrowAltCircleLeft />
      </button>

      <div className="user-details__name">
        <h2 className="user-details__name-field-text">
          {isEditing ? (
            <input
              value={editableUser.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          ) : (
            user?.name
          )}
        </h2>

        {isEditing ? (
          <button className="user-details__edit" onClick={saveChanges}>
            <GiConfirmed />
          </button>
        ) : (
          <button className="user-details__edit" onClick={() => setIsEditing(SystemBoolean.True)}>
            <FaEdit />
          </button>
        )}
      </div>
      <div className="user-details__field">
        <span className="user-details__field-name">{Captions.PROFILE_EMAIL}</span>
        {isEditing ? (
          <input
            value={editableUser.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        ) : (
          <span className="user-details__field-text">{user?.email}</span>
        )}
      </div>
      <div className="user-details__field">
        <span className="user-details__field-name">{Captions.PROFILE_ROLE}</span>
        {isEditing ? (
          <input
            value={editableUser.role || ''}
            onChange={(e) => handleInputChange('role', e.target.value)}
          />
        ) : (
          <span className="user-details__field-text">{user?.role}</span>
        )}
      </div>
      <div className="user-details__field">
        <span className="user-details__field-name">{Captions.PROFILE_DATE_OF_BIRTH}</span>
        {isEditing ? (
          <input
            type="date"
            value={editableUser.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        ) : (
          <span className="user-details__field-text">{user?.dateOfBirth}</span>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
