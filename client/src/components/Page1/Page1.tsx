import './Page1.scss';
import Image from 'next/image';
import IMAGE from '../../../public/links';
import PageContainerProps from '../Pages/PageContainerProps';

const Page1 = ({ isActive, children }: PageContainerProps) => {
  return isActive && <article className="page-container">{children}</article>;
};

export default Page1;
