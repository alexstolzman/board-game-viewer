import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Stats(){
    const {state} = useLocation();
    const {file}=state
    const [gameData, setGameData]=useState(new Map())
    let games=new Map()

    useEffect(()=>{
      const data=JSON.parse(file)
      
      for(let obj in data){
        //Set number of plays per game
        if(games.has(data[obj].Game)){
          games.set(data[obj].Game, games.get(data[obj].Game)+1)
        }
        else{
          games.set(data[obj].Game, 0)
        }
        games.delete(undefined)

      }

      console.log(games)
      
    }, [])

    return(
       <div>
         <h1>Stats</h1>
          <label>
          Games

          </label>
          <label>
            Total Plays(histogram)
          </label>
          <label>
            Time Played(Pie chart with total number of hours above)
          </label>
        <p>{file}</p>
       </div>
        
    )
}