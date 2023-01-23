import React from 'react';
import Header from '../Header'
import { LoadingButton } from "@mui/lab";
import { Box,Grid,Stack,TextField } from "@mui/material";
import TextInput from '../TextInput';
import AutocompleteInput from '../AutocompleteInput';
import Button from '@mui/material/Button';
import * as yup from "yup";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import {getUserFromStorage} from '../utils/user-localstorage.util';
import {getTokenFromStorage} from '../utils/user-localstorage.util';


export default function EditProfile(props) {
  // const isLoggedIn=false;
  const isLoggedIn=getTokenFromStorage()? true: false;
  const token=getTokenFromStorage();

  const validationSchema = yup.object({
    Age: yup.number().required("Age is required"),
    Occupation: yup.string().required("Occupation is required"),
    SchOrEmployer: yup.string().required("School/Employer is required"),
    Purpose: yup.string().max(500,"Length must be at most 500 chars").required("Purpose is required"),

  });

  const userFromStorage=getUserFromStorage();
  console.log(userFromStorage);
  
  const userName=userFromStorage? userFromStorage.split(',')[0]:'';
  const userEmail=userFromStorage? userFromStorage.split(',')[1]:'';
  

  const formik = useFormik({
    initialValues: {
      age: "",
      occupation: "",
      schOrEmployer: "",
      purpose: "",
      skills: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      console.log('submitting profile..')
      try {
        const response = await axios.post("http://localhost:3002/api/v1/user/updateProfile", {
          age: values.age,
          occupation: values.occupation,
          schOrEmployer: values.schOrEmployer,
          purpose: values.purpose,
          skills: values.skills
        },
        {
          headers: ({
              Authorization: 'Bearer ' + token
          })
        });

        alert("Profile saved successfully");
      } catch (e) {
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
          alert("An unspecified error has occurred. Please try again.");
        // }
      }
    },
  });

  const skillOptions=["Python","Java","C++","Javascript","HTML","CSS","Unity","R","Web development","Mobile development","Game development","CI/CD","Database design","Data analysis"];
  

  console.log(' editprofile isLoggedIn',isLoggedIn);
  return !isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : (
    // <Stack direction="column" spacing={2} sx={{ paddingLeft:'24px', paddingRight:'24px'}}>
    <Box>
        <Header headerText="My Profile"/>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", marginY: 4 }}
          maxWidth="xs"
        >
          <Stack direction="column" spacing={2} justifyContent="right">
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="Name"
              name="displayName"
              defaultValue={userName}
              InputProps={{
                readOnly: true,
            }}
            />
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="Email"
              name="email"
              defaultValue={userEmail}
              InputProps={{
                  readOnly: true,
              }}
            />
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="Age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={
                formik.touched.age &&
                Boolean(formik.errors.age)
              }
              helperText={
                formik.touched.age && formik.errors.age
              }
              inputProps={{ maxlength: 3, inputMode: 'numeric', pattern: '[0-9]*' }}
              
            />
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="Occupation"
              autoComplete="occupation"
              name="occupation"
              value={formik.values.occupation}
              onChange={formik.handleChange}
              error={
                formik.touched.occupation &&
                Boolean(formik.errors.occupation)
              }
              helperText={
                formik.touched.occupation && formik.errors.occupation
              }
              inputProps={{
                maxLength: 20,
              }}
            />
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="School/Employer"
              autoComplete="schOrEmployer"
              name="schOrEmployer"
              value={formik.values.schOrEmployer}
              onChange={formik.handleChange}
              error={
                formik.touched.schOrEmployer &&
                Boolean(formik.errors.schOrEmployer)
              }
              helperText={
                formik.touched.schOrEmployer && formik.errors.schOrEmployer
              }
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextInput
              
              multiline
              rows={4}
              fullWidth
              label="Purpose"
              autoComplete="purpose"
              name="purpose"
              value={formik.values.purpose}
              onChange={formik.handleChange}
              error={
                formik.touched.purpose &&
                Boolean(formik.errors.purpose)
              }
              helperText={
                formik.touched.purpose && formik.errors.purpose
              }
              inputProps={{
                maxLength: 500,
                style: { color: "#fff" }
              }}
            />
            <AutocompleteInput
              multiple
              id="skills"
              options={skillOptions}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Skills" />}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            
          </Stack>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "secondary.main", color: "#000", mt:2
            }}
            loading={formik.isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
  )
}
