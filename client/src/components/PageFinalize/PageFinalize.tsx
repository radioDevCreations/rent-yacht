import './PageFinalize.scss';
import Image from 'next/image';
import IMAGE from '../../../public/links';
import PageContainerProps from '../Pages/PageContainerProps';

const PageFinalize = ({ isActive, children }: PageContainerProps) => {
  return isActive && <article className="page-container">{children}</article>;
};

export default PageFinalize;
