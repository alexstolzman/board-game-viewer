import { useState } from "react"

export default function Upload(){
    const [isSelected, setSelected]=useState(false)
    const [selectedFile, setSelectedFile]=useState()


    const onFileChange=(event)=>{
        setSelectedFile(event.target.files[0])
        setSelected(true)

    }

    const onSubmission=(e)=>{
        //File validation
        e.preventDefault()
         var reader = new FileReader();
         
          reader.readAsText(selectedFile);

        reader.onload = function() {
            console.log(reader.result);
        };

        //Upload data or just save locally

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
            <button type="submit" >Submit</button>
            </form>
        
        </div>
    )
}