import Captions from '@/captions/captions';
import './HeaderNavigation.scss';
import Link from 'next/link';

type NavigationItem = {
  name: string;
  href: string;
  customClassName: string;
};

type HeaderNavigationProps = {
  isMenuOpen: boolean;
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: Captions.PAGE_NAME_HARBOURS, href: '/harbours', customClassName: '' },
  { name: Captions.PAGE_NAME_BOATS, href: '/boats', customClassName: 'transition-delay1' },
  {
    name: Captions.PAGE_NAME_LAST_MINUTE,
    href: '/last-minute',
    customClassName: 'transition-delay2',
  },
  { name: Captions.PAGE_NAME_CONTACT, href: '/contact', customClassName: 'transition-delay4' },
];

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ isMenuOpen }) => {
  const itemClass = isMenuOpen
    ? 'header-navigation__item header-navigation__item--in'
    : 'header-navigation__item header-navigation__item--out';
  const linkClass = isMenuOpen
    ? 'header-navigation__item-link'
    : 'header-navigation__item-link header-navigation__item-link--inactive';
  return (
    <nav>
      <ul className="header-navigation">
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
    </nav>
  );
};

export default HeaderNavigation;
