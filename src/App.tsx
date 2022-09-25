import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientWrapper from "./components/templates/ClientWrapper";
import ContactPage from "./components/templates/ContactPage";
import PrivateWrapper from "./components/templates/PrivateWrapper";
import HomePage from "./components/templates/HomePage";
import LoginPage from "./components/templates/LoginPage";
import ProductsPage from "./components/templates/ProductsPage";
import UnderConstruction from "./components/templates/UnderConstruction";
import routes from "./helpers/routes";
import CalculatorApp from "./components/templates/CalculatorApp";

const App = () => {
  const {
    client: { home, products, contact, underConstruction },
    employee: { dashboard, login },
    apps: { calculator },
  } = routes;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={home.target} element={<ClientWrapper />}>
            <Route index element={<HomePage />} />
            <Route path={products.target} element={<ProductsPage />} />
            <Route path={contact.target} element={<ContactPage />} />
            <Route
              path={underConstruction.target}
              element={<UnderConstruction />}
            />
          </Route>
          <Route path={login.target} element={<LoginPage />} />
          <Route path={dashboard.target} element={<PrivateWrapper />}>
            <Route path={calculator.target} element={<CalculatorApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
