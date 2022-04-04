import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import '../styles/login.css';
const loginSchema = Yup.object().shape({
  email: Yup.string().required("Required").label("Email"),
  password: Yup.string().required("Required").label("Password"),
  role: Yup.string().label("Role"),
});
function Login({ onLogin }) {
  // const [role, setRole] = useState('admin');
  // const handleChange = (e) => {
  //   setRole(e.target.value);
  //   console.log(e.target.value);
  // }
  return (
    <div class="container  pt-3 mt-5 pb-5 font_fam w-50">
      <h3 class="submit-content fw-bold text-center mt-5" style={{ color: "#24a0ed" }}>LOGIN</h3>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          // values.role = role;
          onLogin(values);
          // console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div class="mb-4 mt-5 ">
              <Field
                name="email"
                className="form-control"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div class="alert alert-danger  p-2" role="alert">
                  {errors.email}
                </div>
              ) : null}
            </div>

            <div class="mb-4">
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="password"
              />
              {errors.password && touched.password ? (
                <div class="alert alert-danger  p-2 p-2 " role="alert">
                  {errors.password}
                </div>
              ) : null}
              <Link
                to="/forgot"
                class="float-end small pb-2 pt-1 fg_link  fw-bold "
              >
                <p>FORGOT PASSWORD?</p>
              </Link>
            </div>

            {/* <div class="mb-4 mt-5 text-primary">
              <Field type='select' component="select" name="role" value={role} className={"form-control"} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              {errors.role && touched.role ? (
                <div class="alert alert-danger  p-2" role="alert">
                  {errors.role}
                </div>
              ) : null}
            </div> */}
            <div class="cart mt-4 align-items-center">
              <button type="submit" class="btn text-uppercase w-100 creat_btn ">
                SIGN IN
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default withRouter(Login);