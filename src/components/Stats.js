import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";

export default function Stats(){
    const {state} = useLocation();
    const {file}=state

    const [games, setGames]=useState({
      names: [],
      plays: [],
      playTime: [],
      wins: []
    })

    const [playDataPie, setPlayDataPie]=useState([])
    const [timeDataPie, setTimeDataPie]=useState([])
    const [winData, setWinData]=useState([])


    useEffect(()=>{
      const data=JSON.parse(file)
      
      for(let obj in data){
          if(games.names.includes(data[obj].Game)){
            const newValues={...games}
            const index=games.names.indexOf(data[obj].Game)
            newValues.plays[index]++
            newValues.playTime[index]=parseInt(newValues.playTime[index])+parseInt(data[obj].Time)
            if(data[obj].Outcome==="Won")
              newValues.wins[index]++

            setGames(newValues)

          }
          else if(data[obj].Game!==undefined){
            const newValues={...games}
            newValues.names.push(data[obj].Game)
            newValues.plays.push(1)
            newValues.playTime.push(parseInt(data[obj].Time))
            if(data[obj].Outcome==="Won")
              newValues.wins.push(1)
            else if(data[obj].Outcome==="Lost")
              newValues.wins.push(0)
            setGames(newValues)
          }

      }


      var pieChart=[]
      var time=[]
      var wins=[]
      pieChart.push(["Game", "Number of Plays"])
      time.push(["Game","Time Played"])
      wins.push(["Game", "Wins"])
          for(let i=0;i<games.names.length;i++){
            pieChart.push([games.names[i],games.plays[i]])
            time.push([games.names[i],games.playTime[i]])
            wins.push([games.names[i],games.wins[i]])
          }
          setPlayDataPie(pieChart)
          setTimeDataPie(time)
          setWinData(wins)

      
    }, [])

  const options1 = {
  title: "Number of Plays",
  is3D: true,
  backgroundColor: "bisque"
}

const options2 = {
  title: "Time Played(Min)",
  is3D: true,
  backgroundColor: "bisque"
}

const options3={
  legend: { position: "top" },
  backgroundColor: "bisque"
}

const diffdata = {
  old: playDataPie,
  new: winData,
};

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

        <label>
          Wins/losses

          <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              diffdata={diffdata}
              options={options3}
            />
        </label>

     
       </div>
        
    )
}