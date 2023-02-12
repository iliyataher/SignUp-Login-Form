import axios from "axios";
import React, { createRef, useState } from "react"
import Swal from "sweetalert2";
import { MyContext } from "./context";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const App = ()=>{
    const [ShowLOrS , setShowLOrS] = useState(false);
    const [ShowAnimate , setShowAnimate] = useState(false);
    const [CheckBox , setCheckBox] = useState(false)
    const [ResGetDataFromL , setResGetDataFromL] = useState([]);
    console.log(ResGetDataFromL);
    const BoxGetDFL = createRef()
    const HideBoxShowResForL = ()=>{
        BoxGetDFL.current.className="BoxShowResultForL animate__animated animate__backOutDown";
        setTimeout(()=>{
            setResGetDataFromL([]);
            BoxGetDFL.current.className="BoxShowResultForL"
        } , 1000)
    }
    const HandleGuidance = ()=>{
        Swal.fire({
            title: ': قابلیت های پروژه',
            text:"صفحه ورود و ثبت نام در یک صفحه,بررسی ورودی های وارد شده به صورت دقیق,نمایش آلرت در هنگام ورود و ثبت نام و هنگام بروز ارور,نمایش مقدار فیلد های پسورد و عدم نمایش آن با آیکون کنار آن,هنگام ورود کاربر به صورت خودکار در لوکال استوریج ذخیره می شود و بعد از رفرش می توان اطلاعات کاربر ذخیره شده را نمایش داد .و بعد از لاگین توانایی خروج از حساب لاگین شده هست.امیدوارم خوشتون اومده باشه🌹ه((لطفا به اینترنت متصل باشید تا آیکون ها نمایش داده شود))",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            backdrop: `
            rgba(0,221,255,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
          })
    }
    const [ShowBoxLogOut , setShowBoxLogOut] = useState(false);
    const [ShowSpinnerBoxLogOut , setShowSpinnerBoxLogOut] = useState(false)
    const HandleLogOut = ()=>{
        setShowSpinnerBoxLogOut(true)
        const TokenUser = localStorage.getItem("token")
        axios.get("http://authservice.azhadev.ir/api/auth/logout" , {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>{
            setShowSpinnerBoxLogOut(false)
            Swal.fire({
                icon: 'success',
                title:"عملیات با موفقیت انجام شد",
                text: res.message,
            })
            setShowBoxLogOut(false)
        }).catch(err=>{
            setShowSpinnerBoxLogOut(false)
            Swal.fire({
                icon: 'error',
                title:err.message,
                text: "",
            })
        })
    }
    return(
        <div className="Container">
            {ShowBoxLogOut ? (
                <div className="Success-Login">
                    <div>
                    <span></span>
                    <h5 onClick={HandleLogOut}>{ShowSpinnerBoxLogOut ? (<div className="spinner-border text-info" style={{fontSize:"30px"}}></div>) : "خروج از حساب"}</h5>
                    </div>
                </div>
            ) : null}
            <span className="fas fa-question Question-Icon text-info" onClick={HandleGuidance}></span>
            <div className="Box-Form">
                <div className="Box-Form-D">
                    <MyContext.Provider value={{ShowBoxLogOut,setShowBoxLogOut,ResGetDataFromL,setResGetDataFromL,CheckBox,setCheckBox,ShowLOrS , setShowLOrS , ShowAnimate , setShowAnimate}}>
                        <SignUpForm/>
                        <LoginForm/>
                    </MyContext.Provider>
                </div>
                <div className="Box-image" style={ShowLOrS ? {left:"50%", transition:"all ease 300ms"} : null}></div>
                {
                    ResGetDataFromL.length ? (
                        <div ref={BoxGetDFL} className="BoxShowResultForL">
                            <span className="fas fa-times Times" onClick={()=>{HideBoxShowResForL()}}></span>
                            <form>
                                <ul>
                                    {ResGetDataFromL.map((r)=>(
                                        <li>{r}</li>
                                    ))}
                                </ul>
                            </form>
                        </div>
                    ) : null
                }        
            </div>
        </div>
    )
}

export default App