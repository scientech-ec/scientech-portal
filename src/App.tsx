import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalculatorApp from "./components/templates/CalculatorApp";
import ContactPage from "./components/templates/ContactPage";
import DashboardIndex from "./components/templates/DashboardIndex";
import HomePage from "./components/templates/HomePage";
import LoginPage from "./components/templates/LoginPage";
import PrivateWrapper from "./components/templates/PrivateWrapper";
import ProductsPage from "./components/templates/ProductsPage";
import PublicWrapper from "./components/templates/PublicWrapper";
import UnderConstruction from "./components/templates/UnderConstruction";
import { loginRoute, protectedRoutes, publicRoutes } from "./helpers/routes";
import { RealmAppProvider } from "./hooks/useRealmApp";

const AppWithRealm: React.FC = () => {
  const id = import.meta.env.VITE_REALM_APP;
  return (
    <RealmAppProvider appId={id}>
      <App />
    </RealmAppProvider>
  );
};

const App: React.FC = () => {
  const { contact, home, products, underConstruction } = publicRoutes;
  const { dashboard, calculator } = protectedRoutes;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={home.target} element={<PublicWrapper />}>
          <Route index element={<HomePage />} />
          <Route path={products.target} element={<ProductsPage />} />
          <Route path={contact.target} element={<ContactPage />} />
          <Route
            path={underConstruction.target}
            element={<UnderConstruction />}
          />
        </Route>
        <Route path={loginRoute.target} element={<LoginPage />} />
        <Route path={dashboard.target} element={<PrivateWrapper />}>
          <Route index element={<DashboardIndex />} />
          <Route path={calculator.target} element={<CalculatorApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppWithRealm;
