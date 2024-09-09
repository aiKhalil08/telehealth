import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Appointments from './Appointments';

describe('<Appointments />', () => {
  test('it should mount', () => {
    render(<Appointments />);

    const AppointmentsE = screen.getByTestId('Appointments');

    expect(AppointmentsE).toBeInTheDocument();
  });
});