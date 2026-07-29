"use client";
import Input from "../components/Input";
import Link from "next/link";
import Button from '../components/Button';
import '../styles/login.css';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Index(){

  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const router = useRouter();

  const handleLogin = async(e:React.FormEvent)=>{
    const response = await fetch('/api/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({correo, contraseña}),
    });
    const data = await response.json();
    if(!response){
      setMensaje(data.message);
      alert(mensaje);
    }


  };

  return(
    <>
     <div className="container">
        <div className="left">
          <h1>Bienvenido a Nova!</h1>
          <h2>Gestiona a tus alumnos con confianza!</h2>
          <br></br>
          <p className="autor">
            Un producto de Astrosoft.
          </p>
        </div>
        <div className="right">
            <div className="login">
              <form action="" className="login-form">
                <label className="label-form" htmlFor="Correo">Correo: </label>
                <Input id="Correo" type="email" label="juan@example.com"/>
                <label className="label-form" htmlFor="Contraseña"> Contraseña:</label>
                <Input id="Contraseña" type="password" label="******" />
                <Link className="link" href="/register"> ¿No está registrado? Registrese aquí</Link>
                <Button className="btn-log" text="Iniciar Sesión" type="button" />
              </form>
            </div>
          </div>
     </div>
    </>
  );
}