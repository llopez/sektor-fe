import React from 'react';
import { render } from 'react-dom';
import List from './components/List';
import Form from './components/Form';


render(
  <Form />,
  document.getElementById('form')
);

render(
  <List />,
  document.getElementById('app')
);
