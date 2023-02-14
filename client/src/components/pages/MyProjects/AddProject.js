import React, { useState,useEffect } from 'react';
import Header from '../../Header'
import { LoadingButton } from "@mui/lab";
import { Box,CircularProgress,Container,Grid,Stack,TextField } from "@mui/material";
import TextInput from '../../TextInput';
import AutocompleteInput from '../../AutocompleteInput';
import * as yup from "yup";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import {getUserFromStorage} from '../../utils/user-localstorage.util';
import {getTokenFromStorage} from '../../utils/user-localstorage.util';

const validationSchema = yup.object({
    projectName: yup.string().required("Project Name is required"),
    type: yup.string().required("Type is required"),
    category: yup.string().required("Category is required"),
    relatedKeywords: yup.array(),
    briefDescription: yup.string().required("Brief Description is required"),
    progressAndFuture: yup.string(),
    skills: yup.array(),
    vacancies: yup.number().typeError('Vacancies must be a number').positive('Vacancies must be greater than zero').required("Vacancies is required"),
  });

export default function AddProject(props) {
  // const isLoggedIn=false;
  const isLoggedIn=getTokenFromStorage()? true: false;
  const token=getTokenFromStorage();
  const userFromStorage=getUserFromStorage();

  const skillOptions=["Python","Java","C++","Javascript","HTML","CSS","Unity","R","Web development","Mobile development","Game development","CI/CD","Database design","Data analysis"];
  const typeOptions=["School Project","Side Project","Potential Business Idea","Start-up"];
  const categoryOptions=["Web development","Mobile development","Game development","Artificial Intelligence","Machine Learning","Data Analytics","AR/VR","Embedded Software","Computer Hardware"];


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
        <Header headerText="New Project"/>
        <Formik
          enableReinitialize
          initialValues= {{
            projectName: '',
            type: '',
            category: '',
            relatedKeywords: [],
            briefDescription: '',
            progressAndFuture: '',
            skills: [],
            vacancies: '',
          }}
          validationSchema= {validationSchema}
          onSubmit= {async (values, { setFieldError }) => {
            console.log('submitting project..')
            try {
              const response = await axios.put("http://localhost:3002/api/v1/project/addProject", {
                projectName: values.projectName,
                type: values.type,
                category: values.category,
                relatedKeywords: values.relatedKeywords,
                briefDescription: values.briefDescription,
                progressAndFuture: values.progressAndFuture,
                skills: values.skills,
                vacancies: values.vacancies,
                //createdBy: '',
              },
              {
                headers: ({
                    Authorization: 'Bearer ' + token
                })
              });
      
              alert("Project created successfully!");
            } catch (e) {
         
                alert("An unspecified error has occurred. Please try again.");
        
            }}
          }
      >
        {props =>(
         <Box
          component="form" onSubmit={props.handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", flexGrow: 1, alignItems: 'center', marginY: 4 }}
          
        >
          <Grid container spacing={2} width='60%' >

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
            Create Project
          </LoadingButton>
        </Box>
        )}
      </Formik>
       
      </Container>
    </>
  
  );
}
