'use client';

import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  openMenu,
  closeMenu,
  setIsProfileDropdownOpen,
} from '@/redux/slices/applicationSlice';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import IMAGE from '../../../public/links';
import { RootState } from '@/redux/store';
import { SystemBoolean } from '@/utilities/System';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state: RootState) => state.application);

  const toggleMenuOpen = () => {
    if (applicationState.isMenuOpen) dispatch(closeMenu());
    else dispatch(openMenu());
  };

  const toggleProfileDropdownOpen = () => {
    if (applicationState.isProfileDropdownOpen)
      dispatch(setIsProfileDropdownOpen(SystemBoolean.False));
    else dispatch(setIsProfileDropdownOpen(SystemBoolean.True));
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/" className="logo__link">
          <Image
            src={IMAGE.svg.sailBoat}
            alt="logo"
            className="logo__image"
            width={48}
            height={48}
          />
          <span className="logo__text">Boatify</span>
        </Link>
      </div>
      <div className="navigation-wrapper">
        <HeaderNavigation isMenuOpen={applicationState.isMenuOpen} />
        <ProfileDropdown
          isDropdownOpen={applicationState.isProfileDropdownOpen}
        />

        {applicationState.isMenuOpen ? (
          <button
            className="navigation-switch"
            onClick={toggleMenuOpen}
            disabled={!applicationState.isMenuOpen}
          >
            <IoMdCloseCircleOutline />
          </button>
        ) : (
          <button
            className="navigation-switch"
            onClick={toggleMenuOpen}
            disabled={applicationState.isMenuOpen}
          >
            <HiMenu />
          </button>
        )}
        {applicationState.isProfileDropdownOpen ? (
          <button
            className="profile-switch"
            onClick={toggleProfileDropdownOpen}
            disabled={!applicationState.isProfileDropdownOpen}
          >
            <IoMdCloseCircleOutline />
          </button>
        ) : (
          <button
            className="profile-switch"
            onClick={toggleProfileDropdownOpen}
            disabled={applicationState.isProfileDropdownOpen}
          >
            <IoMdPerson />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
