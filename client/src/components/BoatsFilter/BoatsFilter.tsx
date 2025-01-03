import './BoatsFilter.scss';
import { FaSailboat } from 'react-icons/fa6';
import { IoMdBoat } from 'react-icons/io';
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import InputType from '@/utilities/InputType';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import {
  setPassengersFilter,
  setPriceFrom,
  setPriceTo,
  setHarbourName,
  setType,
} from '@/redux/slices/filterSlice';
import BoatifyTag from '@/boatify-components/BoatifyTag/BoatifyTag';
import TagType from '@/utilities/TagType';
import { SystemBoolean } from '@/utilities/System';
import { RootState } from '@/redux/store';
import Captions from '@/captions/captions';
import BoatType from '@/utilities/BoatTypes';

const BoatsFilter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filters);
  
  const [selectedType, setSelectedType] = useState<BoatType>(BoatType.All);

  const handlePassengersNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPassengersFilter(+event?.target?.value));
  };
  const handlePriceFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPriceFrom(+event?.target?.value));
  };
  const handlePriceToChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPriceTo(+event?.target?.value));
  };
  const handleHarbourChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHarbourName(event?.target?.value));
  };

  const handleTypeClick = (type: BoatType) => {
    setSelectedType(type);
    dispatch(setType(type));
  };

  return (
    <section className="filter">
      <div className="filter__section">
        <div
          className={`filter__type-option ${selectedType === BoatType.All ? 'selected' : ''}`}
          onClick={() => handleTypeClick(BoatType.All)}
        >
          <span>ALL</span>
        </div>
        <div
          className={`filter__type-option ${selectedType === BoatType.Sailboat ? 'selected' : ''}`}
          onClick={() => handleTypeClick(BoatType.Sailboat)}
        >
          <span className="filter__type-icon">
            <FaSailboat />
          </span>
        </div>
        <div
          className={`filter__type-option ${selectedType === BoatType.Motorboat ? 'selected' : ''}`}
          onClick={() => handleTypeClick(BoatType.Motorboat)}
        >
          <span className="filter__type-icon">
            <IoMdBoat />
          </span>
        </div>
      </div>
      <div className="filter__section filter__section--vertical">
        <BoatifyInput
          label="Passengers"
          key="passengers"
          placeholder="2"
          type={InputType.number}
          onChange={handlePassengersNumberChange}
          isLongInput={SystemBoolean.True}
        />
        <BoatifyInput
          label="Harbour"
          key="harbour"
          placeholder="Harbour name or city"
          type={InputType.text}
          onChange={handleHarbourChange}
          isLongInput={SystemBoolean.True}
        />
      </div>
      <div className="filter__section filter__section--vertical">
        <h3 className="filter__section-title">
          <span>Price</span>
        </h3>
        <span className="spacer"></span>
        <BoatifyInput
          label="Price From"
          key="pricefrom"
          placeholder="2"
          type={InputType.currency}
          onChange={handlePriceFromChange}
          isLongInput={SystemBoolean.True}
        />
        <BoatifyInput
          label="Price To"
          key="priceto"
          placeholder="2"
          type={InputType.currency}
          onChange={handlePriceToChange}
          isLongInput={SystemBoolean.True}
        />
        <BoatifyTag
          type={TagType.days}
          label={`Searching: ${filterState.priceFrom} ${Captions.PLN} - ${filterState.priceTo} ${Captions.PLN}`}
        />
      </div>
    </section>
  );
};

export default BoatsFilter;
