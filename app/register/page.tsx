"use client";
import {useRouter} from 'next/navigation';
import Input from '../../components/Input';
import Link from 'next/link';
import Button from '../../components/Button';
import '../../styles/register.css';
import {useState} from 'react';

export default function register(){
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const router = useRouter();

  const handleRegistro = async(e:React.FormEvent)=>{
    try{
      const response = await fetch("/api/register",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nombre, apellido, correo, contraseña}),
      });
      const data = await response.json();

      if(!response){
        setMensaje(data.message);
        return;
      }
      alert("Usuario registrado con exito!");
      router.push("/");
    }
    catch(error){
      setMensaje("Hubo un problema con el servidor...");
    }

  }
  

    return(
        <>
         <div className="container">
        <div className="left">
          <h1>Bienvenido a Nova!</h1>
          <h2>Gestiona a tus alumnos con confianza!</h2>
         
          <p className="autor">
            Un producto de Astrosoft.
          </p>
          <div className="cont-mensaje">
            <p className="mensaje"> {mensaje}</p>
          </div>
        </div>
        <div className="right">
            <div className="login">
              <form onSubmit={handleRegistro} className="login-form">
                <label htmlFor="Nombre"> Nombre:</label>
                <Input id="Nombre" type="text" label="Juan" onChange={(e)=>setNombre(e.target.value)} />
                <label htmlFor="Apellido"  > Apellido:</label>
                <Input type="text" label="López" onChange={(e)=>setApellido(e.target.value)} />
                <label className="label-form" htmlFor="Correo">Correo: </label>
                <Input id="Correo" type="email" label="juan@example.com" onChange={(e)=>setCorreo(e.target.value)} />
                <label className="label-form" htmlFor="Contraseña"> Contraseña:</label>
                <Input id="Contraseña" type="password" label="******" onChange={(e)=>setContraseña(e.target.value)} />
                <Link className="link" href="/"> ¿Ya tiene una cuenta? Inicie Sesión aquí</Link>
                <Button className="btn-log" text="Iniciar Sesión" type="submit" />
              </form>
            </div>
          </div>
     </div>
        </>
    );
}