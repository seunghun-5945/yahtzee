import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "./components/Table";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: salmon;
`;

const Frame = styled.div`
  width: 1400px;
  height: 800px;
  display: flex;
  background-color: #565374;
  border: none;
  border-radius: 20px;
`;

const PlayGround = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const RollArea = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

const ResultArea = styled.div`
  width: 50%;
  height: 5%;
  border: 1px solid black;
`;

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: lightgray;
  cursor: pointer;
`;

  // TextArea 스타일 수정
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

  // 채팅 메시지 컴포넌트
  const ChatMessage = styled.div`
    padding: 5px;
    background-color: ${props => props.isSelf ? '#e3f2fd' : '#f5f5f5'};
    border-radius: 5px;
    margin: 2px 0;
  `;

const ChatArea = styled.input`
  width: 50%;
  height: 5%;
  border: 1px solid black;
`

const App = () => {
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);
  const [diceLocks, setDiceLocks] = useState([false, false, false, false, false]); // 각 주사위 잠금 상태
  const [playerCnt, setPlayerCnt] = useState(100);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState();
  const [error, setError] = useState();
  const [chatLog, setChatLog] = useState([]); // 채팅 로그를 위한 상태 추가
  const [chatMessage, setChatMessage] = useState("");

  const toggleLock = (index) => {
    setDiceLocks(prevLocks => {
      const newLocks = [...prevLocks];
      newLocks[index] = !newLocks[index];
      return newLocks;
    });
  };

  const RollTheDice = () => {
    if (playerCnt > 0) {
      setDiceValues(prevValues => 
        prevValues.map((value, index) => diceLocks[index] ? value : Math.floor(Math.random() * 6) + 1)
      );
      setPlayerCnt(playerCnt - 1);
    } else {
      alert("고만돌리라");
    }
  };

  // roomId 변경 핸들러
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
            
            // 채팅 메시지인 경우 chatLog에 추가
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
        sender: "이승훈",
        message: "asdasd"
      };
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
      setError("서버에 연결되어 있지 않습니다.");
    }
  };


  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && chatMessage.trim()) {
      if (!roomId) {
        setError("방에 입장해야 채팅이 가능합니다.");
        return;
      }

      const message = {
        type: 'GAME',
        roomId: roomId,
        message: chatMessage,
        sender: "이승훈",
        timestamp: new Date().toISOString()
      };
      
      socket.send(JSON.stringify(message));
      
      // 로컬 채팅 로그에도 추가
      setChatLog(prevLog => [...prevLog, {
        sender: "이승훈",
        message: chatMessage,
        timestamp: new Date().toISOString()
      }]);
      
      setChatMessage("");
    } else {
      setError("메시지를 전송할 수 없습니다. 연결 상태를 확인해주세요.");
    }
  };

  const createRoom = async () => {
    try {
      const response = await axios.post("https://port-0-yhatzeeback-m39re8g35ae5a423.sel4.cloudtype.app/game/createroom", {
        "name": "이승훈"
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
            <div style={{ color: isConnected ? 'green' : 'red', marginBottom: '10px' }}>
              {isConnected ? '서버 연결됨' : '서버 연결 끊김'}
            </div>
            <StyledButton onClick={createRoom}>방만들기</StyledButton>
            <StyledButton onClick={findRoom}>방찾기</StyledButton>
            <StyledButton onClick={enterRoom}>방들어가기</StyledButton>
            <ChatArea
                value={roomId}
                onChange={onChangeRoomId}
                placeholder="방 ID를 입력하세요"
              />
            <h1>다이스카운터 {playerCnt}</h1>
            <TextArea>
              {chatLog.map((chat, index) => (
                <ChatMessage 
                  key={index} 
                  isSelf={chat.sender === "이승훈"}
                >
                  <strong>{chat.sender}:</strong> {chat.message}
                </ChatMessage>
              ))}
            </TextArea>
            <ChatArea onChange={(e) => setChatMessage(e.target.value)}/>
            <StyledButton onClick={sendMessage}>채팅전송</StyledButton>
            <ResultArea>
              {diceValues.map((value, index) => (
                <span key={index} onClick={() => toggleLock(index)} style={{ cursor: "pointer", padding: "0 5px", color: diceLocks[index] ? 'red' : 'black' }}>
                  {value}
                </span>
              ))}
            </ResultArea>
            <StyledButton onClick={RollTheDice}>주사위 존나게 돌리기</StyledButton>
          </RollArea>
          <Table DiceResult={diceValues} playerCnt={playerCnt} setPlayerCnt={setPlayerCnt}/>
        </PlayGround>
      </Frame>
    </Container>
  );
};

export default App;
