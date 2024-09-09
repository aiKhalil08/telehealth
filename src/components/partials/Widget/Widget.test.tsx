import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Widget from './Widget';

describe('<Widget />', () => {
  test('it should mount', () => {
    render(<Widget>df</Widget>);

    const WidgetE = screen.getByTestId('Widget');

    expect(WidgetE).toBeInTheDocument();
  });
});