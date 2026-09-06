import { Link } from "react-router-dom";
import './AboutPage.css';
function AboutPage () {

return (
<div className="home">  
<div className="page">
    <section className="about-hero">
        <h1>About AaruEdu</h1>
        <p>
            We believe every child deserves a stress-free homework experience. AaruEdu
            Homework Hub was built by parents and educators to bridge the gap between
            school and home. 
        </p>
    </section>
  
    <div className="about-grid">
    <div className="about-card">
        <div className="about-icon">🎯</div>
        <h3>Our Mission</h3>
        <p>
            Our mission is to make homework management simple, organized, and accessible for elementary school communities.<br/>
            We are committed to helping teachers, parents, and students stay connected by providing one central place to manage
            assignments, due dates, classroom updates, and learning resources.
        </p>
    </div>
    <div className="about-card">
        <div className="about-icon">🌱</div>
        <h3>Our Vision</h3>
        <p>
            Our vision is to create a future where every elementary school family has an easy and reliable way to stay engaged in their child's education.<br/>
            We aspire to strengthen the partnership between home and school by reducing missed assignments, improving collaboration, and making homework management
            simple, efficient, and accessible for everyone.
        </p>
    </div>
    <div className="about-card">
        <div className="about-icon">💡</div>
        <h3>Why AaruEdu?</h3>
        <p>
            AaruEdu was inspired by my own experience as a parent of elementary school children.<br/>
            I wanted to create a simple solution that helps families and teachers stay connected while reducing the stress of 
            keeping track of paper assignments.
        </p>
    </div>
    </div>

    <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">            
                <div className="team-card">
                    <div className="team-avatar">👩‍💼</div>
                    <h3>Puja J</h3>
                    <h4>Founder & Lead Developer</h4>
                    <p>
                        Leading the vision of AaruEdu and creating tools that help students, parents, and teachers 
                        connect through better learning experiences. 
                    </p>
                </div>           
        </div>        
    </section>
</div>
</div> 
);
}
export default AboutPage;