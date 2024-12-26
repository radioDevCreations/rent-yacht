'use client';
import './Details.scss';

import { FormEvent } from 'react';

const Details: React.FC = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {};

  return (
    <form className="details" onSubmit={handleSubmit}>
      <section className="details__board">
        {/* Add form elements here */}
      </section>
    </form>
  );
};

export default Details;
