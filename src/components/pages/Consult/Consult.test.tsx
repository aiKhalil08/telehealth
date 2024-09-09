import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Consult from './Consult';

describe('<Consult />', () => {
  test('it should mount', () => {
    render(<Consult />);

    const ConsultE = screen.getByTestId('Consult');

    expect(ConsultE).toBeInTheDocument();
  });
});