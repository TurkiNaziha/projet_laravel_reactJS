import { Card, CardBody, CardTitle, CardSubtitle, Table , Modal, Button ,  ModalHeader, ModalBody,ModalFooter,  Form,
  FormGroup,  Label,Input} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useNavigate,useParams } from 'react-router-dom'

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



const AccountsTables = ({accounts, account,setAccount, setAccounts}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Pour contrôler l'ouverture du modal
  const [selectedcompte, setSelectecompte] = useState({}); // Pour stocker le médicament 
  const [files, setFiles] = useState([]);
  const navigate=useNavigate()


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
            setSelectecompte({ ...selectedcompte, avatar: data.url });
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


  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission default action
    
   
  
    try {
      if (selectedcompte) {
        // Editing an existing medication
        console.log("Updating:", selectedcompte);
        await axios.put(
          `http://localhost:8000/api/users/modifyUser/${selectedcompte.id}`,
          selectedcompte
        );
      } 
  
      // Reset the form
      // setAccount({
      
      // });
      setSelectecompte({})
      setFiles([]);
      setIsModalOpen(false); // Close modal
      // setSelectedMedicament(null); // Clear selected medication
       fetchaccounts(); // Refresh the list
      navigate("/dashboard/comptes"); // Redirect to the dashboard
    } catch (error) {
      console.error("Save operation failed:", error);
    }
  };

  const handleDelete = async (id) => {
    // Demander une confirmation avant la suppression
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
      try {
        // Envoyer la requête DELETE à l'API avec l'ID de l'article à supprimer
        await axios.delete(`http://localhost:8000/api/users/delete/${id}`);
  
        // Recharger la liste des médicaments après suppression
        fetchaccounts();
      } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
      }
    }
  };


  const handleEdit = (med) => {
    
    setSelectecompte(med); // This should set the selected medication correctly
    // setMedicament(med); // Pre-fill the form with the selected medication details
    setIsModalOpen(true); // Open the modal
  // setAccount(med)
  console.log("a",med)
  setFiles(med.avatar)
  
      setFiles([{ source: med.image, options: { type: 'local' } }]); // Précharger l'image dans FilePond
      setIsModalOpen(true);
    };
    const styles = {
      formContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        width: '100%',
      },
      formGroup: {
        flex: 1,
      },
    };

  return (
    <div>
      <Card>
        <CardBody>
          {/* <CardTitle tag="h5">Project Listing</CardTitle> */}
          {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle> */}

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Employés</th>
                <th>Role</th>

                {/* <th>Status</th>
                <th>Weeks</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.role}</td>
             
                  <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(tdata)}>
    <FontAwesomeIcon icon={faEdit} /> {/* Icon for Modify */}
    </button>
  <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(tdata.id)} >
    <FontAwesomeIcon icon={faTrashAlt} /> {/* Icon for Delete */}
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>


      
      {/* Modal d'édition */}
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
        <ModalHeader toggle={() => setIsModalOpen(false)}>
          Modifier ce compte
        </ModalHeader>
        <ModalBody>
          <Form>
          <div style={styles.formContainer}>
          <FormGroup tyle={styles.formGroup}>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  // name="username"
                   value={selectedcompte.name}
                  onChange={(e)=>setSelectecompte({...selectedcompte,name:e.target.value})}
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
                  value={selectedcompte.email}
                  onChange={(e)=>setSelectecompte({...selectedcompte,email:e.target.value})}
                />
              </FormGroup>
              </div>
              <div style={styles.formContainer}>
              <FormGroup style={styles.formGroup}>
                <Label for="password">Old Password</Label>
                <Input
                  id="password"
                  // name="password"
                  placeholder="Enter your old password"
                  type="password"
                  // value={account.password}
                  // onChange={(e)=>setAccount({...account,password:e.target.value})}
                />
              </FormGroup>
              <FormGroup style={styles.formGroup}>
                <Label for="verifyPassword">New Password</Label>
                <Input
                  id="verifyPassword"
                  // name="verifyPassword"
                  placeholder="Enter your new password"
                  type="password"
                  // value={account.password_confirmation}
                  // onChange={(e)=>setAccount({...account,password_confirmation:e.target.value})}
                />
              </FormGroup>
              </div>
              <FormGroup>
                  <Label for="role">Role</Label>
                  <Input id="role" name="role"
                  type="select"
                  value={selectedcompte.role}
                    onChange={(e)=>setSelectecompte({...selectedcompte,role:e.target.value})}>
                    <option value="">Select a role</option>
                    <option value="medecin">Medecin</option>
                    <option value="patient">Patient</option>
                    <option value="pharmacien">Pharmacien</option>
                    <option value="admin">admin</option>
                    
                  </Input>
                </FormGroup>



                <FormGroup  >
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Enregistrer</Button> 
          <Button color="secondary" onClick={() => setIsModalOpen(false)}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AccountsTables;
