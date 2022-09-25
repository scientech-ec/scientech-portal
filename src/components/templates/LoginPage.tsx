import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import Scientech from "../atoms/logos/Scientech";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../atoms/login/input";
import { loginUser } from "../../services/loginServices";

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

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <BsArrowLeftCircle
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 h-12 w-12 cursor-pointer rounded-full  text-gray-400 hover:text-gray-600"
      />

      <section className="flex flex-col gap-6">
        <h1 className="sr-only">Iniciar Sesión</h1>
        <div className="">
          <Scientech className="h-10" />
          <h2 className="mt-6 text-center text-3xl font-extrabold uppercase text-gray-900">
            Bienvenido
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            const user = await loginUser(values.email, values.password);
            console.log(user);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input
                className="rounded-t-xl border-b-0"
                name="email"
                placeholder="Correo electrónico"
                type="email"
              />
              <Input
                className="rounded-b-xl"
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
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default LoginPage;
