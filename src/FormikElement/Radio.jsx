import { FastField, Field } from "formik";
import { Fragment } from "react";
const Radio = (props)=>{
    const {name , options , label} = props
    return(
        <div> 
            {/* <label htmlFor="">{label}</label>
            <Field name={name}>
                {({field})=>{
                    console.log(field);
                    return options.map((o)=>(
                        <Fragment key={o.id}>
                            <div>
                                <input type="radio" id={o.id} {...field} value={o.id} checked={field.value == o.id} />
                                <label htmlFor={o.id}>{o.value}</label>
                            </div>
                        </Fragment>
                    ))
                }}
            </Field> */}
        </div>
    )
}

export default Radio;