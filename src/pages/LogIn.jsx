import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: salmon;
`;

const Frame = styled.div`
  width: 25%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  border-radius: 10px;
`


const LogIn = () =>{

const[id,setID] = useState("");
const[pw,setPW] = useState("");
const[IdError,setIdError] = useState("");
const[PwError,setPwError] = useState("");
const navigate = useNavigate();

const testID = 1234
const testPW = 1234

const backendLogin = async () => {
  try {
    const response = await axios.post("https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/login", {
      "name": id,
      "password": pw,
    })
    console.log(response);
    setIdError('');
    setPwError('');
    alert("로그인 성공");
    localStorage.setItem('userId', id) // 키와 값을 명확히 지정
    navigate("/");
  }
  catch(error) {
    console.log("에러남:", error);
    alert("로그인 실패");
  }
}



const handleChangeId = (e) => {
  setID(e.target.value);
  console.log(id);
}
const handleChangePW = (e) => {
  setPW(e.target.value);
  console.log(pw);
}

  useEffect(()=>{
    if(id.length < 10){
      setIdError("아이디가 10자 이하입니다.");
    }else{
      setIdError('');
    }

  },[id]);
  return (
  <Container>
    <Frame>
    <h1>로그인하세요</h1>
    <br/><br/>
  <Input
    type="text"
    placeholder=" E-mail"
    onChange={handleChangeId}
  />
  <div style={{
    width: "60%",
    height: "20px", 
    color: "red" 
  }}>{IdError}</div>
  <br/>
  <Input
    type="password"
    placeholder=" 비밀번호"
    onChange={handleChangePW}
  />
  <div style={{
    width: "80%",
    height: "20px",
    color: "red" 
  }}>{PwError}</div>
  <br/><br/>
  <div></div>

  <Link to="/Register">
    <span>회원가입</span>
  </Link>

  <Button
    onClick={backendLogin}
    >로그인</Button>
    </Frame>
  </Container>
  )
}

export default LogIn;