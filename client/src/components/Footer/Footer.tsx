import LinkType from '@/utilities/LinkType';
import './Footer.scss';
import IMAGE from '../../../public/links';
import Image from 'next/image';

interface FooterItem {
  name: string;
  type: LinkType;
  src?: string;
  alt?: string;
  href?: string;
}

const FOOTER_ITEMS: {
  column1: FooterItem[];
  column2: FooterItem[];
  column3: FooterItem[];
} = {
  column1: [
    {
      name: 'Footer Item 1',
      type: LinkType.image,
      src: IMAGE.svg.sailBoat,
      alt: 'Sailboat Logo',
    },
    {
      name: 'Footer Item 2',
      type: LinkType.image,
      src: IMAGE.svg.sailBoat,
      alt: 'Sailboat Logo',
    },
  ],
  column2: [
    { name: 'Harbours', type: LinkType.link, href: '' },
    { name: 'Boats', type: LinkType.link, href: '' },
    { name: 'Last Minute', type: LinkType.link, href: '' },
    { name: 'Shop', type: LinkType.link, href: '' },
    { name: 'Contact', type: LinkType.link, href: '' },
  ],
  column3: [
    { name: 'My Account', type: LinkType.link, href: '' },
    { name: 'My Rentals', type: LinkType.link, href: '' },
    { name: 'Favourites', type: LinkType.link, href: '' },
    { name: 'Compare Boats', type: LinkType.link, href: '' },
    { name: 'My Documents', type: LinkType.link, href: '' },
  ],
};

const Footer: React.FC = () => {
  const footerItemClass = 'footer-links__item';
  const footerImageClass = 'footer-images__item';

  return (
    <footer className="footer">
      <div className="footer-images">
        <ul className="footer-images__row">
          {FOOTER_ITEMS.column1.map((item) =>
            item.type === LinkType.image && item.src ? (
              <Image
                width={64}
                height={64}
                key={item.name}
                className={footerImageClass}
                src={item.src}
                alt={item.alt || 'Footer Image'}
              />
            ) : null
          )}
        </ul>
      </div>
      <div className="footer-links">
        <ul className="footer-links__col footer-links__col2">
          {FOOTER_ITEMS.column2.map((item) =>
            item.type === LinkType.link && item.href ? (
              <li key={item.name} className={footerItemClass}>
                <a href={item.href}>{item.name}</a>
              </li>
            ) : null
          )}
        </ul>
        <ul className="footer-links__col footer-links__col3">
          {FOOTER_ITEMS.column3.map((item) =>
            item.type === LinkType.link && item.href ? (
              <li key={item.name} className={footerItemClass}>
                <a href={item.href}>{item.name}</a>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
