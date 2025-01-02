import { useEffect, useState } from 'react';
import './ProfileDropdown.scss';
import Link from 'next/link';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import { SystemBoolean } from '@/utilities/System';
import Captions from '@/captions/captions';

type ProfileDropdownItem = {
  name: string;
  href: string;
  customClassName: string;
};

type ProfileDropdownProps = {
  isDropdownOpen: boolean;
};

const NAVIGATION_ITEMS_LOGGED: ProfileDropdownItem[] = [
  { name: Captions.PAGE_NAME_MY_PROFILE, href: '/profile', customClassName: '' },
  {
    name: Captions.PAGE_NAME_MY_RESERVATIONS,
    href: '/my-reservations',
    customClassName: 'transition-delay1',
  },
  {
    name: Captions.PAGE_NAME_MY_BOATS,
    href: '/my-boats',
    customClassName: 'transition-delay3',
  },
  { name: Captions.LOGOUT, href: '/logout', customClassName: 'transition-delay4' },
];

const NAVIGATION_ITEMS_GUEST: ProfileDropdownItem[] = [
  { name: 'Login', href: '/login', customClassName: 'transition-delay1' },
  { name: 'Register', href: '/register', customClassName: 'transition-delay2' },
];

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isDropdownOpen,
}) => {
  const [isLogged, setIsLogged] = useState(SystemBoolean.False);

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('token');
    if (!jwtToken?.length) setIsLogged(SystemBoolean.False);
    else setIsLogged(SystemBoolean.True);
  }, []);

  const itemClass = isDropdownOpen
    ? 'profile-dropdown__item profile-dropdown__item--in'
    : 'profile-dropdown__item profile-dropdown__item--out';
  const linkClass = isDropdownOpen
    ? 'profile-dropdown__item-link'
    : 'profile-dropdown__item-link profile-dropdown__item-link--inactive';
  return (
    <div className="hide-overflow">
      <ul className="profile-dropdown">
        {isLogged &&
          NAVIGATION_ITEMS_LOGGED.map((item) => (
            <li
              key={item.name}
              className={`${item.customClassName} ${itemClass}`}
            >
              <Link href={item.href} className={linkClass}>
                {item.name}
              </Link>
            </li>
          ))}
        {!isLogged &&
          NAVIGATION_ITEMS_GUEST.map((item) => (
            <li
              key={item.name}
              className={`${item.customClassName} ${itemClass}`}
            >
              <Link href={item.href} className={linkClass}>
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfileDropdown;
