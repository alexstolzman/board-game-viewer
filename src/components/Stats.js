import { useLocation } from "react-router-dom";

export default function Stats(){
    const {state} = useLocation();
    const {file}=state

    return(
       <div>
         <h1>Stats</h1>
        <p>{file}</p>
       </div>
        
    )
}