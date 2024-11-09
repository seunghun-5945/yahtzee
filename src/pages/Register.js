import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: darkgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 25%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 250px;
  height: 30px;
  border: 1px solid #ccc;
  margin: 10px;
`;
const Button = styled.button`
  width: 250px;
  height: 35px;
  color: white;
  background-color: #007bff;
  border: 1px solid #ccc;
  margin: 10px;
`;

const Register = () => {
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/register",
        {
          name: id,
          password: pw,
        }
      );
      console.log(response.data);
      alert("회원가입 성공");
    } catch (error) {
      console.error("에러남:", error);
      alert("회원가입 실패");
    }
  };

  const handleChangeId = (e) => {
    //e는 이벤트 객체
    setID(e.target.value); // e.target.value 는 input에 입력된 값
    console.log(id); // id는 입력된 값이 저장되는 변수 (보기 위해 console.log로 출력)
  };
  const handleChangePW = (e) => {
    setPW(e.target.value);
    console.log(pw);
  };

  return (
    <Container>
      <Frame>
        <h1>회원가입</h1>
        <Input type="text" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Button onClick={handleRegister}>회원가입</Button>
      </Frame>
    </Container>
  );
};

export default Register;
