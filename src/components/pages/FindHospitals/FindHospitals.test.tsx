import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FindHospitals from './FindHospitals';

describe('<FindHospitals />', () => {
  test('it should mount', () => {
    render(<FindHospitals />);

    const FindHospitalsE = screen.getByTestId('FindHospitals');

    expect(FindHospitalsE).toBeInTheDocument();
  });
});