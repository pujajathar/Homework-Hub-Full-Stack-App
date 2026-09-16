import { useState, useEffect } from "react";
import "./AssignmentForm.css";


function AssignmentForm ({onSubmit, assignment: editAssignment, onCancel}) { //assignment propery passing from teachers page

    const [assignment, setAssignment] = useState({
            category: editAssignment?.category || "", // ?. is optional chaining, it prevent error if editAssignment doesn't exists
            title: editAssignment?.title || "", 
            description: editAssignment?.description || "", // means use the existing category if an assignment is being edited, otherwise use an empty string ""
            dueDate: editAssignment?.dueDate || "",
            status: editAssignment?.status || "pending"  // default status is pending if not provided
    });

    const [file, setFile] = useState(null); //Stores the selected attachment file
    //Stores existing attachment for assignment
    const [existingAttachments, setExistingAttachments] = useState([]);

    const [errors, setErrors] = useState({}); //stores validation error messages for each form field

    const isEditing = Boolean(editAssignment); //checks if assignment is being edited
    useEffect (() => {      
        if (editAssignment) {  // if user clicks edit on existing assignment then form is filled with it's data
            setAssignment(editAssignment);

            //fetch existing attachment for this assignment
            fetch(`http://localhost:8080/attachments/assignment/${editAssignment.id}`)
            .then((response) => response.json())
            .then((data) => {
                setExistingAttachments(data);
            })
            .catch((error) => {
                console.error("{Error fetching attachment:", error);
                setExistingAttachments(null);
            })
        } else {   //if not clears the form and this reset the form for creating new assignment
            setAssignment({
                category:"",
                title: "",
                description: "",
                dueDate: "",
                status:"pending"
            });
        }
        setErrors({}); //clears previous validation errors when form changes.
    }, [editAssignment]);  //useEffect runs when editAssignment changes
    
    const handleChange = (e) => {    //updates assignment form when user types
            const {name, value} = e.target;
            setAssignment({
                ...assignment,
                [name]:value
            });
            setErrors ((previousErrors) => ({ //clears error message once user starts correcting value
                ...previousErrors,
                [name]: ""
            }));
    };

    const handleFileChange = (e) => { // Stores file selected by user
        setFile(e.target.files[0]);
    };

    const handleDeleteAttachment = async(attachmentId) => {
        try {
            const response = await fetch (
                `http://localhost:8080/attachments/${attachmentId}`,
                {
                    method: "DELETE",
                }
            );
            if(!response.ok) {
                throw new Error("Failed to delete assignment");
            }

            //Removes deleted attachment from the form immediately
            setExistingAttachments((previousAttachments) => 
                previousAttachments.filter (
                    (attachment) => attachment.id !== attachmentId
                )
            );
        } catch (error) { console.error("Error deleting attachment:", error);

        }
        
    };

    //Checks the required form fields before submitting.
    const validateForm = () => {
        const newErrors = {};
        if(!assignment.category) {
            newErrors.category = "Please select a category.";
        }
        if(!assignment.title.trim()) {
            newErrors.title = "Title is required.";
        }
        if(!assignment.description.trim()) {
            newErrors.description = "Description is required.";
        }
        if(!assignment.dueDate) {
            newErrors.dueDate = "Due date is required.";
        } else{
            const today = new Date().toISOString().split("T")[0];
            if(assignment.dueDate < today) {
                newErrors.dueDate = "Due date can not be in the past."
            }
        }
        setErrors(newErrors);  //Saves all validation errors in state.

        return Object.keys(newErrors).length === 0; //Return true when there are no validation errors.
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) { //stop the form from submitting if validation fails
            return;
        }
        const assignmentToSave = { //Include the selected file with assignment data
            ...assignment,
            file: file
        };
        if(editAssignment) {  //if assignment is being edited then include the id of the assignment to be updated
            assignmentToSave.id = editAssignment.id;
        }
        onSubmit(assignmentToSave);  //calls the onSubmit function passed from TeachersPage component
                                    // Send assignment and selected file to teacherpage
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
                {/*Displays category validation error */}
                {errors.category && (
                    <p className="form-error">{errors.category}</p>
                )}               
                </label>
                )}
               
                <label>Title:
                    <input type="text"
                    name="title"
                    value={assignment.title} 
                    onChange={handleChange}
                    placeholder="Title of Assignment..."                  
                    />
                    {/* displays title validation error */}
                    {errors.title && (
                        <p className="form-error">{errors.title}</p>
                    )}
                </label>
                <label>Description:
                    <textarea 
                    name="description"
                    value={assignment.description}
                    onChange={handleChange}
                    placeholder="Description of Assignment..."
                    rows={4}                  
                    />
                    {/* displays description validation error */}
                    {errors.description && (
                        <p className="form-error">{errors.description}</p>
                    )}
                </label>
                <label>Due Date:
                    <input type="date"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    />
                    {/* displays due date validation error */}
                    {errors.dueDate && (
                        <p className="form-error">{errors.dueDate}</p>
                    )}
                </label>
                <label>Attachment:
                    {/* Displays existing attachment when editing an assignment */}
                   {existingAttachments.map((attachment) => (
                    <div className="existing-attachment" key={attachment.id}>
                        <span>{attachment.fileName}</span>
                        {/* view attachment in the browser */}
                        <a 
                        href={`http://localhost:8080/attachments/${attachment.id}/view`}
                        target="_blank"
                        rel="noopener noreferrer">
                            View
                        </a>
                        {/* Download the attachment */}
                        <a href={`http://localhost:8080/attachments/${attachment.id}`}
                        
                        rel="noopener noreferrer">
                            Download
                        </a>

                        {/* Delete attachment */}
                        <button 
                        type="button"
                        onClick={() => handleDeleteAttachment(attachment.id)}
                        >
                            Delete
                        </button>
                    </div>
                   ))}
                    {/* Allows user to select new attachment */}
                    <input type="file"
                    onChange={handleFileChange} />
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
                    
                   
                   
           