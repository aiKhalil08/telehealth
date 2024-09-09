import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from './Calendar';

describe('<Calendar />', () => {
  test('it should mount', () => {
    // render(<Calendar />);

    const CalendarE = screen.getByTestId('Calendar');

    expect(CalendarE).toBeInTheDocument();
  });
});