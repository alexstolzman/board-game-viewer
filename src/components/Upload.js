import { useState } from "react"

export default function Upload(){
    const [isFileSelected, setFileSelected]=useState(false)
    const [selectedFile, setSelectedFile]=useState()


    const onFileChange=(event)=>{
        setSelectedFile(event.target.files[0])
        setFileSelected(true)
        console.log(event.target.files[0])
    }

    const onSubmission=()=>{
        if(isFileSelected){
            console.log(selectedFile)
        }

    }

    return(
        <div className="upload">
            <h1>Upload</h1>
            <input type="file" accept=".csv" onChange={onFileChange}></input>
            <button type="submit" onSubmit={onSubmission}>Submit</button>
        </div>
    )
}