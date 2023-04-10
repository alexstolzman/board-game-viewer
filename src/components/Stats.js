import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import exportAsImage from "../exportAsImage";

import { Chart } from "react-google-charts";

export default function Stats(){
    const {state} = useLocation();
    const {file}=state
    const exportRef = useRef();

    const [games, setGames]=useState({
      names: [],
      plays: [],
      playTime: [],
      wins: []
    })

    const [totalTime, setTotalTime]=useState(0)
    const [totalPlays, setTotalPlays]=useState(0)


    const [playDataPie, setPlayDataPie]=useState([])
    const [timeDataPie, setTimeDataPie]=useState([])
    const [winData, setWinData]=useState([])


    useEffect(()=>{
      const data=JSON.parse(file)
      
      //Go through data, adding relevant information to arrays inside Games object
      for(let obj in data){
        if(data[obj].Game!==undefined)
          //If game data had already been added to the Games object
          if(games.names.includes(data[obj].Game)){
            const newValues={...games}
            const index=games.names.indexOf(data[obj].Game)

            newValues.plays[index]++
            newValues.playTime[index]=parseInt(newValues.playTime[index])+parseInt(data[obj].Time)
            if(data[obj].Outcome==="Won")
              newValues.wins[index]++

            setGames(newValues)
          }
          //Game hasn't been added to Game object yet
          else{
            const newValues={...games}

            newValues.names.push(data[obj].Game)
            newValues.plays.push(1)
            newValues.playTime.push(parseInt(data[obj].Time))

            if(data[obj].Outcome==="Won")
              newValues.wins.push(1)
            else
              newValues.wins.push(0)

            setGames(newValues)
          }

      }

      setTotalTime(games.playTime.reduce((a,b)=>a+b,0))
      setTotalPlays(games.plays.reduce((a,b)=>a+b,0))

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

  const optionsPlays = {
  title: "Number of Plays",
  is3D: true,
  backgroundColor: "bisque"
}

const optionsTime = {
  title: "Time Played(Min)",
  is3D: true,
  backgroundColor: "bisque"
}

const optionsWins={
  legend: 'none',
  backgroundColor: "bisque"
}

const diffdata = {
  old: playDataPie,
  new: winData,
};

    return(
       <div ref={exportRef}>
        <h1>Stats</h1>
        
        <div className="overview">
          <h5>Total Plays: {totalPlays} plays</h5>
          <h5>Total Time Played: {(totalTime/60).toFixed(2)} hours</h5>
        </div>

          <Chart
            chartType="PieChart"
            data={playDataPie}
            options={optionsPlays}
            width={"100%"}
            height={"400px"}
          />

          <Chart
            chartType="PieChart"
            data={timeDataPie}
            options={optionsTime}
            width={"100%"}
            height={"400px"}
          />

          <div>
            <h3>Wins/losses</h3>
            <p className="note">Note: Some solo games ony have a point total in the 'Outcome' column and thus don't count as wins</p>
            <div className="legend">
              <dl>
                  <dt className="blue"></dt>
                  <dd>Wins</dd>

                  <dt className="white"></dt>
                  <dd>Plays</dd>
              </dl>
            </div>

            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                diffdata={diffdata}
                options={optionsWins}
              />
          </div>
          <button className="submitBtn" onClick={() => exportAsImage(exportRef.current, "boardGameStats")}>Save View</button>
       </div>   
    )
}