import { NavLink } from 'react-router-dom'

export default function NavBar(){
    return(
        <div>
            <flex-box>
                <NavLink to="/">Home</NavLink>
                <NavLink to="stats">Stats</NavLink>
                <NavLink to="upload">Upload</NavLink>
            </flex-box>
        </div>
    )
}