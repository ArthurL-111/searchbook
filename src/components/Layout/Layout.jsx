import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';

export default function Layout(props) {
  return (
    
    <React.Fragment>
        <Header />
        <Outlet />
    </React.Fragment>

  );
}
