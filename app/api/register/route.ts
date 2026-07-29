import {NextResponse} from 'next/server';
import {query} from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request:Request){
    try{
        const {nombre, apellido, correo, contraseña} = await request.json();

        if(!nombre || !apellido || !correo || !contraseña){
            return NextResponse.json({message:"Todos los campos son requeridos"}, {status:400});

        }
        const correoLimpio = correo.trim().toLowerCase();
        if(contraseña.length<8){
            return NextResponse.json({message:"Tu contraseña debe ser de al menos 8 caracteres"},{status:400});
        }

        //Validar correo
        const queryValidar = "SELECT id_profesor FROM profesores WHERE correo = ? LIMIT 1";
        const usuarioExiste:any = await query(queryValidar,[correoLimpio]);

        if(usuarioExiste.length>0){
            return NextResponse.json({message:"Este correo ya se encuentra en uso."}, {status:400});
        }
     
      
        const hash = await bcrypt.hash(contraseña, 10);

        const queryInsert = "INSERT INTO profesores(nombre, apellido, correo, contraseña) VALUES(?,?,?,?)";
        const nuevoUsuario = await query(queryInsert,[nombre, apellido, correoLimpio, hash]);

        return NextResponse.json({message:"Usuario registrado con exito"},{status:201});
    }
    catch(error){
        console.error("Error al registrar usuario", error);
        return NextResponse.json({message:"Error al registrar"},{status:500});
    }
}