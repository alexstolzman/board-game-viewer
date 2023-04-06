import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Upload(){
    const [isSelected, setSelected]=useState(false)
    const [selectedFile, setSelectedFile]=useState()

    let navigate = useNavigate(); 


    const onFileChange=(event)=>{
        setSelectedFile(event.target.files[0])
        setSelected(true)

    }



    const onSubmission=(e)=>{
        let path = `..//stats`; 

        //File validation
        e.preventDefault()
         var reader = new FileReader();
         
          reader.readAsText(selectedFile);

        reader.onload = function() {
           // console.log(reader.result);
            var csv=reader.result
            var lines=csv.split("\n")
            var result=[]
            var headers=lines[0].split(",")
              for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].split(",");
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
            }  
            //return result; //JavaScript object
            result= JSON.stringify(result); //JSON

            navigate(path, { state: {file: result}});
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    
    }

    return(
        <div className="upload">
            <h1>Upload</h1>
            <form onSubmit={onSubmission}>
                <input type="file" accept=".csv" onChange={onFileChange}></input>
            {isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
            <button className="submitBtn" type="submit" >Submit</button>
            </form>
        
        </div>
    )
}