import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import './StudentsPage.css';
import AssignmentList from "../AssignmentList/AssignmentList";
import { mockAssignments, mockStudent, mockBadges, mockTeacher, mockStudents } from "../mockData";
import ParentsPage from "../ParentsPage/ParentsPage";
import { useState } from "react";

function StudentsPage ({ assignments, toggleComplete, completedAssignments, setUser}) {
 const [assignment, setAssignment] = useState(mockAssignments);
 const completed = completedAssignments.length;
 const total = assignments.length;
 const progressPct = (assignments.length > 0) ? Math.round((completed / assignments.length) * 100) : 0;
 const earnedCount = mockBadges.filter(b => b.earned).length;
 const navigate = useNavigate();
   const handleLogout = () => {
        setUser(null);
        navigate("/");
    }
 
    return (
    <div className="home">
        <div className="page">
            <header className="dashboard-header">
                <h1>🧑‍🎓 Student Dashboard</h1>
                <p>Hey, <strong>{mockStudent.name}</strong>! You're in {mockStudent.grade} with {mockTeacher.name}⭐</p>
            </header>
            {/* Dashboard statistics cards */}
            <section className="stats-row">
                <div className="stat-card">
                    <div className="stat-num">{total}</div>
                    <div className="stat-label">Assignments 📝</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num green">{completed}</div>
                    <div className="stat-label">Done ✅</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num amber">{total - completed}</div>
                    <div className="stat-label">Pending 📌</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num purple">{mockStudent.points}</div>
                    <div className="stat-label">Points ⭐</div>
                </div>
            </section>
            <div className="two-col">
                <section className="card"> {/* Homework assignment list */}
                    <h2>📚🎯 My Homework</h2>
                    <AssignmentList 
                    assignments={assignments}
                    toggleComplete={toggleComplete}
                    completedAssignments={completedAssignments}
                    />
                    <div className="progress-section">  
                        <div className="progress-label">
                            <span>Weekly Progress</span>
                            <strong>{progressPct}%</strong>
                        </div>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar-fill" style={{ width: `${progressPct}%`}} />
                        </div>                   
                    </div>
                </section> 

                <div>
                    <section className="card">
                        <h2>🏅My Badges ({earnedCount}/{mockBadges.length})</h2>
                        <div className="badge-grid">
                            {mockBadges.map(({id, icon, name, earned}) => (
                                <div className="badge-item" key={id}>
                                    <div className={`badge-icon ${earned ? "earned" : "notearned"}`}>
                                        {icon}
                                    </div>
                                    <span className="badge-name">{name}</span>
                                </div>    
                            ))}
                        </div>
                        < p className="badge-hint">Keep working on your assignments to unlock more badges! </p>
                    </section>
                    <section className="card motivational">
                        <h2>🏆 You are doing great!</h2>
                        <p>
                            You have completed <strong>{completed} out of {total}</strong> assignments this week.<br />
                            {completed === total ? ' Amazing - well done! 🎉' : ` Just ${total - completed} more to go. You have got this! 🚀`}
                        </p>
                        <div className="motivational-icon"> {/* Displays emoji based on progress */}
                            {progressPct >= 80 ? '👏' : progressPct >= 50 ? '🌱' : '📈'}
                        </div>
                    </section>
                </div>
            </div>     
        </div> 
    </div>
   );
}
export default StudentsPage;