import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: salmon;
  background: linear-gradient(to right, green, blue);
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
`

const Button = styled.button`
  width: 300px;
  height: 40px;
  border-radius: 10px;
`

const Register = () => {

  const[id,setID] = useState("");
  const[pw,setPW] = useState(""); 
  const[IdError,setIdError] = useState("");
  const[PwError, setPwError] = useState("");
  const navigate = useNavigate();

  const backendRegister = async () => {
    // 공백 및 에러가 있는 경우 회원가입 막기
    if (!id || !pw || IdError || PwError) {
      alert("아이디와 비밀번호를 올바르게 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/register", {
        "name": id,
        "password": pw,
      })
      console.log(response);
      alert("회원가입 성공");
      navigate("/LogIn");
    }
    catch(error) {
      console.log("에러남:", error);
      alert("회원가입 실패");
    }
  }

  useEffect(() => {
    const idTest = async () => {
      try {
        const response = await axios.post("https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/alreadyusingname", {
          "name": id
        })
        console.log(response.data);
        
        if(response.data == true) {
          console.log("아이디가 중복됩니다");
          setIdError('아이디가 중복됩니다.');
        }
        else {
          console.log();
        }
      }
      catch(error) {
        console.log("에러남:", error);
        alert("로그인 실패");
      }
    }
    idTest();  
  }, [id])

  const handleChangeId = (e) => {
    const newId = e.target.value;
    setID(newId);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newId) {
      setIdError("아이디를 입력하세요.");
    } else if (!emailPattern.test(newId)) {
      setIdError("유효한 이메일 주소를 입력하세요.");
    } else {
      setIdError("");
    }
  };

  const handleChangePW = (e) => {
    const newPw = e.target.value;
    setPW(newPw);

    if (!newPw) {
      setPwError("비밀번호를 입력하세요.");
    } else if (/\s/.test(newPw)) {
      setPwError("비밀번호에 공백이 포함될 수 없습니다.");
    } else {
      setPwError("");
    }
  };

  return (
  <Container>
   <Frame>
    <h1>회원가입</h1>
  <h4 style={{
    width: "80%",
    height: "30px" 
  }}>아이디 <span style={{color:'red'}}>*</span></h4>
  <Input
  type="text"
  placeholder=" E-mail"
  onChange={handleChangeId}
  /> 
  <div style={{
    width: "80%",
    height: "20px",
    color: "red"
  }}>{IdError}</div>
  <br/>
  <h4 style={{
    width: "80%",
    height: "30px" 
  }}>비밀번호 <span style={{color:'red'}}>*</span></h4>
  <Input
  placeholder=" 비밀번호"
  onChange={handleChangePW}
  />
  <br/><br/><br/>
  <Button
  onClick={backendRegister}
  >회원가입</Button>
   </Frame>
  </Container>
  );
};

export default Register;