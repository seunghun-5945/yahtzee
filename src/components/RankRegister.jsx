import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

const Container = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #4CAF50;
  color: white;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;

  &:hover:not(:disabled) {
    background-color: #da190b;
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  color: #666;
  font-size: 14px;
`;

const RankRegister = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateData = () => {
    const userId = localStorage.getItem("userId");
    const userScore = localStorage.getItem("userScore");

    if (!userId || !userScore) {
      alert("필요한 데이터가 없습니다.");
      return false;
    }

    if (isNaN(userScore)) {
      alert("올바른 점수 형식이 아닙니다.");
      return false;
    }

    return true;
  };

  const updateRank = async () => {
    if (!validateData()) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/update",
        {
          name: localStorage.getItem("userId"),
          score: localStorage.getItem("userScore"),
        }
      );

      if (response.data) {
        alert("점수가 성공적으로 등록되었습니다!");
        onClose?.();
        navigate("/Ranking");
      }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || "점수 등록 중 오류가 발생했습니다.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <Container>
        <Title>점수를 등록하시겠습니까?</Title>
        
        <ButtonContainer>
          <ConfirmButton 
            onClick={updateRank}
            disabled={isLoading}
          >
            {isLoading ? "등록 중..." : "예"}
          </ConfirmButton>
          
          <CancelButton 
            onClick={onClose}
            disabled={isLoading}
          >
            아니오
          </CancelButton>
        </ButtonContainer>

        {isLoading && (
          <LoadingText>점수를 등록하고 있습니다...</LoadingText>
        )}
      </Container>
    </>
  );
};

export default RankRegister;