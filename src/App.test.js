import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('first render', () => {
  const { getByText } = render(<App />);
  const firstHeader = getByText(/React based SW battle app/i);
  const secondHeader = getByText(/Select game type:/i);
  const firstRadio = getByText(/People/i);
  const secondRadio = getByText(/Starhips/i);
  expect(firstHeader).toBeInTheDocument();
  expect(secondHeader).toBeInTheDocument();
  expect(secondHeader).toBeInTheDocument();
  expect(firstRadio).toBeInTheDocument();
  expect(secondRadio).toBeInTheDocument();
});
