import { useState } from "react"
import BottomWarning from "../Components/BottomWarning"
import Button from "../Components/Button"
import Heading from "../Components/Heading"
import InputBox from "../Components/InputBox"
import SubHeading from "../Components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


 const SignIn = () => {

  const navigate = useNavigate();
  const [detail,setDetail] = useState({
    username:"",
    password:""
  })


  const handleInputChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:3000/api/v1/user/signin",detail);
      console.log(response.data);
      localStorage.setItem("token",response.data.token)
      navigate("/")
      
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  console.log(detail)

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={handleInputChange} name="username"  placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={handleInputChange} name="password" placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button  onClick={handleButtonClick} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default SignIn