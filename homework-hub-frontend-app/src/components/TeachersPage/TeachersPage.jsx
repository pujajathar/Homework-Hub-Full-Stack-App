
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockAssignments, mockStudents } from "../mockData";
import AssignmentForm from "../AssignmentForm/AssignmentForm";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import teacher from "../../assets/images/teacher.png";
import './TeachersPage.css';
import AssignmentList from "../AssignmentList/AssignmentList";
import {getAssignments, createAssignment } from "../Api/AssignmentApi.js";
import Header from "../Header/Header";

function TeachersPage ( { handleDelete, assignments, setAssignments, setUser } ) {

    const parents = [   //mock parent data used to display parent messages
    {id: 1, name: "Sarah Johnson", child: "Emma Johnson",lastMsgDate: "2026-07-06"},
    {id: 2, name: "Michael Smith", child: "Liam Smith", lastMsgDate: "2026-07-05"},
    { id: 3, name: "Jessica Brown", child: "Olivia Brown", lastMsgDate: "2026-07-07"}
    ];
    
    const [showForm, setShowForm] = useState(false); //controls whether the assignment form is visible
    const [editAssignments, setEditAssignments] = useState(null); //stores assignments currently being edited
    const [replyId, setReplyId] = useState(null); //stores which parent reply section is open
    const [replyText, setReplyText] = useState(""); //stores reply message text
    const [replySent, setReplySent] = useState(false); //controls reply success message display

    useEffect(() => {
    getAssignments()
        .then(data => {
            setAssignments(data);
        })
        .catch(error => {
            console.error("Error fetching assignments:", error);
        });
    }, [setAssignments]);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    } 
    const handleEdit = (id) => {  /* opens form to edit/modify assignmet */
        const assignment = assignments.find((item) => item.id === id);
        setEditAssignments(assignment); //stores assignment data & opens form
        setShowForm(true);
    };
   const handleAddAssignment = async(newAssignment) => { //handles adding new assignment
        try {
            const savedAssignment = await createAssignment(newAssignment);
            setAssignments(prev => [...prev, savedAssignment]);

            setEditAssignments(null); //clears edit mode after assignment is added
            setShowForm(false); //closes form after assignment is added
        } catch (error) {
            console.error("Error creating assignment:", error);
        }
    };   
    const handleReply = (e) => {  //reply to parents
        e.preventDefault();
        setReplySent(true);  //shows reply sent message
        setReplyText("");   //clears reply text after reply is submitted
        setTimeout(() => {
            setReplySent(false); 
            setReplyId(null); 
        }, 2000); //hides success msg after 2 seconds
    }
    return (      
    <div className="home">  
       <div className="page">
        <header className="dashboard-header">          
            <div className="header-text">
            <h1>Teacher Dashboard</h1>
            <p>Welcome back, Ms. Olivia!</p> 
            </div> 
            <div className="profile">
                <img src={teacher} alt="Teacher Image" />
                <span>Ms. Olivia</span>
            </div>
        </header>

        <section className="stats-row">
            <div className="stat-card">
                <div className="stat-num">{assignments.length}</div>
                <div className="stat-label">Assignments</div>
            </div>
            <div className="stat-card">
                <div className="stat-num green">{mockStudents.length}</div> {/* Total students */}
                <div className="stat-label">Students</div>
            </div>
            <div className="stat-card">
                <div className="stat-num amber">
                    {/* sum of all completed assignments */}
                    {mockStudents.reduce((sum, s) => sum + s.completedAssignments, 0)}
                </div>
                <div className="stat-label">Submissions</div>
            </div>
            <div className="stat-card">
                <div className="stat-num indigo">{parents.length}</div>
                <div className="stat-label">Parents Messages</div>
            </div>
        </section>    
         <div className="two-col">
               <div className="card">
                    <div className="card-header">
                <h2 style={ {'fontSize':"25px"}}>📝 Assignments 📝</h2> 
                    <button
                    className="btn btn-green" variant="green"
                    onClick={() => {   //cleares edit mode when creating new assignment
                        setEditAssignments(null);
                        setShowForm(true);
                    }}
                    >
                + Create New
                </button>
                  </div>
                  {showForm && (  
            <AssignmentForm 
            assignment={editAssignments}
            onSubmit={handleAddAssignment}
            onCancel={() => setShowForm(false)}         
            />
            )
            }        
            <AssignmentList 
            assignments={assignments}
            showActions={true}
            handleDelete={handleDelete}
            onEdit={handleEdit}
            />
         </div>   
          <div>
            <section className="card">
                <h2>Student Progress</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Students</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStudents.map(s => {
                            const progressPct = Math.round((s.completedAssignments / s.totalAssignments) * 100);
                        return (
                            <tr key={s.id}>
                                <td><strong>{s.name}</strong></td>
                                <td>
                                    <div className="progress-cell">
                                        <div className="progress-bar-wrap">
                                            <div className="progress-bar-fill" style={{ width: `${progressPct}%`}} />
                                        </div>
                                        <span className="pct-label">{progressPct}%</span>
                                    </div>
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </section>

            <section className="card">
                <h2>Respond to Parents</h2>
                <ul className="message-list">
                    {parents.map(p => (
                        <li key={p.id} className="parent-message-item">
                            <div className="parent-message-row">
                                <div>
                                    <div className="message-from">{p.name}</div>
                                    <div className="message">Re: {p.child} . {p.lastMsgDate}</div>
                                </div>
                                <button
                                className="btn btn-green"
                                onClick={() => setReplyId(replyId === p.id ? null : p.id)}
                                >
                                Reply
                                </button>
                            </div>
                            {replyId === p.id && (  //conditional rendering interactive feature-display reply section/ 
                                                    //only show reply box for selected parent
                                replySent? (
                                    <p className="reply-sent">✅ Reply Sent</p>
                                ) : (
                                    <form className="reply-form" onSubmit={handleReply}>
                                        <input value={replyText}
                                        placeholder="Type your reply..."
                                        onChange={e => setReplyText(e.target.value)}
                                        required
                                        />
                                        <Button variant="green"  className="btn btn-sm" type="submit" >Send</Button>
                                    </form>
                                )
                            )}
                        </li>
                    ))}
                </ul>
            </section>
          </div>
        </div>
    </div>
</div>     
);  
};
export default TeachersPage;    
     
      

           
               
                
           