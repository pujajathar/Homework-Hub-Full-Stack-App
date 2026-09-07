import { useState, useEffect } from "react";
import "./AssignmentForm.css";


function AssignmentForm ({onSubmit, assignment: editAssignment, onCancel, handleDelete}) { //assignment propery passing from teachers page

    const [assignment, setAssignment] = useState({
            category: editAssignment?.category || "", // ?. is optional chaining, it prevent error if editAssignment doesn't exists
            title: editAssignment?.title || "",    // means use the existing category if an assignment is being edited, otherwise use an empty string ""
            dueDate: editAssignment?.dueDate || "",
            status: editAssignment?.status || "pending"  // default status is pending if not provided
    });
    const isEditing = Boolean(editAssignment); //checks if assignment is being edited
    useEffect (() => {      
        if (editAssignment) {  // if user clicks edit on existing assignment then form is filled with it's data
            setAssignment(editAssignment);
        } else {   //if not clears the form and this reset the form for creating new assignment
            setAssignment({
                category:"",
                title: "",
                dueDate: "",
                status:"pending"
            });
        }
    }, [editAssignment]);  //useEffect runs when editAssignment changes
    
    const handleChange = (e) => {    //updates assignment form when user types
            const {name, value} = e.target;
            setAssignment({
                ...assignment,
                [name]:value
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const assignmentToSave = {
            ...assignment
        };
        if(editAssignment) {  //if assignment is being edited then include the id of the assignment to be updated
            assignmentToSave.id = editAssignment.id;
        }
        onSubmit(assignmentToSave);  //calls the onSubmit function passed from TeachersPage component
    };
   
    return (
        <div className="assignmet-form-container">
            <h2>{editAssignment ? "Update Assignment" : "Create Assignment"}</h2> {/*changes title of form when editing or creating */}
            <form className="assignment-form" onSubmit={handleSubmit}>
                          {/* When editing assignments displays only selected assignment name */}
                {isEditing ? (       
                    <input 
                    type="text"
                    name="category"
                    value={assignment.category}
                    readOnly
                    />
                            
                ) : (       //when creating displays options of categories
                <label>Category:
                <select 
                    name="category"
                    value={assignment.category}
                    onChange={handleChange} >
                   <option value="">Select Category:</option>
                   <option value="Math">Math</option>
                   <option value="Science">Science</option>
                   <option value="Art">Art</option>
                   <option value="English">English</option>
                   <option value="Social-Studies">Social-Studies</option>
                </select>                
                </label>
                )}
               
                <label>Title:
                    <input type="text"
                    name="title"
                    value={assignment.title} 
                    onChange={handleChange}
                    placeholder="Title of Assignment..."
                    required
                    />
                </label>
                <label>Due Date:
                    <input type="date"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={handleChange}
                    required
                    />
                </label>
            <div className="button-group">  
                <button className="submit-btn" type="submit">      {/* button text changes depending on editing or creating */}
                    {editAssignment? "Update Assignment" : "Create Assignment"}
                </button>
                <button className="cancel-btn" type="button" onClick={onCancel}>
                    Cancel
                </button> 
            </div>                       
            </form>
        </div>
    );
};
export default AssignmentForm;
                    
                   
                   
           