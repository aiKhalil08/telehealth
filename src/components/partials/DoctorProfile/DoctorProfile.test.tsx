import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DoctorProfile from './DoctorProfile';

describe('<DoctorProfile />', () => {
  test('it should mount', () => {
    // render(<DoctorProfile />);

    const DoctorProfileE = screen.getByTestId('DoctorProfile');

    expect(DoctorProfileE).toBeInTheDocument();
  });
});