import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "./components/Table";
import axios from "axios";
import Dice from "./components/Dice";
import { Link } from "react-router-dom";
import Register from "./pages/Register";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: purple;
  border: none;
  border-radius: 20px;
`;

const PlayGround = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid lightgray;
`;

const MenuArea = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const RollArea = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
`;

const ResultArea = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: lightgray;
  cursor: pointer;
`;

const TextArea = styled.div`
  width: 70%;
  height: 30%;
  border: 1px solid black;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ChatMessage = styled.div`
  padding: 5px;
  background-color: ${props => props.isSelf ? '#e3f2fd' : '#f5f5f5'};
  border-radius: 5px;
  margin: 2px 0;
`;

const ChaatBox = styled.div`
  width: 30%;
  height: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
`;

const ChatArea = styled.input`
  width: 50%;
  height: 5%;
  border: 1px solid black;
`;

const App = () => {
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);
  const [diceLocks, setDiceLocks] = useState([false, false, false, false, false]); // 각 주사위 잠금 상태
  const [playerCnt, setPlayerCnt] = useState(3);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState();
  const [error, setError] = useState();
  const [chatLog, setChatLog] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'r' || event.key === 'R' || event.key === 'ㄱ') {
        RollTheDice();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerCnt]);

  const toggleLock = (index) => {
    setDiceLocks(prevLocks => {
      const newLocks = [...prevLocks];
      newLocks[index] = !newLocks[index];
      return newLocks;
    });
  };

  const RollTheDice = () => {
    console.log(playerCnt);
    
    if (playerCnt > 0) {
      if (playerCnt === 3) {
        setDiceLocks([false, false, false, false, false]);
        setDiceValues(prevValues => 
          prevValues.map(() => Math.floor(Math.random() * 6) + 1)
        );
      } else {
        setDiceValues(prevValues => 
          prevValues.map((value, index) => diceLocks[index] ? value : Math.floor(Math.random() * 6) + 1)
        );
      }
      setPlayerCnt(playerCnt - 1);
    } else {
      alert("고만돌리라");
    }
};

  const onChangeRoomId = (e) => {
    setRoomId(e.target.value);
    console.log(roomId);
  };

  useEffect(() => {
    let ws = null;
    const connectWebSocket = () => {
      try {
        ws = new WebSocket("wss://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/ws/game");

        ws.onopen = () => {
          console.log("WebSocket 연결 성공");
          setIsConnected(true);
          setError(null);
          setSocket(ws);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("서버로부터 메시지 수신:", data);
            
            if (data.type === 'GAME' || data.type === 'ENTER') {
              setChatLog(prevLog => [...prevLog, {
                sender: data.sender,
                message: data.message,
                timestamp: data.timestamp
              }]);
            }
          } catch (e) {
            console.log("일반 메시지 수신:", event.data);
          }
        };

        ws.onclose = (event) => {
          console.log("WebSocket 연결 종료:", event.code, event.reason);
          setIsConnected(false);
          setTimeout(connectWebSocket, 3000);
        };

        ws.onerror = (error) => {
          console.error("WebSocket 오류:", error);
          setError("WebSocket 연결 중 오류가 발생했습니다.");
        };

      } catch (error) {
        console.error("WebSocket 초기화 오류:", error);
        setError("WebSocket 초기화 중 오류가 발생했습니다.");
      }
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  

  const enterRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'ENTER',
        roomId: roomId,
        sender: userName,
        message: "asdasd"
      };
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
      setError("서버에 연결되어 있지 않습니다.");
    }
  };


  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && chatMessage.trim() && userName.trim()) {
        if (!roomId) {
            setError("방에 입장해야 채팅이 가능합니다.");
            return;
        }

        const message = {
            type: 'GAME',
            roomId: roomId,
            message: chatMessage,
            sender: userName,
            timestamp: new Date().toISOString()
        };

        socket.send(JSON.stringify(message));
        setChatMessage(""); // 메시지 전송 후 입력창 초기화
    } else {
        setError("메시지를 전송할 수 없습니다. 연결 상태 및 이름을 확인해주세요.");
    }
};

  const createRoom = async () => {
    try {
      const response = await axios.post("https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/game/createroom", {
        "name": userName
      })
      console.log(response.data.roomId);
    }
    catch(error) {
      console.log(error);
    }
  }

  

  const findRoom = async () => {
    try {
      const response = await axios.get("https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/game/findroom")
      console.log(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }

  
  return (
    <Container>
      <Frame>
        <PlayGround>
          <RollArea>
            <MenuArea>
              <Link to="/LogIn">
              <StyledButton>로그인 / 회원가입</StyledButton>
              </Link>
              <Link to="/Ranking">
              <StyledButton>랭킹확인</StyledButton>
              </Link>
            </MenuArea>
            <h1>ReRoll Chance {playerCnt}</h1>
            <ResultArea>
              {diceValues.map((value, index) => (
                <Dice
                  key={index}
                  value={value}
                  isLocked={diceLocks[index]}
                  onClick={() => toggleLock(index)}
                />
              ))}
            </ResultArea>
            <StyledButton onClick={RollTheDice}>주사위 존나게 돌리기</StyledButton>
          </RollArea>
          <Table DiceResult={diceValues} playerCnt={playerCnt} setPlayerCnt={setPlayerCnt}/>
        </PlayGround>
        <ChaatBox>
          <div style={{ color: isConnected ? 'green' : 'red', marginBottom: '10px' }}>
            {isConnected ? '서버 연결됨' : '서버 연결 끊김'}
          </div>
          <StyledButton onClick={createRoom}>방만들기</StyledButton>
          <StyledButton onClick={findRoom}>방찾기</StyledButton>
          <ChatArea value={roomId} onChange={onChangeRoomId} placeholder="방 ID를 입력하세요" />
          <ChatArea value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="이름을 입력하세요" />
          <StyledButton onClick={enterRoom}>방 입장하기</StyledButton>
          <TextArea>
          {chatLog.map((chat, index) => (
            <ChatMessage 
              key={index} 
              isSelf={chat.sender === userName}
            >
              <strong>{chat.sender}:</strong> {chat.message}
            </ChatMessage>
          ))}
          </TextArea>
          <ChatArea onChange={(e) => setChatMessage(e.target.value)}/>
          <StyledButton onClick={sendMessage}>채팅전송</StyledButton>
        </ChaatBox>
      </Frame>
    </Container>
  );
};

export default App;