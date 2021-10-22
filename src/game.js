import React, { useState } from "react";
import swal from "sweetalert";
const Game=()=>{
    const[turn,setTurn]=useState('X');
    const[cells,setCells]=useState(Array(9).fill(''));
    const[winner,setWinner]=useState();
    let status;

     //function is called everytime a cell is clicked
    const handleClick=(num)=>{
        if(winner||cells[num]) return; //if player clicks on occupied cell or if there is a winner
    
        if(turn==='X'){
            cells[num]='X'
            setTurn('O')
        }
        else{
            cells[num]='O'
            setTurn('X')
        }

        setCells(cells) //updates the state and stores the values in the array
        console.log(cells);
        checkWinner(cells);
    }

    //function to calculate winner
    const checkWinner=(cells)=>{ 
        const pattern=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        let i;
        for(i=0;i<pattern.length;i++){
            const[a,b,c]=pattern[i];
            if(cells[a]===''|| cells[b]===''||cells[c]===''){
                //nothing
            }
            else if(cells[a]===cells[b] && cells[b]===cells[c]){
                setWinner(cells[a]);
            }
        }
    }

    //updating status
    if(winner) {
        swal(winner+" WINS!","Congrats!");
      }
      else if(!cells.includes('')){
          status='tie'
      } 
      else {
         status= 'Next player:' +turn;
      }

      //function to restart game
      const restart=()=>{
          setWinner(null);
          setCells(Array(9).fill(''))
      }
      
     //cell component 
    const Cell=({num})=>{
        return<td><button className="square" onClick={()=>handleClick(num)}>{cells[num]}</button></td>
    }

    //board
    return(
        <div className="gameBody">
        <table>
            <tbody>
            <div className="Status"> {status}</div>
            <tr>
                <Cell num={0}/>
                <Cell num={1}/>
                <Cell num={2}/>
            </tr>
            <tr>
                <Cell num={3} />
                <Cell num={4}/>
                <Cell num={5}/>
            </tr>
            <tr>
                <Cell  num={6}/>
                <Cell num={7}/>
                <Cell num={8}/>
            </tr>
            </tbody>
        </table>
        <div className="footer">
            <button className="gameRestart" onClick={()=>restart()}>Restart</button>
            </div>
    
        </div>
    );
    };
export default Game