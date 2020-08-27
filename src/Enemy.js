import React from 'react';
export default function Enemy({x, y}) {
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