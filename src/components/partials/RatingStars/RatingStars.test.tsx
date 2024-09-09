import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingStars from './RatingStars';

describe('<RatingStars />', () => {
  test('it should mount', () => {
    // render(<RatingStars />);

    const RatingStarsE = screen.getByTestId('RatingStars');

    expect(RatingStarsE).toBeInTheDocument();
  });
});