import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import "./styles.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
FormikSingUp.propTypes = {};

function FormikSingUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("required")
        .min(6, "Must be 6 character or more"),

      email: Yup.string()
        .required("required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          " Please enter a valid email address"
        ),

      phone: Yup.string()
        .required("required")
        .min(6, "Must be 6 character or more")
        .matches(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          "Must be a valid phone number"
        ),

      password: Yup.string()
        .required("required")
        .min(6, "Must be 6 character or more")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
        ),

      confirmedPassword: Yup.string()
        .required("required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      console.log(values);
      window.alert("Form Submit");
    },
  });

  return (
    <Box>
      <Container>
        <Grid
          container
          style={{
            justifyContent: "center",
          }}
        >
          <Paper elevation={1} style={{ padding: "10px" }}>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="name"> Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                //thay vì xài như bth  onChange={(e) => setName(e.target.value)}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && (
                <p style={{ color: "red" }}>{formik.errors.name}</p>
              )}

              <hr />
              <label htmlFor="email"> Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <p style={{ color: "red" }}>{formik.errors.email}</p>
              )}

              <hr />
              <label htmlFor="phone"> Your Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && (
                <p style={{ color: "red" }}>{formik.errors.phone}</p>
              )}
              <hr />
              <label htmlFor="password"> Password</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <p style={{ color: "red" }}>{formik.errors.password}</p>
              )}
              <hr />
              <label htmlFor="confirmedPassword"> Confirmed Password</label>
              <input
                type="text"
                id="confirmedPassword"
                name="confirmedPassword"
                placeholder="Enter your confirmed password"
                onChange={formik.handleChange}
                value={formik.values.confirmedPassword}
              />
              {formik.errors.confirmedPassword && (
                <p style={{ color: "red" }}>
                  {formik.errors.confirmedPassword}
                </p>
              )}

              <div style={{ textAlign: "right" }}>
                <Button type="submit">Submit</Button>
                <Button
                  type="button"
                  onclick={() => {
                    formik.handleReset();
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
}

export default FormikSingUp;
