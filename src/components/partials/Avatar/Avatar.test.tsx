import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from './Avatar';

describe('<Avatar />', () => {
  test('it should mount', () => {
    render(<Avatar />);

    const AvatarE = screen.getByTestId('Avatar');

    expect(AvatarE).toBeInTheDocument();
  });
});