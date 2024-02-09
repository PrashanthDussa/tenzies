import React from 'react'
import './App.css';
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice,setDice]=React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die=>die.isHeld)
    const firstValue=dice[0].value
    const allSame=dice.every(die=>die.value===firstValue)
    if(allHeld && allSame)
    {
      setTenzies(true)
    }
  },[dice])

  function generateNewDice(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id:nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDice())
    }
    return newDice
  }

  function holdDice(id){
    setDice((oldDice)=>oldDice.map((die)=>{
       return die.id===id? {...die,isHeld:!die.isHeld}:die
    }))
  }

  const diceElements=dice.map(die=><Die value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)

  function rollDice(){
    setDice((oldDice)=>oldDice.map((die)=>{
      return die.isHeld ? die : generateNewDice()
    }))
  }

  function reset(){
    setDice(allNewDice())
    setTenzies(false)
  }  

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
        {diceElements}
      </div>
      <button className="roll-dice" onClick= {tenzies ? reset : rollDice}>{tenzies ? "New Game" : "Roll" }</button>
    </main>
  )
}

export default App;
