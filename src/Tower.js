import React from 'react';
export default function Tower({x, y}) {
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