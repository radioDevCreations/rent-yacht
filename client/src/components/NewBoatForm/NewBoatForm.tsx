import './NewBoatForm.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import BoatifyButtonVariant from '@/boatify-components/BoatifyButton/BoatifyButtonVariant';
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import BoatifyInputVariant from '@/boatify-components/BoatifyInput/BoatifyInputVariant';
import BoatifyTextarea from '@/boatify-components/BoatifyTextarea/BoatifyTextarea';
import BoatifyTextareaVariant from '@/boatify-components/BoatifyTextarea/BoatifyTextareaVariant';
import DataLoader from '@/dataLoaders/DataLoader';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import ButtonType from '@/utilities/ButtonType';
import InputType from '@/utilities/InputType';
import { useState, useEffect } from 'react';
import SuccessReconnect from '../Reconnect/SuccessReconnect/SuccessReconnect';
import { SystemBoolean } from '@/utilities/System';

interface HarbourDto {
  id: number;
  name: string;
  contactEmail?: string;
  contactNumber?: string;
  apartmentNumber?: string;
  street?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longtitude?: number;
}

interface CreateBoatDto {
  id: number;
  name: string;
  description: string;
  model: string;
  type: string;
  pricePerDay: number;
  mainImage: File | null;
  harbourId: number;
}

const NewBoatWithHarbour: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [harbours, setHarbours] = useState<HarbourDto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHarbour, setSelectedHarbour] = useState<HarbourDto | null>(
    null
  );

  const [formData, setFormData] = useState<CreateBoatDto>({
    id: 0,
    name: '',
    description: '',
    model: '',
    type: '',
    pricePerDay: 0,
    mainImage: null,
    harbourId: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHarbours = async () => {
      try {
        const harboursData = await DataLoader.selectAllHarbours();
        setHarbours(harboursData);
      } catch (error) {
        console.error('Failed to load harbours', error);
      }
    };
    fetchHarbours();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleHarbourSelect = (harbour: HarbourDto) => {
    setSelectedHarbour(harbour);
    setFormData((prev) => ({ ...prev, harbourId: harbour.id }));
  };

  const handleGoBack = () => {
    setSelectedHarbour(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pricePerDay' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, mainImage: file }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(SystemBoolean.True);

    const jwtToken = sessionStorage.getItem('token');
    if (!jwtToken?.length) {
      BoatifyGoTo('/');
      return;
    }

    const {
      id,
      name,
      description,
      model,
      type,
      pricePerDay,
      mainImage,
      harbourId,
    } = formData;

    const data = new FormData();
    data.append('id', id.toString());
    data.append('name', name);
    data.append('description', description);
    data.append('model', model);
    data.append('type', type);
    data.append('pricePerDay', pricePerDay.toString());
    data.append('harbourId', harbourId.toString());
    if (mainImage) data.append('mainImage', mainImage);

    try {
      await DataLoader.createBoat(jwtToken, harbourId, data);
      setFormData({
        id: 0,
        name: '',
        description: '',
        model: '',
        type: '',
        pricePerDay: 0,
        mainImage: null,
        harbourId,
      });
      setSelectedHarbour(null);
      setIsSuccess(SystemBoolean.True);
    } catch (error) {
      console.error('Error creating boat:', error);
    } finally {
      setIsSubmitting(SystemBoolean.False);
    }
  };

  const filteredHarbours = harbours.filter(
    (harbour) =>
      harbour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      harbour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (harbour.street &&
        harbour.street.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="new-boat-wrapper">
      {isSuccess ? (
        <SuccessReconnect message="Successfully added Boat" url="my-boats" />
      ) : !selectedHarbour ? (
        <div className="harbour-picker">
          <h2 className="harbout-picker__title">Select a Harbour</h2>
          <BoatifyInput
            id="search"
            name="search"
            label="Search"
            type={InputType.text}
            value={searchQuery}
            placeholder="Search by name, city, or street"
            onChange={handleSearchChange}
            variant={BoatifyInputVariant.light}
            isLongInput
          />
          <ul className="harbour-list">
            {filteredHarbours.map((harbour) => (
              <li
                key={harbour.id}
                onClick={() => handleHarbourSelect(harbour)}
                className="harbour-list__item"
              >
                {harbour.name} - {harbour.city}{' '}
                {harbour.street && `(${harbour.street})`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="new-boat-wrapper">
          <div className="harbour-selected">
            <h2 className="harbout-selected__title">
              Selected Harbour: {selectedHarbour.name}
            </h2>
            <BoatifyButton
              value="Go Back to Harbour Selection"
              type={ButtonType.button}
              variant={BoatifyButtonVariant.standard}
              onClick={handleGoBack}
            />
          </div>
          <form onSubmit={handleFormSubmit} className="new-boat">
            <BoatifyInput
              id="name"
              name="name"
              label="Name"
              type={InputType.text}
              value={formData.name}
              placeholder="Enter boat name"
              onChange={handleFormChange}
              variant={BoatifyInputVariant.light}
            />
            <BoatifyTextarea
              name="description"
              label="Description"
              placeholder="Enter description"
              onChange={handleFormChange}
              variant={BoatifyTextareaVariant.light}
            />
            <BoatifyInput
              id="model"
              name="model"
              label="Model"
              type={InputType.text}
              value={formData.model}
              placeholder="Enter boat model"
              onChange={handleFormChange}
              variant={BoatifyInputVariant.light}
            />
            <BoatifyInput
              id="type"
              name="type"
              label="Type"
              type={InputType.text}
              value={formData.type}
              placeholder="Enter boat type"
              onChange={handleFormChange}
              variant={BoatifyInputVariant.light}
            />
            <BoatifyInput
              id="pricePerDay"
              name="pricePerDay"
              label="Price Per Day"
              type={InputType.number}
              value={formData.pricePerDay.toString()}
              placeholder="Enter price per day"
              onChange={handleFormChange}
              variant={BoatifyInputVariant.light}
            />
            <BoatifyInput
              id="mainImage"
              name="mainImage"
              label="Main Image"
              type={InputType.file}
              onChange={handleFileChange}
              variant={BoatifyInputVariant.light}
            />
            <div className="spacer"></div>
            <BoatifyButton
              value={isSubmitting ? 'Submitting...' : 'Create Boat'}
              type={ButtonType.submit}
              disabled={isSubmitting}
              variant={BoatifyButtonVariant.standard}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default NewBoatWithHarbour;
