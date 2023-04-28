import React from 'react';
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory, Link as RouterLink, Redirect } from "react-router-dom";
import * as yup from "yup";

import TextInput from "../TextInput";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password1: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1"), null], "Passwords must match"),
});


export default function Signup(props) {
  const { isLoggedIn, setIsLoggedIn, setUser } = props;
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {

        const form = {
          name : values.name,
          email: values.email,
          password: values.password1
        };
        console.log(form.password);
        const {data} = await axios.post("http://localhost:3002/api/v1/user/signup", form);  
        if (data.status === parseInt('401')) {
          setErrorMessage(data.response)
        } else {
          console.log("signup successful");
          localStorage.setItem('token', data.token);
          localStorage.setItem('user',[form.name,form.email]);
          setIsLoggedIn(true);
          setUser([form.name,form.email]);
          console.log("going to edit-profile");
          history.push("/edit-profile");
        }

      } catch (e) {
        alert(e);
        // if (
        //   e?.response?.data?.message &&
        //   typeof e?.response?.data?.message === "object"
        // ) {
        //   Object.entries(e.response.data.message).forEach(
        //     ([property, value]) => {
        //       setFieldError(property, value);
        //     }
        //   );
        // } else {

        //   alert("An unspecified error has occurred. Please try again.");
        // }
      }
    },
  });

  return isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/projects",
      }}
    />
  ) : (
    <>
      
      <Container maxWidth="xs" sx={{ paddingTop: 8}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.contrastText" }}
          >
            Find your dream team.
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Typography component="p" variant="p" color="red">
            {errorMessage}
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.name &&
                    Boolean(formik.errors.name)
                  }
                  helperText={
                    formik.touched.name && formik.errors.name
                  }
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  label="Email"
                  autoComplete="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  name="password1"
                  value={formik.values.password1}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password1 && Boolean(formik.errors.password1)
                  }
                  helperText={
                    formik.touched.password1 && formik.errors.password1
                  }
                  disabled={formik.isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  label="Confirm password"
                  type="password"
                  name="password2"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password2 && Boolean(formik.errors.password2)
                  }
                  helperText={
                    formik.touched.password2 && formik.errors.password2
                  }
                  disabled={formik.isSubmitting}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "green.main",
                color: "green.contrastText",
                textTransform: "none",
                borderRadius: 30,
                fontSize: 18,
              }}
              loading={formik.isSubmitting}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={18} sx={{color: "lightGray.main"}}>Already have an account?</Typography>
          <Button
            variant="contained"
            size="small"
            component={RouterLink}
            to="/"
            sx={{
              borderRadius: 40,
              marginLeft: 3,
              paddingX: 3,
              paddingY: 0.5,
              fontSize: 18,
              fontWeight: "regular",
              color: "secondary.contrastText",
              backgroundColor: "secondary.main",
              textTransform: "none",
            }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </>
  );
}
