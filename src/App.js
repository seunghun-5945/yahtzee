import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: darkslategrey;
`;

const Frame = styled.div`
  width: 25%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: darkred;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 250px;
  height: 30px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 250px;
  height: 35px;
  color: white;
  background-color: #007bff;
  border: 1px solid #ccc;
`;
const Text = styled.div`
  font-family: "Lobster", cursive;
  font-size: 30px;
  color: white;
`;

const Text1 = styled.div`
  font-size: 13px;
  color: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text2 = styled.div`
  font-size: 14px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [IdError, setIdError] = useState("");
  const [PwError, setPwError] = useState("");

  const testID = 1234;
  const testPW = 1234;

  const backendLogin = async () => {
    try {
      const response = await axios.post(
        "https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/login",
        {
          name: id,
          password: pw,
        }
      );
      console.log(response);
      alert("로그인 성공");
    } catch (error) {
      console.log("에러남:", error);
      alert("로그인 실패");
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

  const Login = () => {
    setIdError("");
    setPwError("");

    if (id == testID && pw == testPW) {
      alert("로그인 성공");
    } else if (id == testID && pw != testPW) {
      setPwError("비밀번호 일치하지 않음");
    } else if (id != testID && pw == testPW) {
      setIdError("아이디 일치하지 않음");
    } else {
      setIdError("아이디 일치하지 않음");
      setPwError("비밀번호 일치하지 않음");
    }
  };

  return (
    <Container>
      <Frame>
        <Text>Yacht </Text>
        <br />
        <br />
        <Input type="id" placeholder="이메일" onChange={handleChangeId} />
        <div
          style={{
            width: "82%",
            height: "10px",
            color: "red",
          }}
        >
          <h6>{IdError}</h6>
        </div>
        <br />
        <Input
          type="password"
          placeholder=" 비밀번호"
          onChange={handleChangePW}
        />
        <div
          style={{
            width: "82%",
            height: "10px",
            color: "red",
          }}
        >
          {PwError}
        </div>
        <br />
        <div></div>
        <Button onClick={backendLogin}>로그인</Button>
        <br></br>
        <Text1>ㅡㅡㅡㅡㅡㅡㅡㅡ 또는 ㅡㅡㅡㅡㅡㅡㅡㅡ</Text1>
        <br></br>
        <br></br>
        <Link to="/Register">
          <Text2>계정이 없으신가요? </Text2>
        </Link>
      </Frame>
    </Container>
  );
};

export default App;
