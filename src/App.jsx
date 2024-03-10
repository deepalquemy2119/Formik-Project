import React, { useRef, useEffect } from 'react'
import * as Yup from 'yup'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import {Form, Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import './App.css'

function App() {
  //const [use, setUse] =  useState(1)
  const buttonRef = useRef(null)

  // podemos usarlo para traer cosas del Back. 
  // useEffect, Es asincronico
  // useEffect(() => {
  //   console.log(use);
  //   setUse(2)
  //   console.log(use);
  // }, [])

  useEffect(() => {
    const pepe = buttonRef.current;
    console.log(pepe);
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      email:'',
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre Obligatorio..!!'),
      email: Yup.string().email('Email NO valido..!!').required('Como te voy a mandar sino emails'),
      password: Yup.string().required('Sin ella es publica la cuenta..!!').oneOf([Yup.ref('repeatPassword')], 'Las contraseñas NO son IGUALES...!!!'),
      repeatPassword: Yup.string().required('Vamos cabezón...!!!').oneOf([Yup.ref('password')], 'Las contraseñas NO son IGUALES...!!!'),
    }),


    onSubmit:(formData) =>{
      console.log('Soy el FORMdata ---> ' ,formData);
    }
  });

  return (
    <>

      {/* <h3>{use}</h3> */}
      <h3>Formulario Registro</h3>

      <Form className='formulario' onSubmit={formik.handleSubmit} >
      <Form.Input type='text' placeholder= 'Nombre y Apellido' name= 'name' onChange={formik.handleChange} error={formik.errors.name} value={formik.values.name}/>
      <Form.Input type='email' placeholder= 'Email' name= 'email' onChange={formik.handleChange} error={formik.errors.email} value={formik.values.email}/>
      <Form.Input type='password' placeholder= 'Password' name= 'password' onChange={formik.handleChange} error={formik.errors.password} value={formik.values.password}/>
      <Form.Input type='password' placeholder= 'Password' name='repeatPassword' onChange={formik.handleChange} error={formik.errors.repeatPassword} value={formik.values.repeatPassword}/>

          <Button   type='submit' >Registro</Button>
          <Button  type='button' onClick={formik.handleReset}>Limpiar Formulario</Button>
      </Form>
    </>
  )
}

export default App
