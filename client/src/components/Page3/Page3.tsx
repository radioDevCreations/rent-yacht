import './Page3.scss';
import Image from 'next/image';
import IMAGE from '../../../public/links';
import PageContainerProps from '../Pages/PageContainerProps';

const Page3 = ({ isActive, children }: PageContainerProps) => {
  return isActive && <article className="page-container">{children}</article>;
};

export default Page3;
