

export default function Home(){


    return(
        <div className='Home'>
            <h1>Home</h1>
            <h3>About</h3>
            <p>This is a simple site created to take a csv file of board game stats and output a visual representation of the stats</p>
            <p>Currently uses a specific .csv format, so you may have to make slight adjustments for it to work correctly with your file.</p>
            <p>An example of the stats page is shown below</p>
            <img src="./stats.png" border="2px black" alt="Example of stats page"/>
        </div>
    )
}