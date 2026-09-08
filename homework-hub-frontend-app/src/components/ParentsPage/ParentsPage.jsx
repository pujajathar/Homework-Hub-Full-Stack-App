
import { useState, useEffect } from "react";
import AssignmentList from "../AssignmentList/AssignmentList";
import { mockMessages, mockAssignments, mockParent } from "../mockData";
import './ParentsPage.css';
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Notification from "../Notification/Notification";

function ParentsPage ({ assignments, toggleComplete, completedAssignments, setUser }) {
  
    const [data, setData] = useState({  //stores contact form input values
        subject:"",
        message:""
    });
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false); //tracks whether the contact form submitted successfully
    const completed = completedAssignments.length;   //calculates assignment statistics
    const pending = assignments.length - completed;
    const progressPct = assignments.length > 0 ? Math.round(( completed / assignments.length) * 100 ) : 0; //completion pct for progress bar
    const unread = mockMessages.filter(m => !m.read).length; //counts unread teacher messages
    const handleLogout = () => {  //logs the user out and return to homepage.
        setUser(null);
        navigate("/");
    }
    const handleChange = (e) => {  //updates form fields as user types
         
    const {name, value} = e.target; //extracts input's name and value
        setSubmitted(false);        //message disappears after user starts typing
        setData((prevData)  =>      //previous form state
        ({   
            ...prevData,          //copies all existing fields
            [name]:value          //updates only the changed field
        }))
    };
    useEffect(() => {   //success message disappears after set time
    if(submitted) {
        const timer = setTimeout(() => {  //starts a timer when form is submitted
        setSubmitted(false);
    }, 2000);
    return () => clearTimeout(timer);  //clears timer if the component unmount
    }
}, [submitted]);

    const handleSubmit = (e) => { //handles contact form submission
        e.preventDefault();
        setSubmitted(true); //displays success message
        setData 
        ({              //resets state after submitting form/name and message are cleared and ready for new message
                subject:"",
                message:""
        })
    }
return (
    <div className="home">
       <div className="page">
        <header className="dashboard-header">
            <h1>👨‍👩‍👧 Parent Dashboard</h1>
            <p>Welcome back, <strong>{mockParent.name}</strong> - tracking {mockParent.child} ({mockParent.grade})</p>
        </header>
            {/* Dashboard statistics cards */}
            <section className="stats-row">
            <div className="stat-card">
                <div className="stat-num">{assignments.length}</div>
                <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
                <div className="stat-num green">{completed}</div>
                <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
                <div className="stat-num amber">{pending}</div>
                <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
                <div className="stat-num red">{unread}</div>
                <div className="stat-label">Unread Messages</div>
            </div>
            </section>
                <Notification />  {/* Notification component displays notifications from backend */}

            <div className="two-col">     {/* Main dashboard content */} 
            <section className="card">
                <h2>📝 {mockParent.child}'s Assignments</h2>
             {/* Assignment list component displays list of assignment */}
            <AssignmentList 
            assignments={assignments}
            toggleComplete={toggleComplete}
            completedAssignments={completedAssignments}
            />
            </section>

            <div>  {/* Student Progress section */}
                <section className="card">
                    <h2>📊 Progress</h2>
                    <div className="progress-label">
                        <span>Overall Completion</span>
                        <strong>{progressPct}%</strong>
                        </div>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar-fill" style={{ width: `${progressPct}%`}} />
                        </div>                          
                            <p className="progress-note">{completed} of {assignments.length} assignments completed this week.</p>
                </section>

                <section className="card">
                <h2>💬 Messages from Teachers</h2>
                <ul className="message-list">
                    {mockMessages.map(m => (
                        <li key={m.id} className={`message-item ${m.read ? "" : "unread"}`}>
                            <div className={`message-dot ${m.read ? "read" : ""}`} />
                            <div>
                                <div className="message-from">{m.from}</div>
                                <div className="message-subject">{m.subject}</div>
                            </div>
                            <span className="message-date">{m.date}</span>
                        </li>             
                    ))}
                </ul>
            </section>

           <section className="card">  {/* contact form allow parents to send message to teachers */}
                <label>📨 Contact Teacher:</label><br /><br />
                <form className="contact-form" onSubmit={handleSubmit}>  
                <input type="text" 
                name="subject" 
                value={data.subject} 
                onChange={handleChange} 
                placeholder="Subject"
                required
                />                
                <textarea name="message" 
                value={data.message} 
                maxLength={200} 
                onChange={handleChange} 
                placeholder="Message...."
                required
                />                  
                <Button variant="yellow" type="submit">Send Message</Button>
                </form>
                {submitted && (<p className="success-message">✅ Message has been sent successfully!</p>)}
            </section>
            </div>
            </div>    
        </div>
       </div> 
    )
}

export default ParentsPage;                    
                                  
                              

       
    
    
