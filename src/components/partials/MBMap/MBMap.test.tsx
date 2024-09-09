import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MbMap from './MBMap';

describe('<MbMap />', () => {
  test('it should mount', () => {
    // render(<MBMap />);

    const MbMapE = screen.getByTestId('MbMap');

    expect(MbMapE).toBeInTheDocument();
  });
});