interface headerProps{
    profesor?:string,
    
}

export default function Header({profesor}:headerProps){
    return(
        <>
            <header>
                <h1>Bienvenido a Nova {profesor} </h1>
            </header>
        </>
    );
}