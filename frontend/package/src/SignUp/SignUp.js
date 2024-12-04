import { useState, useEffect } from "react";
import "./SignUpmodule.css";
import { useRoutes } from "react-router-dom";
import Themeroutes from "../routes/Router";
import { Link, useNavigate,useParams , useLocation} from 'react-router-dom'
import {signin} from './authservice'
// function SignUp() {
const SignUp = () => {
    // const initialValues = {
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     type:"",
    // };
    // const[account,setAccount]=useState({})
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    // const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [type, setType] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setFormValues({ ...formValues, [name]: value });
    };

    
    const Test = () => {
        const routing = useRoutes(Themeroutes);
      
        return <div className="dark">{routing}</div>;
      
      
        
      };


  
    // const handleSubmit = (e) => {
    //    // e.preventDefault(); // Prevent default form behavior
    //     // Perform form validation and processing logic here
    //     // setFormErrors(validate(formValues));
    //     // setIsSubmit(true);
        
       
    //    navigate("/dashboard/Medicaments"); 
 
    // };

    // useEffect(() => {
    //     console.log(formErrors);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         console.log(formValues);
    //     }
    // }, [formErrors, formValues, isSubmit]);
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission (if it's part of a form)
        
        const objetuser = {
          email: email,
          password: password,
          role: role
        };
      
        signin(objetuser).then((result) => {
          if (result.data.success) {
            localStorage.setItem("CC_Token", result.data.token);
            localStorage.setItem("user", result.data.user);
            //const userData = localStorage.getItem("user");
            localStorage.setItem("user", JSON.stringify(result.data.user));  
            // console.log("User data in localStorage:", userData);
            // localStorage.setItem("user", JSON.stringify(user));
            // Navigate to the dashboard page
            navigate("/dashboard/Medicaments");
            window.location.reload();
            // Force the page to reload after navigation
           
      
          } else {
            alert("Error");
          }
        }).catch((error) => {
          alert("Error");
          console.log(error);
        });
      };
      

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
        }
        return errors;
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">
                        Signed in successfully
                    </div>
                ) : (
                    // console.log("Entered Details", formValues)
                    console.log("Entered Details")

                )}

<form onSubmit={handleSubmit}>
    <h1>Login</h1>
    <div className="ui divider"></div>
    <div className="ui form">
        {/* <div className="field">
            <label>Username</label>
            <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formValues.username}
                onChange={handleChange}
            />
        </div>
        <p>{formErrors.username}</p> */}
        <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <p>{formErrors.email}</p>
        <div className="field">
            <label>Password</label>
            <input
                type="password"
                value={password}
                
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <p>{formErrors.password}</p>
        {/* <div className="field">
            <label>Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formValues.confirmPassword}
                onChange={handleChange}
            />
        </div>
        <p>{formErrors.confirmPassword}</p> */}

        <div className="field">
            <label>Role</label>
            <select
                name="role"
                value={type}
                onChange={(e) => setType(e.target.value)} // Update the state
            >
                <option value="">Select a role</option>
                <option value="medecin">Medecin</option>
                <option value="patient">Patient</option>
                <option value="pharmacien">Pharmacien</option>
                <option value="admin">admin</option>

            </select>
        </div>
        <p>{formErrors.role}</p>
        <button className="fluid ui button blue" type="submit">Log In</button>
    </div>
</form>

                {/* <div className="text">
                    Already have an account? <span>Login</span>
                </div> */}
            </div>{" "}
        </>
    );
}

export default SignUp;
