import ButtonType from '@/utilities/ButtonType';
import BoatifyButton from '../BoatifyButton/BoatifyButton';
import './BoatifySearch.scss';
import { setSearchedPhrase } from '@/redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useState } from 'react';

let debounceTimeout: NodeJS.Timeout | null = null;

const BoatifySearch = () => {
  const dispatch = useDispatch();
  const [searchedValue, setSearchedValue] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchedValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      dispatch(setSearchedPhrase(value));
    }, 1000);
  };

  const handleClearClick = () => {
    setSearchedValue('');
    dispatch(setSearchedPhrase(''));
  };

  return (
    <div className="search">
      <div className="search__main">
        <div className="search__input">
          <label className="search__input-label" htmlFor="search"></label>
          <input
            type="text"
            id="search"
            className="search__input-field input__field"
            placeholder="Search..."
            value={searchedValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="search__button">
          <span className="icon icon--search"></span>
          <BoatifyButton
            value="Wyczyść"
            type={ButtonType.button}
            classModifier="boatify-button--search"
            onClick={handleClearClick}
            disabled={!searchedValue}
          />
        </div>
      </div>
      {searchedValue && (
        <div className="search__info">
          <p><strong>Searched Phrase: </strong> {searchedValue}</p>
        </div>
      )}
    </div>
  );
};

export default BoatifySearch;
