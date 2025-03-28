import '../../styles/globals.css';
import '../../styles/styles.scss';
import './SingleFormLayout.scss';
import Provider from '@/redux/Provider';
import HeaderLogin from '../../components/HeaderSingleForm/HeaderSingleForm';
import FooterSingleForm from '../../components/FooterSingleForm/FooterSingleForm';
import BoatifyLinkProps from '@/utilities/BoatifyLinkProps';
import Children from '@/utilities/Children';

interface SingleFormLayoutProps extends Children {
  problem?: string;
  link?: BoatifyLinkProps;
  noLogo?: boolean;
}

const SingleFormLayout = ({
  children,
  problem,
  link,
  noLogo,
}: SingleFormLayoutProps) => {
  return (
    <Provider>
      <div className="single-form-layout">
        {!noLogo && <HeaderLogin />}
        <main className="single-form-layout">{children}</main>
        <FooterSingleForm problem={problem} link={link} />
      </div>
    </Provider>
  );
};

export default SingleFormLayout;
