
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';
import AssignmentList from './components/AssignmentList/AssignmentList';
import ParentsPage from './components/ParentsPage/ParentsPage';
import TeachersPage from './components/TeachersPage/TeachersPage';
import StudentsPage from './components/StudentsPage/StudentsPage';
import { mockAssignments, mockStudents, mockBadges, mockMessages } from './components/mockData';
import AssignmentForm from './components/AssignmentForm/AssignmentForm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const ProtectedRoute = ({allowedRole, children}) => {  //checks whether the user is allowed to access page
    if(!user || user.role !== allowedRole) {
      return ( <Login       
        role={allowedRole}
        setUser={setUser}
        />
      );
    }
    return children;
  };
  const toggleComplete = (id) => { //handles marking an assignment as complete or incomplete
      setCompletedAssignments((prev) => {
        if(prev.includes(id)) {
          return prev.filter((assignmentId) => assignmentId !== id);
        }
        return [...prev, id];
    });
  };
  const handleDelete = (id) => {    /* deletes assignment */ 
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id)); //creates new array with every assignment except whose id matches 
    };                                                                           //with id passed in and remove that assignment 

 return (
  <div className='app'>
    <Header user={user} setUser={setUser} />
  <main>
     <Routes> 
    <Route path='/' element={<HomePage setUser={setUser} />} />
    <Route path='/aboutus' element={<AboutPage />} />
    <Route path='/parents' element={
    <ProtectedRoute allowedRole="parent">
    <ParentsPage 
    setUser={setUser}
    assignments={assignments} 
    setAssignments={setAssignments}
    toggleComplete={toggleComplete}
    completedAssignments={completedAssignments}
    />
    </ProtectedRoute>
   } />
    <Route path='/teachers' element={
    <ProtectedRoute allowedRole="teacher">
    <TeachersPage 
    setUser={setUser}
    assignments={assignments}
    setAssignments={setAssignments}
    handleDelete={handleDelete}
   />
   </ProtectedRoute>
  } /> 
    <Route path='/students' element={
    <ProtectedRoute allowedRole="student">
    <StudentsPage 
    setUser={setUser}
    assignments={assignments}
    setAssignments={setAssignments}
    toggleComplete={toggleComplete}
    completedAssignments={completedAssignments}
    />
    </ProtectedRoute>
  } />
  </Routes>
   </main>
  <Footer />
  </div>
  
 );
}

export default App;   
    
 

