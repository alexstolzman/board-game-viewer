import { NavLink } from 'react-router-dom'

export default function NavBar(){
    return(
        <div className='navBar'>
                <NavLink to="/" className="navItem">Home</NavLink>
                <NavLink to="upload" className="navItem">Upload</NavLink>
        </div>
    )
}