import {NextResponse} from 'next/server';
import {query} from '@/lib/db';
import bcrypt from 'bcryptjs';
import {cookies} from 'next/headers';
import {SignJWT} from 'jose';

export async function POST(request:Request){
    try{
        const {correo, contraseña} = await request.json();
        
        if(!correo || !contraseña){
            return NextResponse.json({message:"Todos los campos son requeridos"},{status:400});

        }
        const correoLimpio = correo.trim().toLowerCase();
        const queryValidar = "SELECT id_profesor, nombre, apellido, correo, contraseña FROM profesores WHERE correo = ?";
        const response:any = await query(queryValidar,[correoLimpio]);
        
        if(response.length ===0){
            return NextResponse.json({message:"Usuario no esta registrado"}, {status:400});

        }

        const usuario = response[0];

        const validarContraseña = await bcrypt.compare(contraseña, usuario.contraseña);

        if(!validarContraseña){
            return NextResponse.json({message:"Contraseña Incorrecta"}, {status:400});
        }

        const payload = {
            id: usuario.id_profesor,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo
        }

        //Crear token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new SignJWT(payload)
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret);

        //Guardar cookie de inicio de sesion
        const cookieStore = await cookies();
        cookieStore.set('nova_session', token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 2,
            path: '/'
        });
        return NextResponse.json({ message: "Inicio de sesión exitoso" }, { status: 200 });
    }
    catch(error){
        console.error("Error en inicio de sesión:", error);
        return NextResponse.json({ message: "Error interno del servidor al iniciar sesión" }, { status: 500 });
    }
}