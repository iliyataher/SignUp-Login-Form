import { Form, Formik } from "formik"
import FormikControls from "../FormikElement/FormikControl"
import * as Yup from "yup"
import { MyContext } from "./context"
import { useContext, useEffect } from "react"
import 'animate.css';
import { useRef } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import { useState } from "react"

const LoginForm = ()=>{
    const {ShowBoxLogOut,setShowBoxLogOut,ResGetDataFromL,setResGetDataFromL,CheckBox,setCheckBox,ShowLOrS , setShowLOrS , ShowAnimate , setShowAnimate} = useContext(MyContext);
    const FormL = useRef()
    const initialValues={
        phone : '',
        password : '',
        remember : 0
    }
    const onSubmit = (values , submitProps)=>{
        setTimeout(()=>{
            submitProps.setSubmitting(true)
        } , 10)
        submitProps.resetForm()
        axios.post("http://authservice.azhadev.ir/api/auth/login" , values)
        .then(res=>{
            submitProps.setSubmitting(false);
            if(res.status == 203){
                    let MyErrorArray = Object.values(res.data);
                Swal.fire({
                    icon: 'error', 
                    title: " !!!عملیات ناموفق بود",
                    text : `!${MyErrorArray}`
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: "!عملیات با موفقیت انجام شد",
                    text: "عملیات ورود انجام شد",
                  })
                  localStorage.setItem("token" , res.data.token);
                  setShowBoxLogOut(true)
            }
        }).catch(err=>{
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
    })

    

    const HandelShowAnimate = ()=>{

        setShowAnimate(!ShowAnimate);
        if(ShowAnimate){
            FormL.current.className="Form-Login"
                FormL.current.className="Form-Login animate__animated animate__backOutDown"
            setTimeout(()=>{
                FormL.current.className="Form-Login"
            } , 1500)
        }
    }
    const [ShowButtonGDU , setShowButtonGDU] = useState(false);
    useEffect(()=>{
        const GFL = localStorage.getItem("token");
        if(GFL){
            setShowButtonGDU(true)
        }
    } , [])
    
    const HandleGetDataFL = ()=>{
        setShowSpinnerGDFL(true)
        axios.get("http://authservice.azhadev.ir/api/auth/user" , {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>{
            let keys = Object.keys(res.data)
            let values = Object.values(res.data)
            let KeysAndValues = []
            for (let index = 0; index <= 22; index++) {
                KeysAndValues.push(`${keys[index]} : ${values[index]}`)
            }
           setResGetDataFromL(KeysAndValues);
           setShowSpinnerGDFL(false)
        }).catch(err=>{
            setTimeout(() => {
                setShowSpinnerGDFL(false)
            }, 50);
            Swal.fire({
                icon: 'error',
                title:err.message,
                text: "",
            })
        })
    }
    const [ShowSpinnerGDFL , setShowSpinnerGDFL] = useState(false)
    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} validateOnMount>
                {formik=>{
                    formik.values.remember = CheckBox ? 1 : 0 

                    return(
                        <div>
                            <Form className="Form-Login" ref={FormL}>
                            <h1 className="H1">فرم ورود به سایت</h1>‍
                            <div className="Inputs">

                                    <FormikControls control="input" name="phone" icon="fas fa-phone" type="text" placeholder="شماره موبایل" />

                                    <FormikControls control="input" name="password" icon="fas fa-lock" InputClassName="InputPassword3" IconClassName="IconPassword3" type="password" placeholder="رمز عبور" />
                            
                                    <FormikControls control="checkbox" name="remember" label="من را به خاطر بسپار" />
                        </div>
                            <h5 style={{marginTop:"20px"}} className="LinkForm"><a href="#">رمز عبور خود را فراموش کرده اید؟</a></h5>
                            
                        <div className="text-center Box-R">
                            {/* <FormikControls control="radio" name="ReadTheRules" label="قوانین سایت را خوانده ام"/> */}
                        </div>
                        <div className="Buttons">
                            <button type="submit"className="SubmitButton CursorNotAllowed" disabled={formik.isSubmitting}>{formik.isSubmitting ? (<div class="spinner-border text-primary"></div>) : "ورود"}</button>
                            {ShowButtonGDU ? (
                                <button type="button" onClick={HandleGetDataFL} className="GetDataUsertButton">{ShowSpinnerGDFL ? (<div className="spinner-border text-info"></div>) : 'بازیابی اطلاعات ذخیره شده'}</button>
                            ) : (null)}
                        </div>
                        <h5 style={{marginTop:"20px"}} className="LinkForm" ><a href="#" onClick={()=>{setShowLOrS(false);HandelShowAnimate()}}>ساخت حساب کاربری</a></h5>
                    </Form>
                        </div>
                    )
                }}
        </Formik>
    )
}

export default LoginForm