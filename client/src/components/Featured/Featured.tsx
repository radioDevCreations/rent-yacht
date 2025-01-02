import './Featured.scss';
import Image from 'next/image';
import IMAGE from '../../../public/links';
import FeaturedCard from '../FeaturedCard/FeaturedCard';
import FeaturedCardsProps from '../FeaturedCard/FeaturedCardsProps';
import Captions from '@/captions/captions';

const FEATURED_CARDS: FeaturedCardsProps[] = [
  {
    name: Captions.FEATURED1,
    icon: {
      alt: Captions.FEATURED1,
      src: IMAGE.svg.login,
    },
    href: '/login',
  },
  {
    name: Captions.FEATURED2,
    icon: {
      alt: Captions.FEATURED2,
      src: IMAGE.svg.register,
    },
    href: '/register',
  },
  {
    name: Captions.FEATURED3,
    icon: {
      alt: Captions.FEATURED3,
      src: IMAGE.svg.browse,
    },
    href: '/boats',
  },
];

const Featured = () => {
  return (
    <article className="featured">
      {FEATURED_CARDS.map((featuredItem: FeaturedCardsProps) => (
        <FeaturedCard
          key={featuredItem.name}
          name={featuredItem.name}
          icon={featuredItem.icon}
          href={featuredItem.href}
        />
      ))}
    </article>
  );
};

export default Featured;
