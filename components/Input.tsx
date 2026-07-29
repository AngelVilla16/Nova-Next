
interface inputProps{
    label?:string,
    type?: string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    id?: string,
    checked?: boolean,
    value?: string
}

export default function Input({checked, id,label, type, onChange, value}:inputProps){
    return(
        <>
         <input placeholder={label} type={type} checked={checked} id={id} onChange={onChange} value={value} />
          
        </>
    );
}