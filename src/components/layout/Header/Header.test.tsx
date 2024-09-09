import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header />);

    const HeaderE = screen.getByTestId('Header');

    expect(HeaderE).toBeInTheDocument();
  });
});