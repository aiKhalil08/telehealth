import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from './Map';

describe('<Map />', () => {
  test('it should mount', () => {
    render(<Map />);

    const MapE = screen.getByTestId('Map');

    expect(MapE).toBeInTheDocument();
  });
});