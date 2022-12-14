import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";
import * as Yup from "yup";
import { protectedRoutes } from "../../helpers/routes";
import { useRealmApp } from "../../hooks/useRealmApp";
import Scientech from "../atoms/svg/Scientech";

export const initialValues = {
  email: "",
  password: "",
};

export const schema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("Por favor ingrese un correo eléctronico"),
  password: Yup.string().required("Por favor ingrese una contraseña valida"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { logIn, isLoggedIn, refreshToken, currentUser } = useRealmApp();

  useEffect(() => {
    if (isLoggedIn()) {
      refreshToken();
      navigate(protectedRoutes.dashboard.target);
    }
  }, [currentUser]);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-slate-50 px-6">
      <ArrowCircleLeftIcon
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 h-12 w-12 cursor-pointer rounded-full text-gray-400 hover:text-gray-600"
      />

      <section className="mx-auto flex max-w-sm flex-col gap-6">
        <h1 className="sr-only">Iniciar Sesión</h1>
        <div className="">
          <Scientech />
          <h2 className="mt-6 text-center text-3xl font-extrabold uppercase text-gray-900">
            Bienvenido
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            const credentials = Realm.Credentials.emailPassword(
              values.email,
              values.password
            );
            await logIn(credentials);
            actions.setSubmitting(false);
            navigate(protectedRoutes.dashboard.target);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className="w-full rounded-t-xl border-2 border-b-0 py-3 px-6 text-lg focus:outline-none"
                name="email"
                placeholder="Correo electrónico"
                type="email"
              />

              <Field
                className="w-full rounded-b-xl border-2 py-3 px-6 text-lg focus:outline-none"
                name="password"
                placeholder="Contraseña"
                type="password"
              />
              <button
                className="mt-6 w-full rounded-xl bg-scientech py-3 text-center font-bold tracking-wide text-white disabled:bg-gray-400 disabled:text-gray-600"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cargando" : "Ingresar"}
              </button>
              <div className="">
                {Object.keys(initialValues).map((key) => (
                  <ErrorMessage
                    key={key}
                    name={key}
                    component="div"
                    className="text-xs text-red-500"
                  />
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default LoginPage;
