import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    alert(JSON.stringify(values))

  };


//추가 script

function receiveMsgFromParent(e) {
  console.log('NEXA로부터 받은 메시지 ', e.data);
  
  //if (e.origin !== "http://example.org:8080") return;
    
  var txt = document.getElementById("handleFormSubmit");
  var oD = e.data;
  
  if (oD == null || oD == "" || oD==undefined )
    return txt.values = "";
  
  if (typeof oD == "string") {
    txt.value = txt.value + oD + "\n";  
  } else {
    for (var a in oD)
      txt.value = txt.value + a + ":::" + oD[a] + "\n";  
  }
 
}

// // 부모에게 메시지 전달
// function sendMsgToParent() {
//   if(!window.parent) return;
//   var txt = document.getElementById("sendtxt");
//   var msg = txt.value;
//   console.log('Nexa로 보낼 메시지 ', msg );
//   window.parent.postMessage( msg, '*' );
// }

// 부모에게 메시지 전달
function sendMsgToParentObj(values){

 // event.preventDefault();

  axios({
    method:'post',
    post:'http://localhost:8080',
    data: values ,
    withCredentials: true
})  
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});


  if(!window.parent) return;
  // var txt = document.getElementById("sendObject");
  // var msg = txt.values;
  
  // try {
    
  //   var sParam = JSON.parse(values);
    
  // } catch (error) {
  //   console.log('error ==', error.message);
  //   return;
  // } 

   // 👇️ Store a JSON value in local storage
   localStorage.setItem('person', JSON.stringify(values));

   // 👇️ parse the value when accessing it
   const result = JSON.parse(localStorage.getItem('person'));

  // console.log(result);
   //window.parent.postMessage( JSON.parse(result), '*' );
   window.parent.postMessage( result, '*' );
  
 // console.log('부모로 보낼 메시지 : ', values);
 
}

//추가 마지막


  return (
    <Box m="20px">
      <Header title="ADD USER" subtitle="Create a new profile for all uses" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={sendMsgToParentObj(values)}>
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;