import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";

export default function Stats(){
    const {state} = useLocation();
    const {file}=state

    const [games, setGames]=useState({
      names: [],
      plays: [],
      playTime: []
    })

    const [playDataPie, setPlayDataPie]=useState([])
    const [timeDataPie, setTimeDataPie]=useState([])


    useEffect(()=>{
      const data=JSON.parse(file)
      
      for(let obj in data){
          if(games.names.includes(data[obj].Game)){
            const newValues={...games}
            const index=games.names.indexOf(data[obj].Game)
            newValues.plays[index]++
            newValues.playTime[index]=parseInt(newValues.playTime[index])+parseInt(data[obj].Time)
            setGames(newValues)

          }
          else if(data[obj].Game!=undefined){
            const newValues={...games}
            newValues.names.push(data[obj].Game)
            newValues.plays.push(1)
            newValues.playTime.push(parseInt(data[obj].Time))
            setGames(newValues)
          }


        //Set number of plays per game
        // if(games.has(data[obj].Game)){
        //   games.set(data[obj].Game, games.get(data[obj].Game)+1)
        // }
        // else{
        //   games.set(data[obj].Game, 0)
        // }
        // games.delete(undefined)

      }

      //console.log(games)
      var pieChart=[]
      var time=[]
      pieChart.push(["Game", "Number of Plays"])
      time.push(["Game","Time Played"])
          for(let i=0;i<games.names.length;i++){
            pieChart.push([games.names[i],games.plays[i]])
            time.push([games.names[i],games.playTime[i]])
          }
          setPlayDataPie(pieChart)
          setTimeDataPie(time)

      //console.log(games)
      
    }, [])

  const options1 = {
  title: "Number of Plays",
  is3D: true,
}

const options2 = {
  title: "Time Played(Min)",
  is3D: true,
}

    return(
       <div>
         <h1>Stats</h1>

           <Chart
      chartType="PieChart"
      data={playDataPie}
      options={options1}
      width={"100%"}
      height={"400px"}
    />

      <Chart
      chartType="PieChart"
      data={timeDataPie}
      options={options2}
      width={"100%"}
      height={"400px"}
    />

     
       </div>
        
    )
}