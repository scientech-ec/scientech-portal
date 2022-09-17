import React from 'react';
import { Outlet } from 'react-router-dom';
import routes from '../../helpers/routes';
import NavBar from '../molecules/NavBar';
import ClientFooter from '../organisms/ClientFooter';
import ClientHead from '../organisms/ClientHead';

interface Props {}

const ClientWrapper: React.FC<Props> = () => {
  return (
    <>
      <ClientHead />
      <NavBar pages={routes.client} />
      <Outlet />
      <ClientFooter />
    </>
  );
};

export default ClientWrapper;
