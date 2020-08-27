import React from 'react';
import './App.css';
import useAnimationFrame from './useAnimationFrame';
import Enemy from './Enemy';
import Tower from './Tower';

const INITIAL_STATE = {
  enemies: [
    { 
      id: 1,
      pos: [10, 110],
      step: 0,
      // path: [[810, 110], [810, 510], [1210, 510]],
      // path: [[10, 510], [510, 510], [510, 710]],
      path: [[210, 510], [510, 310], [710, 810]],
      speed: 1,
      health: 10
     }
  ]
};

// Move enemies
function updateState(prevState) {
  return { 
    enemies: prevState.enemies.map((enemy) => {
      if (enemy.arrived) {
        return enemy;
      }

      // Always moving from pos to path[step]
      const [fromX, fromY] = enemy.pos;
      const [toX, toY] = enemy.path[enemy.step];
      
      // End of journey or current leg of journey?
      if (fromX === toX && fromY === toY) {
        // End of journey  
        if (enemy.step === enemy.path.length - 1) {
          enemy.arrived = true;
          console.log('Journey ended');
          // TODO - decrement player health!
        } else {
          // End of current leg of journey
          // Move on to next waypoint
          enemy.step = enemy.step + 1;
          console.log('Change to next waypoint: ', enemy.step, enemy.path[enemy.step]);
        }

      } else {
        
        // TODO - Use vectors so we don't only and always move 1 unit horizontally and/or vertically per tick
        
        // Move towards next way point
        if (fromX !== toX) {
          enemy.pos[0] = fromX + (fromX < toX ? 1 : -1);
        }
        if (fromY !== toY) {
          enemy.pos[1] = fromY + (fromY < toY ? 1 : -1);
        }
      }
      return enemy;
   })
  };
};

function App() {
  const [state, setState] = React.useState(INITIAL_STATE);
  useAnimationFrame(deltaTime => { setState(updateState); });
  return (
    <div className="main">
      <Tower x={110} y={10} />
      {
        state.enemies.map(
          ({id, pos}) => <Enemy key={id} x={pos[0]} y={pos[1]} />)
      }
    </div>
  );
}
  
export default App;
