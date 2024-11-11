import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;

const Frame = styled.div`
  width: 500px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
`;

const RowFrame = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid black;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RankNumber = styled.span`
  font-weight: bold;
`;

const Nickname = styled.span`
  flex: 1;
  text-align: center;
`;

const Score = styled.span`
  font-weight: bold;
`;

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(
          "https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/ranking",
          {
            method: 'POST'
          }
        );
        const data = await response.json();
        console.log(data);
        setRankings(data);
      } catch (error) {
        console.log("에러발생함:", error);
      }
    };
    fetchRankings();
  }, []);

  return (
    <Container>
      <Frame>
        <Title>랭킹</Title>
        {Array.isArray(rankings) && rankings.map((rankItem, index) => (
          <RowFrame key={index}>
            <RankNumber>{index + 1}위</RankNumber>
            <Nickname>{rankItem.name || '사용자'}</Nickname>
            <Score>{rankItem.score || 0}점</Score>
          </RowFrame>
        ))}
      </Frame>
    </Container>
  );
};

export default Ranking;