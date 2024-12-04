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



const MedecinTables = ({medecins, setMedecins}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Pour contrôler l'ouverture du modal
  const [selectedcompte, setSelectecompte] = useState({}); // Pour stocker le médicament 
  const [files, setFiles] = useState([]);
  const navigate=useNavigate()
  const [medecin, setMedecin] = useState({
      nom: "",
      prenom: "",
      mail: "",
      telephone: "",
      specialite: ""
  });
  const specialites = [
      "Généraliste",
      "Cardiologie",
      "Dermatologie",
      "Gynécologie",
      "Pédiatrie",
      "Neurologie",
      "Ophtalmologie",
      "Psychiatrie",
      "Orthopédie",
      "Radiologie",
      "Urologie"
  ];

  const fetchMedecins=async()=>{
    try {
      const res=await axios.get("http://localhost:8000/api/medecins")
      setMedecins(res.data)
      console.log(res.data)
     // setisLoading(false)
    } catch (error) {
      console.log(error)
    }

  }




  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission default action
    console.log("warniwarni",medecin)
   
  
    try {
      if (medecin) {
        // Editing an existing medication
        console.log("Updating:", medecin);
        await axios.put(`http://localhost:8000/api/medecins/${medecin.id}`, medecin
        );
      } 
  
      // Reset the form
      // setAccount({
      
      // });
      setSelectecompte({})
      setFiles([]);
      setIsModalOpen(false); // Close modal
      // setSelectedMedicament(null); // Clear selected medication
       fetchMedecins(); // Refresh the list
      navigate("/dashboard/badges"); // Redirect to the dashboard
    } catch (error) {
      console.error("Save operation failed:", error);
    }
  };

  const handleDelete = async (id) => {
    // Demander une confirmation avant la suppression
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
      try {
        // Envoyer la requête DELETE à l'API avec l'ID de l'article à supprimer
        await axios.delete(`http://localhost:8000/api/medecins/${id}`);
  
        // Recharger la liste des médicaments après suppression
        fetchMedecins();
      } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
      }
    }
  };


  const handleEdit = (med) => {
    setMedecin(med)
    // setSelectecompte(med); // This should set the selected medication correctly
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
                <th>Nom & Prenom</th>
                
                <th>Email</th>
                <th>Tel</th>
                <th>Specialite</th>
             

                {/* <th>Status</th>
                <th>Weeks</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medecins.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                  
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.nom}</h6>
                        <span className="text-muted">{tdata.prenom}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.mail}</td>
                  <td>{tdata.telephone}</td>
                  <td>{tdata.specialite}</td>
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
         
          <FormGroup style={styles.formGroup} >
                              <Label for="exampleEmail">Nom</Label>
                              <Input
                                  id="name"
                                  type="string"
                                  name="nom"
                                  placeholder="nom"
                                  value={medecin.nom}
                                  onChange={(e)=>setMedecin({...medecin,nom:e.target.value})}

                              />

                          </FormGroup>
                          <FormGroup style={styles.formGroup}>
                              <Label for="exampleEmail">Prénom</Label>
                              <Input
                                  id="name"
                                  type="string"
                                  name="prenom"
                                  placeholder="prenom"
                                  value={medecin.prenom}
                                  onChange={(e)=>setMedecin({...medecin,prenom:e.target.value})}


                              />

                          </FormGroup>
                        
                      
             
           </div>


              <div style={styles.formContainer}>
          
              <FormGroup style={styles.formGroup}>
                             <Label for="exampleEmail">Email</Label>
                             <Input
                                 id="name"
                                 type="email"
                                 name="mail"
                                 placeholder="Email"
                                 value={medecin.mail}
                                 onChange={(e)=>setMedecin({...medecin,mail:e.target.value})}


                             />

                         </FormGroup>
                         <FormGroup style={styles.formGroup} >
                             <Label for="exampleEmail">Numéro de telephone</Label>
                             <Input
                                 id="name"
                                 type="string"
                                 name="telephone"
                                 placeholder="N° de telephone"
                                 value={medecin.telephone}
                                 onChange={(e)=>setMedecin({...medecin,telephone:e.target.value})}

                             />

                         </FormGroup>
              </div>
        
              <FormGroup style={styles.formGroup} >
                             <Label for="specialite">Spécialité</Label>
                             <Input
                                 type="select"
                                 name="specialite"
                                 id="specialite"
                                 value={medecin.specialite}
                                 onChange={(e) => setMedecin({ ...medecin, specialite: e.target.value })}
                             >
                                 <option value="">Sélectionner une spécialité</option>
                                 {specialites.map((specialite, index) => (
                                     <option key={index} value={specialite}>
                                         {specialite}
                                     </option>
                                 ))}
                             </Input>
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

export default MedecinTables;