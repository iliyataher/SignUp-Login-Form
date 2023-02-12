import { ErrorMessage, FastField } from "formik"

const Select = (props)=>{
    const {label , name , options} = props
    return(
        <div className="Select">
            <label className="Label" htmlFor={name}>{label}</label>
            <FastField name={name} as="select" className="form-control" >
                {options.map((i)=>(
                    <option key={i.id} value={i.id}>{i.value}</option>
                ))}
            </FastField>
            <ErrorMessage name={name} />
                {/* {error=><small className="text-danger">{error}</small>} */}
        </div>
    )
}

export default Select;