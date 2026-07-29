interface TablaAlumnosProps{
    className?:string,
}




export default function TablaAlumnos({className}:TablaAlumnosProps){
    return(
        <>
            <table className={className}>
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
            </table>
        </>
    );
}