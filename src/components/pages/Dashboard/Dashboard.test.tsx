import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  test('it should mount', () => {
    render(<Dashboard />);

    const DashboardE = screen.getByTestId('Dashboard');

    expect(DashboardE).toBeInTheDocument();
  });
});