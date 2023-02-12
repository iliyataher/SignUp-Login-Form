import { ErrorMessage, FastField } from "formik"

const Textarea = (props)=>{
    const {name , label} = props
    return(
        <>
            <label htmlFor={name} className="my-3 Label">{label}</label>
            <FastField type="text" className="form-control" name={name} as="textarea"/>
            <ErrorMessage name={name}>
                {error=><small className="text-danger">{error}</small>}
            </ErrorMessage>
        </>
    )
}

export default Textarea