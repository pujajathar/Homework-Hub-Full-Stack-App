
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login ({role, setUser}) {
    const roleEmoji = { teacher: "👩‍🏫" , student: "👩‍🎓", parent: "👨‍👩‍👧‍👦"}; //emoji icons for user role
    const navigate = useNavigate(); //navigation to diff. pages without refreshing 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = (e) => {   
        e.preventDefault();   //prevents browser from refreshing page
        setError(""); //it clears old error
        if (!email.includes("@")) {
            setError("Please enter valid email address.")
            return;
        }
        if (!email.includes(".")) {
            setError("Please enter valid email address.")
            return;
        }
        if (password.length < 6) {
            setError ("Password must contain at least 6 characters.");
            return;
        }
        const user ={  //creates user object after successful validation
            email,
            role
        };
        setUser(user); //sends logged-in user info to parent component 
        
        if(role === "teacher"){
            navigate("/teachers");
        }
        if(role === "parent") {
            navigate("/parents");
        }
        if(role === "student") {
            navigate("/students");
        }
    };
    return (       
        <div className="login-page">
            <div className="login-container">
                <h1>Welcome back! <span className="wave">👋</span></h1>
                <h2>      {/* display role-emoji and role name dynamically*/}
                {roleEmoji[role]}{role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
                <span> Login </span>
                </h2>
                <p>Sign in to access your dashboard</p>
                {error && (   
                    <p className="error-msg">{error}</p>
                )}
                <form onSubmit={handleLogin}>   {/* Login form */}
                    <div className="input-group" >
                    <label htmlFor="email">Email</label>
                    <input className="input-box"
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> 
                   </div>
                   <div className="input-group">
                    <label>Password </label>                    
                    <input className="input-box"
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                   </div>
                    <button className={`submitbtn ${role}-btn`} 
                    type="submit">
                        Sign in as {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
                    </button>
                </form>
            </div>
       </div>
    )   
}
export default Login;