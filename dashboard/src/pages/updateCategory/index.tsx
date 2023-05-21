import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Link, Box, ThemeProvider, Container, createTheme, Avatar, CssBaseline, Switch } from '@mui/material';
import { Field, Formik } from 'formik';
import { UpdateCategorySchema } from './validation';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { getSelectedCategory } from '../../services/api-category-service';

const initialValues = { id: "", name: "", description: "" };

const theme = createTheme();


const UpdateCourse: React.FC = () => {
  
  
  const selectedCategory = getSelectedCategory();
  const navigate = useNavigate();
  const {DeleteCategory, UpdateCategory} = useActions();

  if(selectedCategory == null)
  {
    navigate("/dashboard/categories");
  }
  const updateCategory = JSON.parse(selectedCategory);
  console.log("updateCategory: ", updateCategory);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const model = {
      Id: data.get("id"),
      Name: data.get("name"),
      Description: data.get("description"),
    };
    UpdateCategory(model);
    navigate("/dashboard/categories");
    window.location.reload();
  };
  

  const dangerZoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DeleteCategory(updateCategory.id);
    navigate("/dashboard/categories");
    window.location.reload();
  };
 
  initialValues.id = updateCategory.id;
  initialValues.name = updateCategory.name;
  initialValues.description = updateCategory.description;
   
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <CssBaseline />
        <Box
          sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          border: "2px white solid",
          borderRadius: "15px",
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateCategorySchema}
          onSubmit={() => {}}>
          {({ errors, touched, isSubmitting, isValid, dirty }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{m:"auto", width: "95%", mb:2}}
            >
                

                <Grid
                  sx={{padding:0, display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center" }}>
                    <Typography component="h1" variant="h5" sx={{mt:2, fontWeight: "500"}}>
                        Update profile
                    </Typography>
                  <Grid sx={{width:"100%"}}>
                  <Field
                      margin="normal"
                      id="id"
                      name="id"
                      type="hidden"
                      value={updateCategory.id}
                    />
                  </Grid>
                  <Grid sx={{width:"60%"}}>
                  <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Name"
                      name="name"
                      type="text"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red", width:"45%", float:"left" }}>{errors.name}</div>
                    ) : null}
                  </Grid> 
                  <Grid sx={{width:"60%"}}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="description"
                      label="Description"
                      type="text"
                    />
                    </Grid>
    
                  <Grid sx={{width: "45%"}}>
                    <Button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ my:4}}
                    >
                      {isSubmitting ? "Loading" : "Edit"}
                    </Button>
                  </Grid>
                </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>

        <Container maxWidth={false}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "#d32f2f 3px solid",
              background: "white", 
              borderRadius: "15px"
            }}>
              <Formik
              initialValues={initialValues}
              onSubmit={() => {}}>
                <Box
                  component="form"
                  onSubmit={dangerZoneSubmit}
                  noValidate
                  sx={{m:"auto", width: "95%", mb:2}}
                >
                
                <Grid
                    sx={{display:"flex", justifyContent:"space-around", flexDirection:"column", alignItems:"center" }}
                >
                
                <Typography component="h1" variant="h5" sx={{my:3, color:"#d32f2f", fontWeight: "500"}}>
                  Danger Zone
                </Typography>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="error"
                      sx={{ width:"45%", my:4}}
                    >
                      Delete
                </Button>
                </Grid> 
                </Box>
              </Formik>
          </Box>
        </Container>                 
      </ThemeProvider>
    );
  return <></>
}
export default UpdateCourse;