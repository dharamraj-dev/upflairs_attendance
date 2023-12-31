import React, { useState } from "react";
import './mix.css';
import { NavLink } from "react-router-dom";

const Register = ()=>{

    const [passshow, setpassshow] = useState(false)
    const [cpassshow, csetpassshow] = useState(false)

    const [inpval, setinpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    // console.log(inpval)
    const setval = async(e)=>{
        // console.log(e.target.value)

        const {name, value} = e.target;

        setinpval(()=>{
            return{
                ...inpval,
                [name]: value
            }
        })
    }

    const addData = async (e)=>{
        e.preventDefault();
        const {fname, email, password, cpassword} = inpval;
        if(fname === ""){
            alert("Please enter Name")
        }else if(email === ""){
            alert("Please enter Email")
        }else if(password === ""){
            alert("Please enter Password")
        }else if(password.length < 6){
            alert("Atleast password length is 6 Character")
        }else if(cpassword === ""){
            alert("Please enter Confirm Password")
        }else if(cpassword.length < 6){
            alert("Atleast password length is 6 Character")
        }else if(password !== cpassword){
            alert("Password and Confirm password are not match")
        }else{
            // alert("Doneee")  
            const data = await fetch("http://localhost:5001/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            console.log(res)

            if(res.status === 201){
                alert("Register Successful")
                setinpval({
                    ...inpval,fname:"", email:"", password:"", cpassword:""
                })
            }
        }
    }

    return(
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p>Please fill this empty fields</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="name" value={inpval.fname} onChange={setval} name="fname" id="name" placeholder="Enter Your Name" />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setval} name="email" id="email" placeholder="Enter Your Email Address" />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passshow ? "password" : "text"} value={inpval.password} onChange={setval} name="password" id="password" placeholder="Enter Your Password" />
                                <div className="showpass" onClick={()=>setpassshow(!passshow)}>
                                    {!passshow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassshow ? "password" : "text"} value={inpval.cpassword} onChange={setval} name="cpassword" id="cpassword" placeholder="Confirm Password" />
                                <div className="showpass" onClick={()=>csetpassshow(!cpassshow)}>
                                    {!cpassshow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={addData}>Sign Up</button>
                        <p>Already Have an Account? <NavLink to='/'>Login</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register;
