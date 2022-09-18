import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../helpers/routes';

const ClientHead: React.FC = () => {
  const { client } = routes;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(client).map((key) => {
      if (client[key].target === pathname) {
        document.title = client[key].title;
      }
    });
  }, [pathname]);

  useEffect(() => {
    navigate('/en_construccion', { replace: true });
  }, []);

  return null;
};

export default ClientHead;
