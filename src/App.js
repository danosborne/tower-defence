import React from 'react';
import './App.css';


const useAnimationFrame = callback => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  
  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }
  
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
}

// Moves enemies
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
  const [state, setState] = React.useState(
    {
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
    }
  );
  
  useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setState(updateState);
  });

  // console.log('Rendering App with state', state);
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

function Tower({x, y}) {
  return <div
    style={{
      position: "absolute",
      backgroundColor: "red",
      
      width: 30,
      height: 30,
      left: x, 
      top: y 
    }}
  ></div>;
};

function Enemy({x, y}) {
  return <div
    style={{
      position: "absolute",
      backgroundColor: "green",
      
      width: 10,
      height: 10,
      left: x, 
      top: y 
    }}
  ></div>;
};
  
export default App;
