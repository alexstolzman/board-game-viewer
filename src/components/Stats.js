import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Stats(){
    const {state} = useLocation();
    const {file}=state

    useEffect(()=>{
      
    })

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