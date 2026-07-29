interface buttonProps{
    type?: "button" | "submit" | "reset",
    className?:string,
    text?:string,
    onClick?: ()=>void;
}

export default function Button({type, className, text, onClick}:buttonProps){
    return(
        <>
            <button type={type} className={className} onClick={onClick}>
                {text}
            </button>
        </>
    );
}