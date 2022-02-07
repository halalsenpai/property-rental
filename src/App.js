import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { useQuery } from './utils/hooks';

export const App = () => {
  console.log('testing');
  return (
    <BrowserRouter>
      <div className='App'>
        <Layout />
      </div>
    </BrowserRouter>
  );
};
