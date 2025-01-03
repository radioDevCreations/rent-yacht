import './BoatsFilter.scss';
import { FaSailboat } from 'react-icons/fa6';
import { IoMdBoat } from 'react-icons/io';
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import InputType from '@/utilities/InputType';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import {
  setPassengersFilter,
  setPriceFrom,
  setPriceTo,
  setHarbourName,
} from '@/redux/slices/filterSlice';
import BoatifyTag from '@/boatify-components/BoatifyTag/BoatifyTag';
import TagType from '@/utilities/TagType';
import { SystemBoolean } from '@/utilities/System';
import { RootState } from '@/redux/store';
import Captions from '@/captions/captions';

const BoatsFilter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filters);
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

  return (
    <section className="filter">
      <div className="filter__section">
        <div className="filter__type-option">
          <span>ALL</span>
        </div>
        <div className="filter__type-option">
          <span className="filter__type-icon">
            <FaSailboat />
          </span>
        </div>
        <div className="filter__type-option">
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
      {/* <div className="filter__section filter__section--vertical">
        <h3 className="filter__section-title">
          <span>Period of Rent</span>
        </h3>
        <span className="spacer"></span>
        <BoatifyInput
          label="Start Date"
          key="startdate"
          placeholder="2"
          type={InputType.date}
          onChange={handleStartDateChange}
          isLongInput={SystemBoolean.True}
        />
        <BoatifyInput
          label="End Date"
          key="enddate"
          placeholder="2"
          type={InputType.date}
          onChange={handleEndDateChange}
          isLongInput={SystemBoolean.True}
        />
        <BoatifyTag
          type={TagType.days}
          label={`${filterState.endRentDate - filterState.startRentDate}`}
        />
      </div> */}
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
      <div className="filter__section filter__section--vertical"></div>
    </section>
  );
};

export default BoatsFilter;
