import logo from '../../assets/images/logo.png';
import './Header.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header ( { role, user, setUser } ) {
const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false); //controls whether hamburger menu is open or closed
 const handleLogout = () => {    //clears user data and return to homepage after logout
        setUser(null);
        navigate("/");
        setMenuOpen(false);
    }
    const handleNavigate = (path) => { //Handles navigation and closes mobile menu after clicking a link
      navigate(path);
      setMenuOpen(false);
    }

    return (
      <header className='header'>           
        <div className='img'>
          <img src={logo} alt='AaruEdu Logo' />  {/* website logo*/}
        </div>
        <h1 key={user?.role}>  {/*recreates the h1 element to make css animation run again whenever user's role changes */}
          <span className='word1'>Aaru</span>
          <span className='word2'>E</span>
          <span className='word3'>d</span>
          <span className='word4'>u</span>  
          {" - "} 
          <span className='word5'>Homework Hub</span>
          </h1>
        <button className='hamburger'  
        onClick={() => setMenuOpen(!menuOpen)}>  {/* Mobile hamburger menu button */}
          ☰         
        </button>
      <nav className={`buttons ${menuOpen ? "open" : ""}`}>    {/* navigation menu */}
        <button onClick={() => handleNavigate("/")}>Home</button>
        <button onClick={() => handleNavigate("/aboutus")}>About Us</button>
        {user?.role === "parent" && (
        <button className='par'
        onClick={() => handleNavigate("/parents")}
        >
          Parents
          </button>
        )}
        {user?.role === "teacher" && (
        <button className='tech'
        onClick={() => handleNavigate("/teachers")}>
          Teachers
          </button>
        )}
        {user?.role === "student" && (
        <button className='stu'
        disabled = {user?.role !== "student"}
        onClick={() => handleNavigate("/students")}>
          Students
          </button>
        )}
        {/*  Shows logout button only when user is logged in*/}
          {user && ( 
              <button onClick={handleLogout}>
                  Logout
              </button>
          )}       
      </nav>
    </header>
    );
}
export default Header;