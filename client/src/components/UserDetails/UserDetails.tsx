import { useEffect, useState } from 'react';
import './UserDetails.scss';
import { SystemBoolean } from '@/utilities/System';
import DataLoader from '@/dataLoaders/DataLoader';
import User from '@/models/User';
import { FaEdit, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Captions from '@/captions/captions';
import { GiConfirmed } from "react-icons/gi";

export interface UpdateUserDto {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  dateOfBirth?: string | undefined;
}

const UserDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [isEditing, setIsEditing] = useState<boolean>(SystemBoolean.False);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [editableUser, setEditableUser] = useState<UpdateUserDto | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const token = sessionStorage.getItem('token');
        const response = await DataLoader.getCurrentUserData(token);
        const data: User = await response;

        const [firstName, lastName] = data.name.split(' ') || ['', ''];

        setUser(data);
        setEditableUser({
          email: data.email,
          firstName,
          lastName,
          dateOfBirth: data.dateOfBirth,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (field: keyof UpdateUserDto, value: string) => {
    setEditableUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const saveChanges = async () => {
    try {
      setLoading(SystemBoolean.True);
      const token = sessionStorage.getItem('token');

      const updatedUser = {
        ...editableUser,
        name: `${editableUser?.firstName} ${editableUser?.lastName}`,
      };

      await DataLoader.updateUserData(token, updatedUser);
      setUser({ ...user, ...updatedUser } as User);
      setIsEditing(SystemBoolean.False);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setLoading(SystemBoolean.False);
    }
  };

  if (loading) {
    return <div>Loading user...</div>;
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
            <>
              <input
                value={editableUser?.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="user-details__name-field-text user-details__name-field-text--first"
                placeholder="First Name"
              />
              <input
                value={editableUser?.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="user-details__name-field-text user-details__name-field-text--last"
                placeholder="Last Name"
              />
            </>
          ) : (
            `${editableUser?.firstName} ${editableUser?.lastName}`
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
            value={editableUser?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="user-details__field-text user-details__field-text--email"
          />
        ) : (
          <span className="user-details__field-text">{user?.email}</span>
        )}
      </div>
      <div className="user-details__field">
        <span className="user-details__field-name">{Captions.PROFILE_ROLE}</span>
        <span className="user-details__field-text">{user?.role}</span>
      </div>
      <div className="user-details__field">
        <span className="user-details__field-name">{Captions.PROFILE_DATE_OF_BIRTH}</span>
        {isEditing ? (
          <input
            type="date"
            value={editableUser?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="user-details__field-text"
          />
        ) : (
          <span className="user-details__field-text">{user?.dateOfBirth}</span>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
