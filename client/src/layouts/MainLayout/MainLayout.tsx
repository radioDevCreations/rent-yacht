import '../../styles/globals.css';
import '../../styles/styles.scss';
import './MainLayout.scss';

import Footer from '../../components/Footer/Footer';
import Header from '@/components/Header/Header';
import Provider from '@/redux/Provider';
import Children from '@/utilities/Children';
import { useEffect, useState } from 'react';
import StandardReconnect from '@/components/Reconnect/StandardReconnect/StandardReconnect';
import SuccessReconnect from '@/components/Reconnect/SuccessReconnect/SuccessReconnect';
import FailedReconnect from '@/components/Reconnect/FailedReconnect/FailedReconnect';
import BoatifyScrollUp from '@/boatify-components/BoatifyScrollUp/BoatifyScrollUp';

interface MainLayoutProps extends Children {
  onlyForLogged?: boolean;
}

const MainLayout = ({ children, onlyForLogged }: MainLayoutProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  
    useEffect(() => {
      const jwtToken = sessionStorage.getItem('token');
      if (!jwtToken?.length) {
        setIsLogged(false);
      }
      else setIsLogged(true);
      setIsLoginChecked(true);
    }, []);

  return (
    <Provider>
      {(!onlyForLogged || isLogged) && isLoginChecked && <>
      <Header />
      <main className="main-layout">{children}</main>
      <Footer />
      <BoatifyScrollUp />
      </>
      }
      {onlyForLogged && !isLogged && isLoginChecked &&
      <>
      <Header />
      <main className="main-layout">
        <StandardReconnect />
      </main>
      <Footer />
      </>
      }
    </Provider>
  );
};

export default MainLayout;
