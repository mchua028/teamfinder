import React, {useEffect, useState} from 'react';
import { useHistory, Link as RouterLink, Redirect } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";


import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

import TextInput from "../TextInput";


const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});


function Login(props) {
    const history= useHistory();

    const { isLoggedIn,setIsLoggedIn,setUser } = props
    const [errorMessage, setErrorMessage] = React.useState('')
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values, { setFieldError }) => {
        try {
          const formData = {
            email: values.email,
            password: values.password
          };
          const { data } = await axios.post("http://localhost:3002/api/v1/user/login", formData);
          if (data.status === parseInt('401')) {
            setErrorMessage(data.response)
          } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user',[data.name,formData.email]);
            setIsLoggedIn(true);
            setUser([data.name,formData.email]);
            history.push("/projects");
          }
          // } else {
          //   setErrorMessage(data.response)
            
          // }
  
        } catch(e) {
          alert(e);
          setFieldError("email", "Invalid email or password. Please try again.");
          setFieldError("password", "Invalid email or password. Please try again."
          );
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
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              color: "primary.contrastText",
            }}
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
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
                backgroundColor: "secondary.main",
                color: "black",
                textTransform: "none",
                borderRadius: 30,
                fontSize: 20,
              }}
              loading={formik.isSubmitting}
            >
              Log In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
      <Box sx={{mt: 5}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={18} sx={{color: "lightGray.main"}}>Do not have an account?</Typography>
          <Button
            variant="contained"
            size="small"
            component={RouterLink}
            to="/signup"
            sx={{
              borderRadius: 40,
              marginLeft: 3,
              paddingX: 3,
              paddingY: 0.5,
              fontSize: 18,
              fontWeight: "regular",
              color: "green.contrastText",
              backgroundColor: "green.main",
              textTransform: "none",
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Login;
