import React, { useState,useEffect } from 'react';
import Header from '../Header'
import { LoadingButton } from "@mui/lab";
import { Box,CircularProgress,Container,Grid,Stack,TextField } from "@mui/material";
import TextInput from '../TextInput';
import AutocompleteInput from '../AutocompleteInput';
import * as yup from "yup";
import { Formik } from "formik";
import { Redirect,useHistory } from "react-router-dom";
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

export default function EditProfile() {
  const history= useHistory();
  // const isLoggedIn=false;
  const isLoggedIn=getTokenFromStorage()? true: false;
  const token=getTokenFromStorage();
  const userFromStorage=getUserFromStorage();
  // console.log(userFromStorage);
  const userName=userFromStorage? userFromStorage.split(',')[0]:'';
  const userEmail=userFromStorage? userFromStorage.split(',')[1]:'';
  const skillOptions=["Python","Java","C++","Javascript","HTML","CSS","Unity","R","Web development","Mobile development","Game development","CI/CD","Database design","Data analysis"];

  const [profile,setProfile]=useState();

  useEffect(() => {
     function fetchData() {
      // You can await here
      const response = axios.get("/user/retrieveProfile",
                        {
                          headers: ({
                              Authorization: 'Bearer ' + token
                          })
                        })
                        .then((res)=>{
                          console.log('res.data:',res.data);
                          setProfile(res.data);
                        })
                        .catch((e)=>{
                          console.log(e.code);
                          if(e.code==='ERR_BAD_REQUEST'){
                            localStorage.clear();
                            history.push('/');
                            window.location.reload();
                          }
                          else{
                            alert('An unspecified error occured.');
                          }
                        }
                        );
      // ...
    }
    fetchData();
  }, []);

  // useEffect(async () => {
  //   // const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`).then(response => response.json());
  //   console.log('retrieving profile..')
  
  //   const response=await axios.get("/user/retrieveProfile",
  //                       {
  //                         headers: ({
  //                             Authorization: 'Bearer ' + token
  //                         })
  //                       })
  //                       .then((res)=>{
  //                         // console.log('fetched profile:',res );
  //                         console.log('res.data:',res.data);
  //                         setProfile(res.data);
  //                         console.log('profile:',profile);
  //                           // return res.data;
  //                       })
  //                       .catch((e)=>{
  //                         console.log(e);
  //                       }
  //                       );
  //   // console.log('State right after setPokemon: ', pokemons);
  // }, [])


  // const retrieveProfile=async () => {
      
      // const response=
      
    
    // }
    // console.log('yet')
  // const profile=retrieveProfile().then((res)={

  // });


  // if (!profile) {
    
  //   console.log('profile is undefined');
  //   // wait for profile to be retrieved
    
  // }

  console.log('profile after useeffect:',profile);

  //this is not in render so the profile will not be defined at first
  // const formik = useFormik({
  //   enableReinitialize:true,
  //   initialValues: {
  //     age: profile.age,
  //     occupation: profile.occupation,
  //     schOrEmployer: profile.schOrEmployer,
  //     purpose: profile.purpose,
  //     skills: profile.skills,
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values, { setFieldError }) => {
  //     console.log('submitting profile..')
  //     try {
  //       const response = await axios.put("/user/updateProfile", {
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
  console.log('profile before render:',profile);
  return !isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : ( !profile? (
    <Box sx={{textAlign:'center'}}>
          <CircularProgress sx={{color:"primary.contrastText"}}/>
    </Box>
  ):(
    <>
    {/* // <Stack direction="column" spacing={2} sx={{ paddingLeft:'24px', paddingRight:'24px'}}> */}
      <Container >
        <Header headerText="My Profile"/>
        <Formik
          enableReinitialize
          initialValues= {{
            age: profile? profile.age: '',
            occupation: profile? profile.occupation:'',
            schOrEmployer: profile?profile.schOrEmployer:'',
            purpose: profile? profile.purpose:'',
            skills: profile?profile.skills:'',
          }}
          validationSchema= {validationSchema}
          onSubmit= {async (values, { setFieldError }) => {
            console.log('submitting profile..')
            try {
              const response = await axios.put("/user/updateProfile", {
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
                console.log(e.code);
                if(e.code==='ERR_BAD_REQUEST'){
                  localStorage.clear();
                  history.push('/');
                  window.location.reload();
                }
                else{
                  alert('An unspecified error occured.');
                }
            }}
          }
      >
        {props =>(
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
              // sx={{input: {color: '#343333'}}}
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
              // sx={{
              //   input: {color: 'gray.main'},
              // }}

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
              disableCloseOnSelect
              defaultValue={props.values.skills}
              onChange={(event, newValue) => {
                props.values.skills=newValue;
                console.log(props.values.skills);
              }}
              error={
                props.touched.skills &&
                Boolean(props.errors.skills)
              }
              // helperText={
              //   props.touched.skills && props.errors.skills
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
        )}
      </Formik>
       
      </Container>
    </>
  )
  );
}
