import BoatifySearch from '@/boatify-components/BoatifySearch/BoatifySearch';
import React, { FC } from 'react';
import BoatsBoard from '../BoatsBoard/BoatsBoard';
import BoatsFilter from '../BoatsFilter/BoatsFilter';
import './BoatsBrowser.scss';
import { useEffect, useState } from 'react';
import { BoatDto } from '@/components/BoatsBoard/BoatsBoard';
import DataLoader from '@/dataLoaders/DataLoader';
import SortDirection from '@/utilities/SortDirection';

const BoatsBrowser = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await DataLoader.selectAllSpecificBoats({
          pageNumber: 1,
          pageSize: 10,
          sortBy: 'Model',
          sortDirection: SortDirection.ASC,
          searchPhrase: 'ne',
        });
        const data: any[] = response;
        setData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading reservations...</div>;
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
          <BoatsBoard boats={data.items as BoatDto[]} />
        </section>
      </div>
    </div>
  );
};

export default BoatsBrowser;
