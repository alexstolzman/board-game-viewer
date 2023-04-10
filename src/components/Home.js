

export default function Home(){


    return(
        <div className='Home'>
            <h1>Home</h1>
            <h3>About</h3>
            <p>This site was created to take a .csv file of board game stats and output a visual representation of the important data. Also includes an option to download the stats page. </p>
            <p className="note">Note: Slight adjustments will most likely need to be made for this to work with your .csv file(check the upload page for more information)</p>
            <p>An example of the stats page is shown below</p>
            <img src="./bgstats.png" border="2px black" alt="Example of stats page"/>
        </div>
    )
}