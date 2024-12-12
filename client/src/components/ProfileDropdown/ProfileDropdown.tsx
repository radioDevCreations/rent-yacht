import './ProfileDropdown.scss';
import Link from 'next/link';

type ProfileDropdownItem = {
  name: string;
  href: string;
  customClassName: string;
};

type ProfileDropdownProps = {
  isDropdownOpen: boolean;
};

const NAVIGATION_ITEMS: ProfileDropdownItem[] = [
  { name: 'My Profile', href: '/harbours', customClassName: '' },
  {
    name: 'My Reservations',
    href: '/my-reservations',
    customClassName: 'transition-delay1',
  },
  {
    name: 'My Boats',
    href: '/my-boats',
    customClassName: 'transition-delay2',
  },
  { name: 'Admin Panel', href: '/admin', customClassName: 'transition-delay3' },
];

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isDropdownOpen,
}) => {
  const itemClass = isDropdownOpen
    ? 'profile-dropdown__item profile-dropdown__item--in'
    : 'profile-dropdown__item profile-dropdown__item--out';
  const linkClass = isDropdownOpen
    ? 'profile-dropdown__item-link'
    : 'profile-dropdown__item-link profile-dropdown__item-link--inactive';
  return (
    <div className="hide-overflow">
      <ul className="profile-dropdown">
        {NAVIGATION_ITEMS.map((item) => (
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
