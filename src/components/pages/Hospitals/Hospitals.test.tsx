import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hospitals from './Hospitals';

describe('<Hospitals />', () => {
  test('it should mount', () => {
    render(<Hospitals />);

    const HospitalsE = screen.getByTestId('Hospitals');

    expect(HospitalsE).toBeInTheDocument();
  });
});