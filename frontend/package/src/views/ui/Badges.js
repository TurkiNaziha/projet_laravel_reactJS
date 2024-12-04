import {Badge, Button, Card, CardBody, CardTitle, Row, Col,Form, FormGroup, Label, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMd} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectTables from "../../components/dashboard/MedecinTables";



const Badges = () => {

    //const [medecin, setMedecin] = useState({});
    const [medecins, setMedecins] = useState([]);
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

    const fetchmedecins=async()=>{
        try {
            const res=await axios.get("http://localhost:8000/api/medecins")
            setMedecins(res.data)
            console.log(res.data )
            // setisLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        fetchmedecins()
    },[])

    const handleSave = async (e) => {
        try {
            e.preventDefault();
            console.log("Données du medecin :", medecin);

            await axios.post("http://localhost:8000/api/medecins", medecin)
                .then((res) => {
                    setMedecin(res.data)
                    console.log(res.data)
                    setMedecin({
                        nom: "",
                        prenom: "",
                        mail: "",
                        telephone: "",
                        specialite: ""
                    });

                    fetchmedecins();

                });
        } catch (error) {
            console.error("Erreur lors de la creation d'un medecin:", error);
        }
    };
  return (

    <div>
      <Row>
        <Col>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <FontAwesomeIcon icon={faUserMd} style={{marginRight:20}} />
                    Gestion des medecins
                </CardTitle>
                <CardBody>
                    <Form>
                       <div>
                           {/*<div style={styles.formContainer}>*/}
                            <FormGroup >
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
                            <FormGroup >
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
                           <FormGroup >
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
                           <FormGroup >
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
                           <FormGroup>
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
                       </div>
                        <Button onClick={(e)=>handleSave(e)}>Ajouter</Button>
                    </Form>
                </CardBody>
            </Card>

        </Col>
        <Col lg="12">
        <ProjectTables medecins={medecins} setMedecins={setMedecins}/>
        </Col>
      </Row>


    {/*//   /!* --------------------------------------------------------------------------------*!/*/}
    {/*//   /!* Row*!/*/}
    {/*//   /!* --------------------------------------------------------------------------------*!/*/}
    {/*//   <Row>*/}
    {/*//     <Col xs="12" md="12" sm="12">*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       /!* Card-1*!/*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       <Card>*/}
    {/*//         <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
    {/*//           Badges*/}
    {/*//         </CardTitle>*/}
    {/*//         <CardBody className="">*/}
    {/*//           <div>*/}
    {/*//             <h1>*/}
    {/*//               Heading <Badge color="secondary">New</Badge>*/}
    {/*//             </h1>*/}
    {/*//             <h2>*/}
    {/*//               Heading <Badge color="secondary">New</Badge>*/}
    {/*//             </h2>*/}
    {/*//             <h3>*/}
    {/*//               Heading <Badge color="secondary">New</Badge>*/}
    {/*//             </h3>*/}
    {/*//             <h4>*/}
    {/*//               Heading <Badge color="secondary">New</Badge>*/}
    {/*//             </h4>*/}
    {/*//             <h5>*/}
    {/*//               Heading <Badge color="secondary">New</Badge>*/}
    {/*//             </h5>*/}
    {/*//             <h6>*/}
    {/*//               Heading <Badge color="secondary">New</Badge>*/}
    {/*//             </h6>*/}
    {/*//           </div>*/}
    {/*//         </CardBody>*/}
    {/*//       </Card>*/}
    {/*//     </Col>*/}
    {/*//     <Col xs="12" md="12" sm="12">*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       /!* Card-2*!/*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       <Card>*/}
    {/*//         <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
    {/*//           Badges with Button*/}
    {/*//         </CardTitle>*/}
    {/*//         <CardBody className="">*/}
    {/*//           <div>*/}
    {/*//             <Button color="primary" outline>*/}
    {/*//               Notifications <Badge color="secondary">1</Badge>*/}
    {/*//             </Button>*/}
    {/*//             <Button color="secondary" className="ms-3" outline>*/}
    {/*//               Notifications <Badge color="secondary">2</Badge>*/}
    {/*//             </Button>*/}
    {/*//             <Button color="info" className="ms-3" outline>*/}
    {/*//               Notifications <Badge color="secondary">3</Badge>*/}
    {/*//             </Button>*/}
    {/*//             <Button color="warning" className="ms-3" outline>*/}
    {/*//               Notifications <Badge color="secondary">4</Badge>*/}
    {/*//             </Button>*/}
    {/*//             <Button color="danger" className="ms-3" outline>*/}
    {/*//               Notifications <Badge color="secondary">5</Badge>*/}
    {/*//             </Button>*/}
    {/*//           </div>*/}
    {/*//         </CardBody>*/}
    {/*//       </Card>*/}
    {/*//     </Col>*/}
    {/*//     <Col xs="12" md="6">*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       /!* Card-3*!/*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       <Card>*/}
    {/*//         <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
    {/*//           Badges with Contextual variations*/}
    {/*//         </CardTitle>*/}
    {/*//         <CardBody className="">*/}
    {/*//           <div>*/}
    {/*//             <Badge color="primary">Primary</Badge>*/}
    {/*//             <Badge color="secondary" className="ms-3">*/}
    {/*//               Secondary*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="success" className="ms-3">*/}
    {/*//               Success*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="danger" className="ms-3">*/}
    {/*//               Danger*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="warning" className="ms-3">*/}
    {/*//               Warning*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="info" className="ms-3">*/}
    {/*//               Info*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="light" className="ms-3">*/}
    {/*//               Light*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="dark" className="ms-3">*/}
    {/*//               Dark*/}
    {/*//             </Badge>*/}
    {/*//           </div>*/}
    {/*//         </CardBody>*/}
    {/*//       </Card>*/}
    {/*//     </Col>*/}
    {/*//     <Col xs="12" md="6">*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       /!* Card-4*!/*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       <Card>*/}
    {/*//         <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
    {/*//           Badges with Pills*/}
    {/*//         </CardTitle>*/}
    {/*//         <CardBody className="">*/}
    {/*//           <div>*/}
    {/*//             <Badge color="primary" pill>*/}
    {/*//               Primary*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="secondary" className="ms-3" pill>*/}
    {/*//               Secondary*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="success" className="ms-3" pill>*/}
    {/*//               Success*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="danger" className="ms-3" pill>*/}
    {/*//               Danger*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="warning" className="ms-3" pill>*/}
    {/*//               Warning*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="info" className="ms-3" pill>*/}
    {/*//               Info*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="light" className="ms-3" pill>*/}
    {/*//               Light*/}
    {/*//             </Badge>*/}
    {/*//             <Badge color="dark" className="ms-3" pill>*/}
    {/*//               Dark*/}
    {/*//             </Badge>*/}
    {/*//           </div>*/}
    {/*//         </CardBody>*/}
    {/*//       </Card>*/}
    {/*//     </Col>*/}
    {/*//     <Col xs="12" md="6">*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       /!* Card-5*!/*/}
    {/*//       /!* --------------------------------------------------------------------------------*!/*/}
    {/*//       <Card>*/}
    {/*//         <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
    {/*//           Badges with Links*/}
    {/*//         </CardTitle>*/}
    {/*//         <CardBody className="">*/}
    {/*//           <div>*/}
    {/*//             <Badge href="" color="primary">*/}
    {/*//               Primary*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="secondary" className="ms-3">*/}
    {/*//               Secondary*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="success" className="ms-3">*/}
    {/*//               Success*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="danger" className="ms-3">*/}
    {/*//               Danger*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="warning" className="ms-3">*/}
    {/*//               Warning*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="info" className="ms-3">*/}
    {/*//               Info*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="light" className="ms-3">*/}
    {/*//               Light*/}
    {/*//             </Badge>*/}
    {/*//             <Badge href="" color="dark" className="ms-3">*/}
    {/*//               Dark*/}
    {/*//             </Badge>*/}
    {/*//           </div>*/}
    {/*//         </CardBody>*/}
    {/*//       </Card>*/}
    {/*//     </Col>*/}
    {/*//   </Row>*/}
    {/*//   /!* --------------------------------------------------------------------------------*!/*/}
    {/*//   /!* Row*!/*/}
    {/*//   /!* --------------------------------------------------------------------------------*!/*/}
    </div>
  );
};

export default Badges;
