import { ErrorMessage } from "formik"

const File = (props)=>{
    const {name , type , placeholder , icon , formik} = props
    return(
        <div className="text-center Inputs-item">
            <div>
                {/* Input For */}
                <input value={formik.values[name] ? formik.values[name].name :""} className="Input InputForFileInput" type="text" placeholder={placeholder} name={name}/>
                {/* Input back */}
                <input className="FileInput" type={type}  name={name} onChange={e=>{
                    formik.setFieldValue(name , e.target.files[0])
                }} />

                <span className={icon}>icon</span>
            </div>
            <ErrorMessage name={name}>
                {error=><small className="text-danger">{error}</small>}
            </ErrorMessage>
        </div>
    )
}

export default File