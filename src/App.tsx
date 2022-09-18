import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientWrapper from './components/templates/ClientWrapper';
import ContactPage from './components/templates/ContactPage';
import HomePage from './components/templates/HomePage';
import ProductsPage from './components/templates/ProductsPage';
import UnderConstruction from './components/templates/UnderConstruction';
import routes from './helpers/routes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.client.home.target} element={<ClientWrapper />}>
            <Route index element={<HomePage />} />
            <Route
              path={routes.client.products.target}
              element={<ProductsPage />}
            />
            <Route
              path={routes.client.contact.target}
              element={<ContactPage />}
            />
            <Route
              path={routes.client['under-construction'].target}
              element={<UnderConstruction />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
