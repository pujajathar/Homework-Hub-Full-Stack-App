
import { useState } from 'react';
import './AssignmentList.css';
function AssignmentList ({
    assignments, 
    toggleComplete, 
    completedAssignments = [],  //receives an array containing completed assignment id's.
    showCheckbox=true,
    showActions=false,
    onEdit,
    handleDelete
 }) {

    const [deleteId, seetDeleteId] = useState(null);
  
    return (
        <div className="assignment-list">
                            {/*display assignment*/ }
            {Array.isArray(assignments) && assignments.map((assignment) => (
                <div key={assignment.id} className="assignment-row"> {/* creates one row for each assignment */}
                    <div className="assignment-left"> {/*left side */}
                        {toggleComplete && (  //only show this button if togglecomplete exists
                        <button 
                            className="check-btn"
                            onClick={() => toggleComplete(assignment.id)}>
                            {completedAssignments.includes(assignment.id) ? "✅":"⬜"} {/*if assignment id exists show checkbox otherwise show empty box */}
                        </button>
                        )}
                    <div>
                        <h3 className={completedAssignments.includes(assignment.id) ? "completed" : ''}> {/* adds CSS class conditionaly used for text decoration line through */}
                            {assignment.title}
                        </h3>
                        <p className="description">
                            {assignment.description}
                        </p>
                        <p className="due">
                            Due on : {assignment.dueDate}
                        </p>

                                   
                                 
                    </div>
                    </div>
                        <div className="assignment-right">  {/*right side */}
                            <span className={`tag ${assignment.category?.toLowerCase()}`}>
                                {assignment.category}
                            </span>
                       {showActions && (
                            <div className="buttonspace">

                                <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() => onEdit(assignment.id)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => seetDeleteId(assignment.id)}
                                >
                                    Delete
                                </button>

                                {deleteId === assignment.id && (
                                    <div className='delete-confirmation'>
                                        <span>Are you sure?</span>
                                        <button
                                        type='button'
                                        onClick={() => {
                                            handleDelete(assignment.id);
                                            seetDeleteId(null);
                                        }}
                                        >
                                            Yes
                                        </button>
                                        <button
                                        type='button'
                                        onClick={() => seetDeleteId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                            </div>
                        )}
                         </div>
                         
                        {/* Displays attachments when an assignment has files
                        and Display view & download options for attachment */}
                        {assignment.attachments?.length > 0 && (
                            <div className='attachments'>
                                <strong>Attachment:</strong>

                                {assignment.attachments.map((attachment) => (
                                    <div key={attachment.id}>
                                        <span>📎{attachment.fileName}</span>

                                        {/* Opens attachment in new browser tab */}
                                        <a 
                                        href={`http://localhost:8080/attachments/${attachment.id}/view`}
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                            View
                                        </a>

                                        {/* Download the attachment */}
                                        <a 
                                        href={`http://localhost:8080/attachments/${attachment.id}`}
                                        download>
                                            Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                      
                </div>  
            ))}
        </div> 
    );
};
        export default AssignmentList;
        
            