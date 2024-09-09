import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  test('it should mount', () => {
    render(<Sidebar />);

    const SidebarE = screen.getByTestId('Sidebar');

    expect(SidebarE).toBeInTheDocument();
  });
});