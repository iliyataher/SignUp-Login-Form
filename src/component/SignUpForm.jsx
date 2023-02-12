import { Form, Formik } from "formik";
import FormikControls from "../FormikElement/FormikControl";
import * as Yup from "yup"
import Swal from 'sweetalert2'
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./context";
import { useRef } from "react";
import axios from "axios";
const SignUpForm = ()=>{
    const initialValues={
        phone : '',
        password : '',
        c_password : '',
    }      
    const [Error , setError] = useState(false)
    const onSubmit = (values , submitProps)=>{
        setTimeout(()=>{
            submitProps.setSubmitting(true)
        } , 10)

        submitProps.resetForm()
        axios.post("http://authservice.azhadev.ir/api/auth/register" , values)
        .then(res=>{
            submitProps.setSubmitting(false)
            if(res.status == 202){
                    let MyErrorArray = Object.values(res.data);
                Swal.fire({
                    icon: 'error', 
                    title: "!!!عملیات ناموفق بود",
                    text : `!${MyErrorArray}`
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: "!عملیات با موفقیت انجام شد",
                    text: "ثبت نام در سایت انجام شد",
                  })
            }
        }).catch(err=>{
            // setError(true)
            setTimeout(() => {
                submitProps.setSubmitting(false)
            }, 50);
            Swal.fire({
                icon: 'error',
                title:err.message,
                text: "",
              })
        })
    }
    const validationSchema = Yup.object({      
        phone: Yup.string().required("لطفا این بخش را پر کنید").matches(/^(?=.*[0-9])(?=.{11,})/ , "شماره موبایل باید حداقل و حداکثر 11 کاراکتر باشد و فقظ اعداد قابل قبول است"),
        password : Yup.string().required("لطفا این بخش را پر کنید").min(8 ,  "حداقل 8 کاراکتر وارد کنید"),
        c_password : Yup.string().required("لطفا این بخش را پر کنید").oneOf([Yup.ref('password'), null], "رمز عبور وارد شده با رمز اولیه مطابقت ندارد"),
    })

    const {ShowLOrS , setShowLOrS , ShowAnimate , setShowAnimate} = useContext(MyContext);
    const FormS = useRef();

    const HandelShowAnimate = ()=>{

        setShowAnimate(!ShowAnimate);
        if(!ShowAnimate){
            FormS.current.className="Form-SignUp"
                FormS.current.className="Form-SignUp animate__animated animate__backOutDown"
            setTimeout(()=>{
                FormS.current.className="Form-SignUp"
            } , 1500)
            // 'Form-SignUp animate__animated animate__backOutDown'

        }
    }

    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} validateOnMount>
        {formik=>{
            return(
                <div>
                    <Form ref={FormS} className="Form-SignUp">
                        <h1 className="H1">فرم ثبت نام در سایت</h1>‍
                        <div className="Inputs">
    
                            <FormikControls control="input" name="phone" icon="fas fa-phone" type="text" placeholder="شماره موبایل" />

                            <FormikControls control="input" name="password" icon="fas fa-lock" InputClassName="InputPassword1" IconClassName="IconPassword1" type="password" placeholder="رمز عبور" />
                             
                            <FormikControls control="input" name="c_password" icon="fas fa-lock" InputClassName="InputPassword2" IconClassName="IconPassword2" type="password" placeholder="تایید رمز عبور" />

                        </div>
                            <h5 style={{marginTop:"20px"}} className="LinkForm"><a href="#">رمز عبور خود را فراموش کرده اید؟</a></h5>
                            
                        <div className="text-center Box-R">
                            <FormikControls control="radio" name="ReadTheRules" label="قوانین سایت را خوانده ام"/>
                        </div>
                        <div className="Buttons">
                            <button type="submit" className={`SubmitButton  CursorNotAllowed`} disabled={formik.isSubmitting} >{formik.isSubmitting ? (<div className="spinner-border text-info"></div>) : "ثبت نام"}</button>
                        </div>
                        <h5 style={{marginTop:"20px"}}  className="LinkForm"><a href="#" onClick={()=>{setShowLOrS(true);HandelShowAnimate()}}>!قبلا ثبت نام کرده ام</a></h5>
                    </Form>
                </div>
            )
        }}
    </Formik>
    )
}

export default SignUpForm;