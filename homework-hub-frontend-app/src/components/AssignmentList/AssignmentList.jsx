
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
  
    return (
        <div className="assignment-list">
                            {/*display assignment*/ }
            {assignments.map((assignment) => (
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
                        <p className="due">
                            Due on : {assignment.dueDate}
                        </p>
                    </div>
                    </div>
                        <div className="assignment-right">  {/*right side */}
                            <span className={`tag ${assignment.category?.toLowerCase()}`}>
                                {assignment.category}
                            </span>
                        {showActions && ( //only display buttons if showActions is true
                            <div className='buttonspace'>
                            <button className='edit-btn'
                            onClick={() => onEdit(assignment.id)}>
                                Edit
                            </button>
                            <button className='delete-btn'
                            onClick={() => handleDelete(assignment.id)}>
                                Delete
                            </button>
                            </div>
                        )}
                        </div>
                </div>  
            ))}
        </div> 
    );
};
        export default AssignmentList;
        
            