import React from 'react';
import './App.css';

function App() {
  //Use hooks - useState being a method from the react lib
  //0 is just the default var for the time variable
  const [time, setTime] = React.useState(0); 
  const [timerOn, setTimeOn] = React.useState(false);

  //Using useEffect hook - the function runs as soon as the func is rendered
  React.useEffect (() => {
    let interval = null; 
    //If timer is on 
    if(timerOn){
      //then we set interval b using a JS method - setInterval
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 10)
        }, 10)
      //When has been set off we need to clear interval 
      } else {
      //Using a JS method called - clearInterval and using the expression 
      //Interval which has already been set to interval before it should stop our timer
      clearInterval(interval);
    }

  //The useEffect hook works best if we use a cleanup function - not necassry but it is good to avoide memory leaks 
  //when the interval gets unmounted
  
  return () => clearInterval(interval)

   },[timerOn]);


  return (
    <div className="App">
      <div>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {!timerOn && time === 0 &&(
           <button onClick={() => setTimeOn(true)}>Start</button>
        )}
        {timerOn &&(
        <button onClick={() => setTimeOn(false)}>Stop</button>
        )}
        {timerOn && time !== 0 && (
          <button onClick= {() => setTimeOn(true)}>Resume</button>
        )}
        {!timerOn && time > 0 &&(
        <button onClick= {() => setTime(0)}>Reset</button>
        )}
      </div>
    </div>
  );
}

export default App;
