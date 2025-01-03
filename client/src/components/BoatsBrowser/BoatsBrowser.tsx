import BoatifySearch from '@/boatify-components/BoatifySearch/BoatifySearch';
import React, { FC } from 'react';
import BoatsBoard from '../BoatsBoard/BoatsBoard';
import BoatsFilter from '../BoatsFilter/BoatsFilter';
import './BoatsBrowser.scss';
import { useEffect, useState } from 'react';
import DataLoader from '@/dataLoaders/DataLoader';
import SortDirection from '@/utilities/SortDirection';
import { SystemBoolean } from '@/utilities/System';
import Boat from '@/models/Boat';

const BoatsBrowser = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        // const response = await DataLoader.selectAllSpecificBoats({
        //   pageNumber: 1,
        //   pageSize: 10,
        //   sortBy: 'Model',
        //   sortDirection: SortDirection.ASC,
        //   searchPhrase: 'test',
        // });
        const response = await DataLoader.selectAllBoats();
        const data: Boat[] = response;
        setData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch boats');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading boats...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="browser-container">
      <div className="browser">
        <aside className="aside">
          <BoatifySearch />
          <BoatsFilter />
        </aside>
        <section className="boats">
          <BoatsBoard boats={data as Boat[]} />
        </section>
      </div>
    </div>
  );
};

export default BoatsBrowser;
