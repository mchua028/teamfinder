import React, { useState,useEffect } from 'react';
import Header from '../../Header'
import { LoadingButton } from "@mui/lab";
import { Box,CircularProgress,Container,Grid,Stack,TextField } from "@mui/material";
import TextInput from '../../TextInput';
import AutocompleteInput from '../../AutocompleteInput';
import * as yup from "yup";
import { Formik } from "formik";
import { Redirect,useHistory,useParams } from "react-router-dom";
import axios from 'axios';

import {getTokenFromStorage} from '../../utils/user-localstorage.util';

const validationSchema = yup.object({
    age: yup.number().typeError('Age must be a number').positive('Age must be greater than zero').required("Age is required"),
    occupation: yup.string().required("Occupation is required"),
    schOrEmployer: yup.string().required("School/Employer is required"),
    purpose: yup.string(),
    skills: yup.array()
  });

export default function EditProject(props) {
  const history= useHistory();

  const isLoggedIn=getTokenFromStorage()? true: false;
  const token=getTokenFromStorage();

  const skillOptions=["Python","Java","C++","Javascript","HTML","CSS","Unity","R","Web development","Mobile development","Game development","CI/CD","Database design","Data analysis"];
  const typeOptions=["School Project","Side Project","Potential Business Idea","Start-up","Others"];
  const categoryOptions=["Software engineering","Data analytics","Machine learning/AI","Robotics","Game development","IoT","AR/VR","Others"];
  const keywordOptions=["healthtech","game","mobile","education","fun","ecommerce"];

  const [project,setProject]=useState();

  const { projectId } = useParams();

  console.log('projectid',projectId);

  useEffect(() => {
     function fetchData() {
      // You can await here
      axios.get("/project/byId/"+projectId,
                        {
                          headers: ({
                              Authorization: 'Bearer ' + token
                          })
                        })
                        .then((res)=>{
                          console.log('res.data:',res.data);
                          setProject(res.data);
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


  console.log('project after useeffect:',project);

  return !isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : ( !project? (
    <Box sx={{textAlign:'center'}}>
          <CircularProgress sx={{color:"primary.contrastText"}}/>
    </Box>
  ):(
    <>
      <Container >
        <Header headerText={project.projectName}/>
        <Formik
          enableReinitialize
          initialValues= {{
            projectName: project.projectName,
            type: project.type,
            category: project.category,
            relatedKeywords: project.relatedKeywords,
            briefDescription: project.briefDescription,
            progressAndFuture: project.progressAndFuture,
            skills: project.skills,
            vacancies: project.vacancies,
          }}
          validationSchema= {validationSchema}
          onSubmit= {async (values, { setFieldError }) => {
            console.log('creating project...')
            try {
              const response = await axios.put("/project/"+projectId, {
                projectName: values.projectName,
                type: values.type,
                category: values.category,
                relatedKeywords: values.relatedKeywords,
                briefDescription: values.briefDescription,
                progressAndFuture: values.progressAndFuture,
                skills: values.skills,
                vacancies: values.vacancies,
                isOpen: true,
              },
              {
                headers: ({
                    Authorization: 'Bearer ' + token
                })
              });
      
              alert("Project saved successfully!");
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
              fullWidth
              label="Project Name"
              name="projectName"
              value={props.values.projectName}
              onChange={props.handleChange}
              error={
                props.touched.projectName &&
                Boolean(props.errors.projectName)
              }
              helperText={
                props.touched.projectName && props.errors.projectName
              }
              inputProps={{
                maxLength: 35,
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <AutocompleteInput
              required
              onChange={(event, newValue) => {
                props.values.type=newValue;
                console.log(props.values.type);
              }}
              error={
                props.touched.type &&
                Boolean(props.errors.type)
              }
              options={typeOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} required label="Type of project" />}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            </Grid>

            
            <Grid item xs={12}>
            <AutocompleteInput
              required
              onChange={(event, newValue) => {
                props.values.category=newValue;
                console.log(props.values.category);
              }}
              error={
                props.touched.category &&
                Boolean(props.errors.category)
              }
              options={categoryOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} required label="Category of project" />}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <AutocompleteInput
              multiple
              options={keywordOptions.map((option) => option)}
              freeSolo
              disableCloseOnSelect
              filterSelectedOptions
              onChange={(event, newValue) => {
                props.values.relatedKeywords=newValue;
                console.log(props.values.relatedKeywords);
              }}
              error={
                props.touched.relatedKeywords &&
                Boolean(props.errors.relatedKeywords)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Related domain keywords"
                />
              )}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextInput
              multiline
              rows={4}
              required
              fullWidth
              label="Brief Description"
              name="briefDescription"
              value={props.values.briefDescription}
              onChange={props.handleChange}
              error={
                props.touched.briefDescription &&
                Boolean(props.errors.briefDescription)
              }
              helperText={
                props.touched.briefDescription && props.errors.briefDescription
              }
              inputProps={{
                maxLength: 500,
                style: { color: "#fff" }
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextInput
              multiline
              rows={6}
              required
              fullWidth
              label="Progress and future plans"
              name="progressAndFuture"
              value={props.values.progressAndFuture}
              onChange={props.handleChange}
              error={
                props.touched.progressAndFuture &&
                Boolean(props.errors.progressAndFuture)
              }
              helperText={
                props.touched.progressAndFuture && props.errors.progressAndFuture
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
              options={skillOptions}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Skills" />}
              ListboxProps={{
                style: { color: "#fff" }
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextInput
              required
              fullWidth
              label="Vacancies"
              name="vacancies"
              value={props.values.vacancies}
              onChange={props.handleChange}
              error={
                props.touched.vacancies &&
                Boolean(props.errors.vacancies)
              }
              helperText={
                props.touched.vacancies && props.errors.vacancies
              }
              inputProps={{ maxLength: 3 }}
              
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
            Save Project
          </LoadingButton>
        </Box>
        )}
      </Formik>
       
      </Container>
    </>
  )
  );
}
