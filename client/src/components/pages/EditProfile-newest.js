import React, { useState,useEffect } from 'react';
import Header from '../Header'
import { LoadingButton } from "@mui/lab";
import { Box,Container,Grid,Stack,TextField } from "@mui/material";
import TextInput from '../TextInput';
import AutocompleteInput from '../AutocompleteInput';
import * as yup from "yup";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import {getUserFromStorage} from '../utils/user-localstorage.util';
import {getTokenFromStorage} from '../utils/user-localstorage.util';

const validationSchema = yup.object({
    age: yup.number().typeError('Age must be a number').positive('Age must be greater than zero').required("Age is required"),
    occupation: yup.string().required("Occupation is required"),
    schOrEmployer: yup.string().required("School/Employer is required"),
    purpose: yup.string(),
    skills: yup.array()
  });

export default function EditProfile(props) {
  // const isLoggedIn=false;
  const isLoggedIn=getTokenFromStorage()? true: false;
  const token=getTokenFromStorage();
  const userFromStorage=getUserFromStorage();
  // console.log(userFromStorage);
  const userName=userFromStorage? userFromStorage.split(',')[0]:'';
  const userEmail=userFromStorage? userFromStorage.split(',')[1]:'';
  const skillOptions=["Python","Java","C++","Javascript","HTML","CSS","Unity","R","Web development","Mobile development","Game development","CI/CD","Database design","Data analysis"];

  const [age, setAge] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [schOrEmployer, setSchOrEmployer] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [skills, setSkills] = useState([]);
  
  // useEffect(()=>{
  //   if(isLoggedIn){
  //     retrieveProfile();
  //   }
  // },[])
  const retrieveProfile= async () => {
      console.log('retrieving profile..');
   
      const response=await axios.get("http://localhost:3002/api/v1/user/retrieveProfile",
                      {
                        headers: ({
                            Authorization: 'Bearer ' + token
                        })
                      })
                      .then((res)=>{
                        console.log('fetched profile:',res );
                        if ('age' in res.data){
                          console.log('res.data:',res.data);
                          return res.data;
                        }
                      })
                      .catch((e)=>{
                        console.log(e);
                      }
                      );
    }
  


  // console.log('currentProfile skills:',profile.skills);

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     age: profile.age, //undefined if does not exist
  //     occupation: profile.occupation,
  //     schOrEmployer: profile.schOrEmployer,
  //     purpose: profile.purpose,
  //     skills: profile.skills,
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values, { setFieldError }) => {
  //     console.log('submitting profile..')
  //     try {
  //       const response = await axios.put("http://localhost:3002/api/v1/user/updateProfile", {
  //         age: values.age,
  //         occupation: values.occupation,
  //         schOrEmployer: values.schOrEmployer,
  //         purpose: values.purpose,
  //         skills: values.skills
  //       },
  //       {
  //         headers: ({
  //             Authorization: 'Bearer ' + token
  //         })
  //       });

  //       alert("Profile saved successfully!");
  //     } catch (e) {
  //       // if (
  //       //   e?.response?.data?.message &&
  //       //   typeof e?.response?.data?.message === "object"
  //       // ) {
  //       //   Object.entries(e.response.data.message).forEach(
  //       //     ([property, value]) => {
  //       //       setFieldError(property, value);
  //       //     }
  //       //   );
  //       // } else {
  //         alert("An unspecified error has occurred. Please try again.");
  //       // }
  //     }
  //   },
  // });
  // console.log(' editprofile isLoggedIn',isLoggedIn);
  return !isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : (
    <>
    {/* // <Stack direction="column" spacing={2} sx={{ paddingLeft:'24px', paddingRight:'24px'}}> */}
      <Container  >
        <Header headerText="My Profile"/>
        <Formik
          initialValues={{ 
            age: '', //undefined if does not exist
            occupation: '',
            schOrEmployer: '',
            purpose: '',
            skills: '',
          }}
          validationSchema= {validationSchema}
          onSubmit={async (values, { setFieldError }) => {
            console.log('submitting profile..')
            try {
              const response = await axios.put("http://localhost:3002/api/v1/user/updateProfile", {
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
      
              alert("Profile saved successfully!");
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
          }}
      >
        {props => {
                const [user, setUser] = useState({});
                useEffect(() => {
                        // get user and set form fields
                        const res=retrieveProfile();
                        console.log('res:',res);
                        const fields = ['age','occupation','schOrEmployer','purpose','skills'];
                        fields.forEach(field => props.setFieldValue(field, res[field], false));
                        setUser(res);
                      
                }, {});

        return (
          <Box
          component="form" onSubmit={props.handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", flexGrow: 1, alignItems: 'center', marginY: 4 }}
          
        >
          <Grid container spacing={2} width='60%' >
          <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="Age"
              name="age"
              value={props.values.age}
              onChange={props.handleChange}
              error={
                props.touched.age &&
                Boolean(props.errors.age)
              }
              helperText={
                props.touched.age && props.errors.age
              }
              inputProps={{ maxLength: 3 }}
              
            />
            </Grid>
            <Grid item xs={12}>
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="Occupation"
              autoComplete="occupation"
              name="occupation"
              value={props.values.occupation}
              onChange={props.handleChange}
              error={
                props.touched.occupation &&
                Boolean(props.errors.occupation)
              }
              helperText={
                props.touched.occupation && props.errors.occupation
              }
              inputProps={{
                maxLength: 20,
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextInput
              required
              // sx={{width: '60px'}}
              fullWidth
              label="School/Employer"
              autoComplete="schOrEmployer"
              name="schOrEmployer"
              value={props.values.schOrEmployer}
              onChange={props.handleChange}
              error={
                props.touched.schOrEmployer &&
                Boolean(props.errors.schOrEmployer)
              }
              helperText={
                props.touched.schOrEmployer && props.errors.schOrEmployer
              }
              inputProps={{
                maxLength: 30,
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextInput
              
              multiline
              rows={4}
              fullWidth
              label="Purpose"
              autoComplete="purpose"
              name="purpose"
              value={props.values.purpose}
              onChange={props.handleChange}
              error={
                props.touched.purpose &&
                Boolean(props.errors.purpose)
              }
              helperText={
                props.touched.purpose && props.errors.purpose
              }
              inputProps={{
                maxLength: 500,
                style: { color: "#fff" }
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <AutocompleteInput
              multiple
              // defaultValue={props.values.skills}
              onChange={(event, newValue) => {
                props.values.skills=newValue;
                console.log(props.values.skills);
              }}
              error={
                props.touched.skills &&
                Boolean(props.errors.skills)
              }
              // helperText={
              //   formik.touched.skills && formik.errors.skills
              // }
              options={skillOptions}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Skills" />}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            </Grid>
          </Grid>
          <LoadingButton
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "secondary.main",
                color: "black",
                textTransform: "none",
                borderRadius: 30,
                fontSize: 20,
                width: '58%'
              }}
              loading={props.isSubmitting}
            >
            Save Profile
          </LoadingButton>
        </Box>
        //  <form onSubmit={props.handleSubmit}>
        //    <input
        //      type="text"
        //      onChange={props.handleChange}
        //      onBlur={props.handleBlur}
        //      value={props.values.name}
        //      name="name"
        //    />
        //    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
        //    <button type="submit">Submit</button>
        //  </form>
       )}
    }
        
      </Formik>
        {/* <Box
          component="form" onSubmit={formik.handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", flexGrow: 1, alignItems: 'center', marginY: 4 }}
          
        >
          <Grid container spacing={2} width='60%' >
          <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
              inputProps={{ maxLength: 3 }}
              
            />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
            <AutocompleteInput
              multiple
              defaultValue={formik.values.skills}
              onChange={(event, newValue) => {
                formik.values.skills=newValue;
                console.log(formik.values.skills);
              }}
              error={
                formik.touched.skills &&
                Boolean(formik.errors.skills)
              }
              // helperText={
              //   formik.touched.skills && formik.errors.skills
              // }
              options={skillOptions}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Skills" />}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            </Grid>
          </Grid>
          <LoadingButton
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "secondary.main",
                color: "black",
                textTransform: "none",
                borderRadius: 30,
                fontSize: 20,
                width: '58%'
              }}
              loading={formik.isSubmitting}
            >
            Save Profile
          </LoadingButton>
        </Box> */}
      </Container>
    </>
  );
}
