import { useEffect, useState } from "react";
import AppBar from "../Components/AppBar";
import Balance from "../Components/Balance";
import { Users } from "../Components/Users";
import axios from "axios";

const DashBoard = () => {

  const [value , setValue] = useState(""); 
  useEffect(()=>{
    fetchBalance();
  },[])

  const fetchBalance = async ()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
           Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data ,"balance")
      setValue(response.data.balance)
    } catch(error) {
      console.log(error.message)
    }
  }

  

  return (
    <div>
      <AppBar />
      <div className="my-6">
        <Balance value={value} />
      </div>
      <Users />
    </div>
  );
};

export default DashBoard;
