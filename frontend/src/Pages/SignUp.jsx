import { useState } from "react";
import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [detail, setDetail] = useState({
    username: "",
    firstName: "",
    password: "",
    lastName: "",
  });
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", detail);
      console.log(response.data);
      localStorage.setItem("token",response.data.token)
      navigate("/")
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  console.log(detail)

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={handleInputChange}
            name="firstName"
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={handleInputChange}
            name="lastName"
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={handleInputChange}
            name="username"
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputBox
            onChange={handleInputChange}
            name="password"
            label={"Password"}
            placeholder={"123456"}
          />
          <Button label={"Sign up"} onClick={handleButtonClick} />
          <BottomWarning
            label={"Already have an account?"}
            to={"/signin"}
            buttonText={"Sign in"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
