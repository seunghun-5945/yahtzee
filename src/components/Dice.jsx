import React from 'react';
import styled from 'styled-components';

const DiceContainer = styled.div`
  display: inline-block;
  margin: 0 8px;
  cursor: pointer;
  opacity: ${props => props.isLocked ? 0.5 : 1};
`;

const DiceSVG = styled.svg`
  width: 60px;
  height: 60px;
`;

const DiceBackground = styled.rect`
  fill: white;
  stroke: #aaa;
  stroke-width: 2;
`;

const DiceDot = styled.circle`
  fill: black;
`;

const Dice = ({ value, isLocked, onClick }) => {
  const dotPositions = {
    1: [{x: 50, y: 50}],
    2: [{x: 25, y: 25}, {x: 75, y: 75}],
    3: [{x: 25, y: 25}, {x: 50, y: 50}, {x: 75, y: 75}],
    4: [{x: 25, y: 25}, {x: 75, y: 25}, {x: 25, y: 75}, {x: 75, y: 75}],
    5: [{x: 25, y: 25}, {x: 75, y: 25}, {x: 50, y: 50}, {x: 25, y: 75}, {x: 75, y: 75}],
    6: [{x: 25, y: 25}, {x: 75, y: 25}, {x: 25, y: 50}, {x: 75, y: 50}, {x: 25, y: 75}, {x: 75, y: 75}]
  };

  return (
    <DiceContainer isLocked={isLocked} onClick={onClick}>
      <DiceSVG viewBox="0 0 100 100">
        <DiceBackground 
          x="5" 
          y="5" 
          width="90" 
          height="90" 
          rx="15"
        />
        {dotPositions[value]?.map((pos, index) => (
          <DiceDot
            key={index}
            cx={pos.x}
            cy={pos.y}
            r="8"
          />
        ))}
      </DiceSVG>
    </DiceContainer>
  );
};

export default Dice;