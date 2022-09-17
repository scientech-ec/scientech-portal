import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../helpers/routes';

const ClientHead: React.FC = () => {
  const { client } = routes;
  const { pathname } = useLocation();

  useEffect(() => {
    Object.keys(client).map((key) => {
      if (client[key].target === pathname) {
        document.title = client[key].title;
      }
    });
  }, [pathname]);

  return null;
};

export default ClientHead;
