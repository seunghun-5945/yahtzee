import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import RankRegister from "./RankRegister";

const Container = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RowBoxContainer = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  border-bottom: 1px solid ligtgray;
`;

const TagBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
`;

const UserNameArea = styled.button`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  background-color: white;
  cursor: pointer;
  box-sizing: border-box;
`;

const EnemyNameArea = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
`;

const RowBox = ({ tagName, userName, enemyName, onClick }) => {

  return (
    <RowBoxContainer>
      <TagBox>{tagName}</TagBox>
      <UserNameArea onClick={onClick}>{userName}</UserNameArea>
      <EnemyNameArea>{enemyName}</EnemyNameArea>
    </RowBoxContainer>
  );
};

const Table = ({ DiceResult, playerCnt, setPlayerCnt }) => {
  const [ones, setOnes] = useState();
  const [twos, setTwos] = useState();
  const [threes, setThrees] = useState();
  const [fours, setFours] = useState();
  const [fives, setFives] = useState();
  const [sixes, setSixes] = useState();
  const [tok,setToK] = useState();
  const [fok, setFoK] = useState();
  const [fullHouse, setFullHouse] = useState( );
  const [smallStraight, setSmallStraight] = useState( );
  const [largeStragiht, setLargeStraight] = useState( );
  const [chance, setChance] = useState( );
  const [yhatzee, setYhatzee] = useState( );
  const [total, setTotal] = useState( );
  const [roundCnt, setRoundCnt] = useState(0);
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const [sum, setSum] = useState(); // Sum 상태 추가
  const [openModal, setOpenModal] = useState(false);

  // 각 항목이 변경될 때마다 Sum을 업데이트합니다.
  useEffect(() => {
    const newSum = ones + twos + threes + fours + fives + sixes;
    setSum(newSum); // Sum 갱신
  }, [ones, twos, threes, fours, fives, sixes]);

  useEffect(() => {
    if (roundCnt == 11) {
      // 각 항목 점수의 합을 계산하여 total에 저장
      const sumTotal = 
        (ones || 0) + (twos || 0) + (threes || 0) + (fours || 0) + 
        (fives || 0) + (sixes || 0) + (tok || 0) + (fok || 0) + 
        (fullHouse || 0) + (smallStraight || 0) + (largeStragiht || 0) + 
        (chance || 0) + (yhatzee || 0);
      
      setTotal(sumTotal);
      // total state가 업데이트된 후에 localStorage에 저장하기 위해
      // 새로 계산된 sumTotal 값을 직접 사용
      localStorage.setItem("userScore", sumTotal.toString());
      alert("게임끝");
      setOpenModal(true);
    }
  }, [roundCnt]);

  const onClickOnes = () => {
    if (clickedButtons.has('ones')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3 && roundCnt < 15) return;
    
    const sum = DiceResult.filter(num => num === 1).reduce((acc, curr) => acc + curr, 0);
    setOnes(sum);
    setClickedButtons(prev => new Set([...prev, 'ones']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  const onClickTwos = () => {
    if (clickedButtons.has('Twos')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3) return;
    
    const sum = DiceResult.filter(num => num === 2).reduce((acc, curr) => acc + curr, 0);
    setTwos(sum);
    setClickedButtons(prev => new Set([...prev, 'Twos']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };

  const onClickThrees = () => {
    if (clickedButtons.has('threes')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3) return;
    
    const sum = DiceResult.filter(num => num === 3).reduce((acc, curr) => acc + curr, 0);
    setThrees(sum);
    setClickedButtons(prev => new Set([...prev, 'threes']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  const onClickFours = () => {
    if (clickedButtons.has('fours')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3) return;
    
    const sum = DiceResult.filter(num => num === 4).reduce((acc, curr) => acc + curr, 0);
    setFours(sum);
    setClickedButtons(prev => new Set([...prev, 'fours']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  const onClickFives = () => {
    if (clickedButtons.has('fives')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3) return;
    
    const sum = DiceResult.filter(num => num === 5).reduce((acc, curr) => acc + curr, 0);
    setFives(sum);
    setClickedButtons(prev => new Set([...prev, 'fives']));
    setPlayerCnt(3);
  };
  
  const onClickSixes = () => {
    if (clickedButtons.has('sixes')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3) return;
    
    const sum = DiceResult.filter(num => num === 6).reduce((acc, curr) => acc + curr, 0);
    setSixes(sum);
    setClickedButtons(prev => new Set([...prev, 'sixes']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  const onClickThreeOfKind = () => {
    if (clickedButtons.has('tok')) return; // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt === 3) return;
  
    // 주사위 결과 각 숫자의 빈도를 저장할 객체 생성
    const counts = {};
    DiceResult.forEach(num => counts[num] = (counts[num] || 0) + 1);
  
    // 빈도가 3 이상인 숫자가 있는지 확인
    const hasThreeOfKind = Object.values(counts).some(count => count >= 3);

    // Three of a Kind 조건을 만족하면 모든 주사위의 합을 계산, 아니면 0
    const sum = hasThreeOfKind ? DiceResult.reduce((acc, curr) => acc + curr, 0) : 0;
  
    setToK(sum);
    setClickedButtons(prev => new Set([...prev, 'tok']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
};
  
const onClickFourOfaKind = () => {
  if (clickedButtons.has('fok')) return;  // 이미 클릭된 버튼이면 함수 종료
  if (playerCnt === 3) return;
  
  const counts = {};
  DiceResult.forEach(num => counts[num] = (counts[num] || 0) + 1);

  // hasFourOfKind로 변수명 수정 (hasThreeOfKind에서)
  const hasFourOfKind = Object.values(counts).some(count => count >= 4);

  const sum = hasFourOfKind ? DiceResult.reduce((acc, curr) => acc + curr, 0) : 0;

  // setToK에서 setFoK로 수정
  setFoK(sum);
  setClickedButtons(prev => new Set([...prev, 'fok']));
  setPlayerCnt(3);
  setRoundCnt(roundCnt + 1);
  console.log(roundCnt);
};
  
  const onClickFullHouse = () => {
    if (clickedButtons.has('fullHouse')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt === 3) return;
  
    // 주사위 결과 각 숫자의 빈도를 저장할 객체 생성
    const counts = {};
    DiceResult.forEach(num => counts[num] = (counts[num] || 0) + 1);
  
    // 객체의 값이 2와 3을 포함하면 풀하우스 조건에 만족함
    const values = Object.values(counts);
    const hasThreeOfKind = values.includes(3);
    const hasPair = values.includes(2);
  
    // 풀하우스 조건을 만족하면 합산, 아니면 0
    const sum = hasThreeOfKind && hasPair ? DiceResult.reduce((acc, curr) => acc + curr, 0) : 0;
  
    setFullHouse(sum);
    setClickedButtons(prev => new Set([...prev, 'fullHouse']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  
  const onClickSmallStraight = () => {
    if (clickedButtons.has('smallStraight')) return; // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt === 3) return;
  
    // DiceResult 배열을 정렬하고 중복 제거
    const sortedUniqueDice = [...new Set(DiceResult)].sort((a, b) => a - b);
    
    // Small Straight 가능한 패턴들 정의
    const smallStraights = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6]
    ];
  
    // Small Straight 조건을 만족하는지 확인
    const isSmallStraight = smallStraights.some(pattern => 
      pattern.every(num => sortedUniqueDice.includes(num))
    );
  
    // 조건에 맞으면 30점, 아니면 0점
    const score = isSmallStraight ? 30 : 0;
  
    setSmallStraight(score);
    setClickedButtons(prev => new Set([...prev, 'smallStraight']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  
  const onClickLargeStraight = () => {
    if (clickedButtons.has('largeStraight')) return; // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt === 3) return;
  
    // DiceResult 배열 정렬 후 Large Straight 조건 확인
    const sortedDice = [...DiceResult].sort((a, b) => a - b);
    const isLargeStraight = JSON.stringify(sortedDice) === JSON.stringify([1, 2, 3, 4, 5]) || 
                            JSON.stringify(sortedDice) === JSON.stringify([2, 3, 4, 5, 6]);
    // 조건에 맞으면 40점, 아니면 0점
    const score = isLargeStraight ? 40 : 0;
  
    setLargeStraight(score);
    setClickedButtons(prev => new Set([...prev, 'largeStraight']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };
  
  
  const onClickChance = () => {
    if (clickedButtons.has('chance')) return;  // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt == 3) return;
  
    const sum = DiceResult.reduce((acc, curr) => acc + curr, 0); // DiceResult의 모든 값을 합산
    setChance(sum);
    setClickedButtons(prev => new Set([...prev, 'chance']));
    setPlayerCnt(3);
  };
  
  
  const onClickYAHTZEE = () => {
    if (clickedButtons.has('yhatzee')) return; // 이미 클릭된 버튼이면 함수 종료
    if (playerCnt === 3) return;
  
    // DiceResult 안의 모든 값이 같은지 확인
    const allSame = DiceResult.every(num => num === DiceResult[0]);
  
    // 모든 값이 같으면 50, 그렇지 않으면 0
    const score = allSame ? 50 : 0;
    
    setYhatzee(score);
    setClickedButtons(prev => new Set([...prev, 'yhatzee']));
    setPlayerCnt(3);
    setRoundCnt(roundCnt + 1);
    console.log(roundCnt);
  };  

  return (
    <Container>
      {openModal && <RankRegister />}
      <RowBox enemyName="CPU" />
      <RowBox tagName="Ones" onClick={onClickOnes} userName={ones}/>
      <RowBox tagName="Twos" onClick={onClickTwos} userName={twos}/>
      <RowBox tagName="Threes" onClick={onClickThrees} userName={threes} />
      <RowBox tagName="Fours"  onClick={onClickFours} userName={fours}/>
      <RowBox tagName="Fives"  onClick={onClickFives} userName={fives}/>
      <RowBox tagName="Sixes"  onClick={onClickSixes} userName={sixes}/>
      <RowBox tagName="Sum" userName={sum} />
      {sum > 63 ? (
        <RowBox tagName="Bonus" onClick={onClickSixes} userName="35" />
      ) : (
        <RowBox tagName="Bonus" onClick={onClickSixes} userName="0" />
      )}
      <RowBox tagName="Three of a kind" onClick={onClickThreeOfKind} userName={tok}/>
      <RowBox tagName="Four of a kind" onClick={onClickFourOfaKind} userName={fok}/>
      <RowBox tagName="Full House" onClick={onClickFullHouse} userName={fullHouse}/>
      <RowBox tagName="Small straight" onClick={onClickSmallStraight} userName={smallStraight}/>
      <RowBox tagName="Large straight" onClick={onClickLargeStraight} userName={largeStragiht}/>
      <RowBox tagName="Chance" onClick={onClickChance} userName={chance}/>
      <RowBox tagName="YAHTZEE" onClick={onClickYAHTZEE} userName={yhatzee}/>
      <RowBox tagName="TOTAL SCORE" userName={total}/>
    </Container>
  );
};

export default Table;