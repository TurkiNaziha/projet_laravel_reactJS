import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Alert,
  } from "reactstrap";
 
  import { Link, useNavigate,useParams } from 'react-router-dom'
  import Swal from "sweetalert2";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser } from '@fortawesome/free-solid-svg-icons';
  import ProjectTables from "../../components/dashboard/AccountsTables";
   import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
  const Compte = () => {
    const styles = {
        buttonContainer: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "30%", // Adjust as needed for your layout
          margin: "0 auto", // Center the container on the page
        },
        formContainer: {
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px', // Optional gap between forms
          width: '100%', // Ensure the container takes up the available width
        },
        formGroup: {
          flex: 1, // Make each FormGroup take equal width
        },
      };

      const[account,setAccount]=useState({})
      const[accounts,setAccounts]=useState([])
      const navigate=useNavigate()// Initialize the navigation hook
      const [files, setFiles] = useState([]);
      
      
      const fetchaccounts=async()=>{
        try {
          const res=await axios.get("http://localhost:8000/api/users/users")
          setAccounts(res.data)
          console.log(res.data)
         // setisLoading(false)
        } catch (error) {
          console.log(error)
        }
    
      }
  
      useEffect(()=>{
        fetchaccounts()
      },[])

      const serverOptions = () => { 
        return {
          process: (fieldName, file, metadata, load, error, progress, abort) => {
          
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'iit2025S1');
          data.append('cloud_name', 'esps');
      data.append('publicid', file.name);
      axios.post('https://api.cloudinary.com/v1_1/esps/image/upload', data)
      .then((response) => response.data)
      .then((data) => {
      
      setAccount({...account,avatar:data.url}) ;
      load(data);
      })
      .catch((error) => {
      console.error('Error uploading file:', error);
      error('Upload failed');
      abort();
      });
      },
      };
      };
      
      async function handleSave(e) {
        e.preventDefault();
    
        // Check if any field in the account object is empty
        const { name, email, password, password_confirmation } = account;
        if (!name || !email || !password || !password_confirmation) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill the fields",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return;
        }
    
        // Check if passwords match
        if (password !== password_confirmation) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Passwords don't match!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return;
        }
    
        // Check if password length is at least 6 characters
        if (password.length < 6) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password must be at least 6 characters long!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return;
        }
    
        // Check if the email is unique
        try {
          const emailCheckResponse = await axios.get(`http://localhost:8000/api/users/users/verify-emailUnique?email=${account.email}`);
          
          if (!emailCheckResponse.data.isUnique) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This email is already taken!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while checking the email, please try again!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return;
        }
    
        // If all checks pass, send the registration request
        try {
          await axios.post("http://localhost:8000/api/users/register", account)
            .then((res) => {
              // Reset the form after successful submission
              setAccount({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                role: "",
              });
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The account has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              setFiles([]); // If files are used

              fetchaccounts()

              navigate("/dashboard/comptes"); // Navigate to the desired page
            });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred, please try again!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      };
    
      // JSX for rendering the alert:
  

    return (
      <Row>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              {/* <i className="bi bi-bell me-2"> </i> */}
              <FontAwesomeIcon icon={faUser} style={{marginRight:20}} />
              Gestion des comptes 
            </CardTitle>
            <CardBody>
  <Form>
  <div style={styles.formContainer}>
    <FormGroup style={styles.formGroup}>
      <Label for="username">Username</Label>
      <Input
        id="username"
        // name="username"
        value={account.name}
        onChange={(e)=>setAccount({...account,name:e.target.value})}
        placeholder="Enter your username"
        type="text"
      />
    </FormGroup>
    <FormGroup style={styles.formGroup}>
      <Label for="email">Email</Label>
      <Input
        id="email"
        // name="email"
        placeholder="Enter your email"
        type="email"
        value={account.email}
        onChange={(e)=>setAccount({...account,email:e.target.value})}
      />
    </FormGroup>
    </div>
    <div style={styles.formContainer}>
    <FormGroup style={styles.formGroup}>
      <Label for="password">Password</Label>
      <Input
        id="password"
        // name="password"
        placeholder="Enter your password"
        type="password"
        value={account.password}
        onChange={(e)=>setAccount({...account,password:e.target.value})}
      />
    </FormGroup>
    <FormGroup style={styles.formGroup}>
      <Label for="verifyPassword">Verify Password</Label>
      <Input
        id="verifyPassword"
        // name="verifyPassword"
        placeholder="Re-enter your password"
        type="password"
        value={account.password_confirmation}
        onChange={(e)=>setAccount({...account,password_confirmation:e.target.value})}
      />
    </FormGroup>
    </div>
    <FormGroup>
      <Label for="role">Role</Label>
      <Input id="role" name="role"
       type="select"
       value={account.role}
        onChange={(e)=>setAccount({...account,role:e.target.value})}>
        <option value="">Select a role</option>
        <option value="Medecin">Medecin</option>
        <option value="Patient">Patient</option>
        <option value="Pharmacien">Pharmacien</option>
        <option value="admin">admin</option>
        
      </Input>
    </FormGroup>
    {/* <FormGroup>
      <Label for="photoIdentity">Photo d'identite</Label>
      <Input
        id="photoIdentity"
        name="photoIdentity"
        accept="image/*" 
        value={account.avatar}
        onChange={(e)=>setAccount({...account,avatar:"  "})}
    
      />
    </FormGroup> */}
      <FormGroup as={Col} md="6" >
        <Label>Photo d'identité</Label>
        <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
            <FilePond

            files={files}
            acceptedFileTypes="image/*"
            onupdatefiles={setFiles}
            allowMultiple={true}
            server={serverOptions()}
            name="file"

            />
            </div>
      </FormGroup>
    {/* <div style={styles.buttonContainer}> */}
      <Button onClick={(e)=>handleSave(e)}>Ajouter</Button>
     
    {/* </div> */}
  </Form>
</CardBody>

          </Card>
        </Col>

          {/* --------------------------------------------------------------------------------*/}
        {/* table-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Col lg="12">
        <ProjectTables accounts={accounts} account={account} setAccount={setAccount} setAccounts={setAccounts}/>
        </Col>
      </Row>

        
        
      
    );
  };
  
  export default Compte;
  