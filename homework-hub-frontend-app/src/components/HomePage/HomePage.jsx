import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import home from "../../assets/images/home.JPG";


function HomePage ( {setUser} ) {
const navigate = useNavigate();
return (
<div className="home">
   <div className="page">
      <section className="hero">
         <div className="hero-left">
            <h1 className="tagline">
               <span>AaruEdu - Homework Hub</span> for Elementary Schools
            </h1>
            <p>AaruEdu Homework Hub connects students, parents, and teachers in one place.<br/>
            It is designed by parents and educators to make homework management simple and organized.
            </p>
         </div>
      <div className="hero-image"><img src={home} alt="home page image" /></div>
      </section>
      <section className="role-selection">
         <h2>Choose your role to get started</h2>
            <div className="role-cards">    
               <div className="role-card parent" onClick={() => {
                     navigate("/parents")
                  }}>
                  <div className="role-icon">👨‍👩‍👧‍👦</div>
                     <h3>Parent</h3>
                     <p>View assignments, track progress and contact teachers easily</p>
               </div>
               <div className="role-card teacher" onClick={() => {
                  navigate("/teachers");
                  }}>
                  <div className="role-icon">👩‍🏫 </div>
                  <h3>Teacher</h3>
                  <p>Create assignments, track progress and Respond to parents easily</p>
               </div>
               <div className="role-card student" onClick={() => {
                  navigate("/students");
               }}>
                  <div className="role-icon">🧑‍🎓</div> 
                  <h3>Student</h3>
                  <p>View assignments, track progress and contact teachers easily</p>
               </div>
         </div> 
      </section>  
   </div>
</div>     
);
}
export default HomePage;