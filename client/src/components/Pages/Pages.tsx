import './Pages.scss';
import { ReactNode } from 'react';
import Page from '../Page/Page';

export interface Steps {
  step1?: ReactNode;
  step2?: ReactNode;
  step3?: ReactNode;
  step4?: ReactNode;
}

interface PagesProps {
  currentPosition: number;
  steps: Steps;
}

const Pages = ({ currentPosition, steps }: PagesProps) => {
  return (
    <article className="rp-container">
      {steps.step1 && (
        <Page isActive={currentPosition === 1}>{steps.step1}</Page>
      )}
      {steps.step2 && (
        <Page isActive={currentPosition === 2}>{steps.step2}</Page>
      )}
      {steps.step3 && (
        <Page isActive={currentPosition === 3}>{steps.step3}</Page>
      )}
      {steps.step4 && (
        <Page isActive={currentPosition === 4}>{steps.step4}</Page>
      )}
    </article>
  );
};

export default Pages;
