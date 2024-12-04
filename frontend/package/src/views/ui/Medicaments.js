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
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Swal from 'sweetalert2';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Forms = () => {

  const [medicament, setMedicament] = useState({
    nom: "",
    label: "",
    prix: "",
    quantite: "",
    image: "",
  });
  const [medicaments, setMedicaments] = useState([]);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Pour contrôler l'ouverture du modal
  const [selectedMedicament, setSelectedMedicament] = useState(null); // Pour stocker le médicament à modifier
  const navigate = useNavigate(); // Initialiser le hook de navigation

  // Fonction pour récupérer les médicaments
  const fetchMedicaments = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/medicaments");
      setMedicaments(res.data.medicaments);
      console.log(res.data.medicaments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicaments();
  }, []);

  // Options de serveur pour l'upload d'images
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
            setMedicament({ ...medicament, image: data.url });
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

  // Validation des champs
  const validate = () => {
    const newErrors = {};
    if (!medicament.nom) newErrors.nom = "Le nom du médicament est requis.";
    if (!medicament.label) newErrors.label = "Le label du médicament est requis.";
    if (!medicament.prix) {
      newErrors.prix = "Le prix est requis.";
    } else if (isNaN(medicament.prix)) {
      newErrors.prix = "Le prix doit être un nombre valide.";
    }
    if (!medicament.quantite) {
      newErrors.quantite = "La quantité est requise.";
    } else if (isNaN(medicament.quantite) || medicament.quantite <= 0) {
      newErrors.quantite = "La quantité doit être un entier positif.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction de sauvegarde du médicament
  const handleSave = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    // Vérifier si tous les champs sont remplis
    if (!medicament.nom || !medicament.label || !medicament.prix || !medicament.quantite) {
      Swal.fire({
        icon: 'error',
        title: 'Champs manquants',
        text: 'Veuillez remplir tous les champs pour ajouter un médicament.',
      });
      return;
    }

    // Si la validation est échouée, on ne continue pas
    if (!validate()) {
      return;
    }
  
    try {
      // Vérifiez si nous sommes en mode édition ou ajout
      if (selectedMedicament) {
        // Si un médicament est sélectionné (mode édition), envoyez une requête PUT pour mettre à jour les informations
        await axios.put(`http://localhost:8000/api/medicaments/${selectedMedicament.id}`, medicament);

      } else {
        // Sinon, envoyez une requête POST pour ajouter un nouveau médicament
        await axios.post("http://localhost:8000/api/medicaments", medicament);
      }
  
      // Réinitialiser l'état pour le prochain formulaire
      setMedicament({
        nom: "",
        label: "",
        prix: "",
        quantite: "",
        image: "",
      });
      setFiles([]); // Réinitialiser les fichiers téléchargés
  
      // Fermer le modal
      setIsModalOpen(false);
  
      // Recharger la liste des médicaments
      fetchMedicaments();
  
      // Rediriger l'utilisateur vers la page des médicaments
      navigate("/dashboard/Medicaments");
    } catch (error) {
      console.log(error);
    }
  };

  // Ouvrir le modal pour éditer un médicament
  const handleEdit = (med) => {
    setSelectedMedicament(med);
    setMedicament({
      nom: med.nom,
      label: med.label,
      prix: med.prix,
      quantite: med.quantite,
      image: med.image,
    });
    setFiles([{ source: med.image, options: { type: 'local' } }]); // Précharger l'image dans FilePond
    setIsModalOpen(true);
  };

  // Supprimer un médicament avec confirmation
  const handleDelete = async (id) => {
    // Demander une confirmation avant la suppression
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas récupérer ce médicament après sa suppression !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Envoyer la requête DELETE à l'API avec l'ID de l'article à supprimer
          await axios.delete(`http://localhost:8000/api/medicaments/${id}`);
          Swal.fire('Supprimé !', 'Le médicament a été supprimé.', 'success');
          fetchMedicaments(); // Recharger la liste des médicaments
        } catch (error) {
          console.error("Erreur lors de la suppression du médicament:", error);
          Swal.fire('Erreur', "Une erreur est survenue pendant la suppression.", 'error');
        }
      }
    });
  };

  // Styles du formulaire
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
      {/* Formulaire pour l'ajout de médicament */}
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <FontAwesomeIcon icon={faPills} style={{ marginRight: 20 }} />
              Gestion Medicaments
            </CardTitle>
            <CardBody>
              <Form>
                <div style={styles.formContainer}>
                  <FormGroup style={styles.formGroup} invalid={!!errors.nom}>
                    <Label for="Nom_de_Medicament">Nom de Medicament</Label>
                    <Input
                      id="Nom_de_Medicament"
                      name="Nom_de_Medicament"
                      placeholder="Nom de Medicament"
                      type="text"
                      value={medicament.nom}
                      onChange={(e) => setMedicament({ ...medicament, nom: e.target.value })}
                    />
                    {errors.nom && <FormFeedback>{errors.nom}</FormFeedback>}
                  </FormGroup>

                  <FormGroup style={styles.formGroup} invalid={!!errors.label}>
                    <Label for="Label_de_Medicament">Label de Medicament</Label>
                    <Input
                      id="Label_de_Medicament"
                      name="Label_de_Medicament"
                      placeholder="Label de Medicament"
                      type="text"
                      value={medicament.label}
                      onChange={(e) => setMedicament({ ...medicament, label: e.target.value })}
                    />
                    {errors.label && <FormFeedback>{errors.label}</FormFeedback>}
                  </FormGroup>
                </div>

                <div style={styles.formContainer}>
                  <FormGroup style={styles.formGroup} invalid={!!errors.prix}>
                    <Label for="Prix">Prix</Label>
                    <Input
                      id="Prix"
                      name="Prix"
                      placeholder="Prix du médicament"
                      type="number"
                      value={medicament.prix}
                      onChange={(e) => setMedicament({ ...medicament, prix: e.target.value })}
                    />
                    {errors.prix && <FormFeedback>{errors.prix}</FormFeedback>}
                  </FormGroup>

                  <FormGroup style={styles.formGroup} invalid={!!errors.quantite}>
                    <Label for="Quantite">Quantité</Label>
                    <Input
                      id="Quantite"
                      name="Quantite"
                      placeholder="Quantité du médicament"
                      type="number"
                      value={medicament.quantite}
                      onChange={(e) => setMedicament({ ...medicament, quantite: e.target.value })}
                    />
                    {errors.quantite && <FormFeedback>{errors.quantite}</FormFeedback>}
                  </FormGroup>
                </div>

                <FormGroup as={Col} md="6">
                  <Label>Image</Label>
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

                <Button onClick={handleSave}>Ajouter</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Affichage des médicaments */}
      <Row>
        {medicaments.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Card className="blog-card">
              <img src={blg.image} alt={blg.nom} className="card-img-top" />
              <CardBody>
                <CardTitle tag="h5">{blg.nom}</CardTitle>
                <h6>{blg.label}</h6>
                <p>Prix : {blg.prix}</p>
                <p>Quantité : {blg.quantite} unités</p>
                <Button 
                  color="primary" 
                  size="sm" 
                  className="w-100" 
                  onClick={() => handleEdit(blg)} 
                >
                  Éditer
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  className="w-100"
                  onClick={() => handleDelete(blg.id)} // Appel de handleDelete pour supprimer l'article
                  style={{ marginTop: '10px' }}
                >
                  Supprimer
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal d'édition */}
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
        <ModalHeader toggle={() => setIsModalOpen(false)}>
          Modifier un médicament
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="Nom_de_Medicament">Nom de Medicament</Label>
              <Input
                id="Nom_de_Medicament"
                name="Nom_de_Medicament"
                placeholder="Nom de Medicament"
                type="text"
                value={medicament.nom}
                onChange={(e) => setMedicament({ ...medicament, nom: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="Label_de_Medicament">Label de Medicament</Label>
              <Input
                id="Label_de_Medicament"
                name="Label_de_Medicament"
                placeholder="Label de Medicament"
                type="text"
                value={medicament.label}
                onChange={(e) => setMedicament({ ...medicament, label: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="Prix">Prix</Label>
              <Input
                id="Prix"
                name="Prix"
                placeholder="Prix du médicament"
                type="number"
                value={medicament.prix}
                onChange={(e) => setMedicament({ ...medicament, prix: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="Quantite">Quantité</Label>
              <Input
                id="Quantite"
                name="Quantite"
                placeholder="Quantité du médicament"
                type="number"
                value={medicament.quantite}
                onChange={(e) => setMedicament({ ...medicament, quantite: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>Image</Label>
              <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                <FilePond
                  files={files}  // Assurez-vous que "files" contient l'image à afficher dans le modal
                  acceptedFileTypes="image/*"
                  onupdatefiles={setFiles}
                  allowMultiple={false}  // Permet uniquement une image
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

export default Forms;
