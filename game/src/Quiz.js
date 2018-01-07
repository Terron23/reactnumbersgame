import React, { Component } from 'react';
import QuizOptions from './QuizOptions'
import './App.css';
import classnames from 'classnames'

class Quiz extends Component {
constructor(props){
super(props)
let riddle = this.playGame()
let correct = false;
let gameOver = false;
this.state = {riddle, correct, gameOver}
this.renderOptions = this.renderOptions.bind(this);
this.checkResults =this.checkResults.bind(this);
this.play = this.play.bind(this);
}

randomNumber(min, max){
    return Math.floor(Math.random() * (max-min + 1)+min)
}
generateRandomOptions(sum){
let results = sum;
let resultsArray = [];
let randomNumberArray = [];

while(randomNumberArray.length <= 3){
let randomNumber = this.randomNumber(1, 19);
if(randomNumberArray.indexOf(randomNumber) > -1)continue;
randomNumberArray.push(randomNumber)
}
for(let i = 0; i < 3; i++){
let addSubtract = this.randomNumber(0,1)
if(addSubtract === 1) {
    //Add NUmber
    results += randomNumberArray[i]
    resultsArray.push(results)
}else{
    //subtract Number
    results -= randomNumberArray[i]
    resultsArray.push(results)
}
}

return resultsArray
}
playGame(){
    let field1 = this.randomNumber(20, 50)
    let field2 = this.randomNumber(20, 50)
    let result = field1 + field2
    let  resultsArray= this.generateRandomOptions(result)
    resultsArray.push(result)
    resultsArray.sort((a, b)=> {
        return 0.5 - Math.random()
    })
    console.log(resultsArray);
    let riddle = {
        resultsArray: resultsArray,
        field1: field1,
        field2: field2,
        answer: result
    }
if(this.state && this.state.gameOver){
    this.setState({riddle: riddle})
}
    else{
    return riddle;
    }
}

play(){
    this.setState({correct: false, gameOver: false})
    this.playGame();
}

checkResults(options){
    console.log('checkResults called  '+ options)
    if(this.state.riddle.answer === options){
        console.log('correct');
        this.setState({correct: true, gameOver: true})
    }
    else{
        console.log('incorrect')
        this.setState({correct: false, gameOver: true})
    }
}


renderOptions(){
   return( <div className="options">
   {this.state.riddle.resultsArray.map((option, i) =>{
    return <QuizOptions options={option} key={i} checkResults = {(options)=>this.checkResults(options)}/>
   })
   }
    </div>)
}

renderMessage(){
    if(this.state.correct) {
        return <h2>Good Job! Hit The Button Below to Play Again</h2>
    }

    else {
        return <h2>Wrong! Go Brush Up on Your Math Skills then Hit The Button Below to Play Again</h2>
    }
}
    render(){
        return(
        <div className="quiz">
        <div className="quiz-content">
        <p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1} + {this.state.riddle.field2}</span></p>
        {this.renderOptions()}
        </div>
        <b>Correct:</b> {this.state.correct ? "true" : "false"}<br />
        <b>Game Over:</b> {this.state.gameOver ? "true" : "false"}
        <div className ={classnames("after", {"hide": !this.state.gameOver}, {"wrong": !this.state.correct}, {"correct": this.state.correct})}>
        {this.renderMessage()}
        </div>
        <div className="play-again">
        <a className="button" onClick={this.play}>Play Again?</a>
       
        </div>
        </div>);
    }
}

export default Quiz;