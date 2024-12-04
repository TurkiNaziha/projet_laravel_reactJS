import React, {useEffect, useState} from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col, Form, Label, Input, FormGroup,
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserInjured, faUserMd} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Buttons = () => {

  const [medecins, setMedecins] = useState([]);
  const [selectedMedecin, setSelectedMedecin] = useState("");
  // Fonction pour récupérer les médecins
  const fetchMedecins = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/medecins"); // Remplacez par votre URL API
      setMedecins(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des médecins :", error);
    }
  };

  useEffect(() => {
    fetchMedecins();
  }, []);

  const handleMedecinChange = (e) => {
    setSelectedMedecin(e.target.value);
    console.log("Médecin sélectionné :", e.target.value);
  };

  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState([]);
  const fetchspatients=async()=>{
    try {
      const res=await axios.get("http://localhost:8000/api/patients")
      setPatients(res.data.patients )
      console.log(res.data.patients )
      // setisLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchspatients()
  },[])



  const handleSave = async (e) => {
    try {
      e.preventDefault();
      const patientData = { ...patient, medecinID: selectedMedecin };

      console.log("Données du patient :", patient);

      await axios.post("http://localhost:8000/api/patients", patientData)
          .then((res) => {
            setPatient({
              nom: "",
              prenom: "",
              email: "",
              telephone: "",
              medecinID: "",
              maladie:""
            });
            setSelectedMedecin("");
            fetchspatients();

          });
    } catch (error) {
      console.error("Erreur lors de la creation d'un patient:", error);
    }
  };
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <FontAwesomeIcon icon={faUserInjured} style={{marginRight:20}} />
              Gestion des patients
            </CardTitle>
            <CardBody>
              <Form>
                <div>
                  <FormGroup >
                    <Label for="exampleEmail">Nom</Label>
                    <Input
                        id="name"
                        type="string"
                        name="nom"
                        placeholder="nom"
                        value={patient.nom}
                        onChange={(e) => setPatient ({...patient,nom:e.target.value})}

                    />
                    </FormGroup>
                    <FormGroup >
                    <Label for="exampleEmail">Prénom</Label>
                    <Input
                        id="prenom"
                        type="string"
                        name="prenom"
                        placeholder="prenom"
                        value={patient.prenom}
                        onChange={(e) => setPatient ({...patient,prenom:e.target.value})}


                    />
                    </FormGroup>
                    <FormGroup >
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        id="mail"
                        type="email"
                        name="email"
                        placeholder="email"
                        value={patient.email}
                        onChange={(e) => setPatient ({...patient,email:e.target.value})}


                    />
                    </FormGroup>
                    <FormGroup >
                    <Label for="exampleEmail">Numéro de Telephone</Label>
                    <Input
                        id="num"
                        type="string"
                        name="telephone"
                        placeholder="telephone"
                        value={patient.telephone}
                        onChange={(e) => setPatient ({...patient,telephone:e.target.value})}


                    />

                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Médecin</Label>
                    <Input
                        id="medecinID"
                        type="select"
                        name="medecinID"
                        value={selectedMedecin} // Lier l'état
                        onChange={handleMedecinChange} // Gestionnaire d'événements
                    >
                      <option value="">-- Sélectionner votre médecin --</option>
                      {medecins.map((medecin) => (
                          <option key={medecin.id} value={medecin.id}>
                            {medecin.nom}{medecin.prenom} - {medecin.specialite}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup >
                    <Label for="exampleEmail">Maladie</Label>
                    <Input
                        id="maladie"
                        type="string"
                        name="maladie"
                        placeholder="maladie"
                        value={patient.maladie}
                        onChange={(e) => setPatient({...patient, maladie: e.target.value})}

                    />
                  </FormGroup>
                </div>
                <Button onClick={(e)=>handleSave(e)}>Ajouter</Button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>






      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      {/*<Row>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-1*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" color="primary">*/}
      {/*            primary*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="secondary">*/}
      {/*            secondary*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="success">*/}
      {/*            success*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="info">*/}
      {/*            info*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="warning">*/}
      {/*            warning*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="danger">*/}
      {/*            danger*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="link">*/}
      {/*            link*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-2*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Outline Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" outline color="primary">*/}
      {/*            primary*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" outline color="secondary">*/}
      {/*            secondary*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" outline color="success">*/}
      {/*            success*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" outline color="info">*/}
      {/*            info*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" outline color="warning">*/}
      {/*            warning*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" outline color="danger">*/}
      {/*            danger*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-3*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Large Size Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" color="primary" size="lg">*/}
      {/*            Large Button*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="secondary" size="lg">*/}
      {/*            Large Button*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-4*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Small Size Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" color="primary" size="sm">*/}
      {/*            Small Button*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="secondary" size="sm">*/}
      {/*            Small Button*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-6*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Active State Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" color="primary" size="lg" active>*/}
      {/*            Primary link*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="secondary" size="lg" active>*/}
      {/*            Link*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-7*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Disabled State Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" color="primary" size="lg" disabled>*/}
      {/*            Primary button*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="secondary" size="lg" disabled>*/}
      {/*            Button*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-5*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Block Buttons*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <div className="button-group">*/}
      {/*          <Button className="btn" color="primary" size="lg" block>*/}
      {/*            Block level button*/}
      {/*          </Button>*/}
      {/*          <Button className="btn" color="secondary" size="lg" block>*/}
      {/*            Block level button*/}
      {/*          </Button>*/}
      {/*        </div>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-6*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Checkbox(Stateful Buttons)*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <h5>Checkbox Buttons</h5>*/}
      {/*        <ButtonGroup>*/}
      {/*          <Button*/}
      {/*            color="primary"*/}
      {/*            onClick={() => onCheckboxBtnClick(1)}*/}
      {/*            active={cSelected.includes(1)}*/}
      {/*          >*/}
      {/*            One*/}
      {/*          </Button>*/}
      {/*          <Button*/}
      {/*            color="primary"*/}
      {/*            onClick={() => onCheckboxBtnClick(2)}*/}
      {/*            active={cSelected.includes(2)}*/}
      {/*          >*/}
      {/*            Two*/}
      {/*          </Button>*/}
      {/*          <Button*/}
      {/*            color="primary"*/}
      {/*            onClick={() => onCheckboxBtnClick(3)}*/}
      {/*            active={cSelected.includes(3)}*/}
      {/*          >*/}
      {/*            Three*/}
      {/*          </Button>*/}
      {/*        </ButtonGroup>*/}
      {/*        <p className="mb-0">Selected: {JSON.stringify(cSelected)}</p>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col xs="12" md="6">*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    /!* Card-6*!/*/}
      {/*    /!* --------------------------------------------------------------------------------*!/*/}
      {/*    <Card>*/}
      {/*      <CardTitle tag="h6" className="border-bottom p-3 mb-0">*/}
      {/*        Radio Buttons (Stateful Buttons)*/}
      {/*      </CardTitle>*/}
      {/*      <CardBody className="">*/}
      {/*        <h5>Radio Buttons</h5>*/}
      {/*        <ButtonGroup>*/}
      {/*          <Button*/}
      {/*            color="primary"*/}
      {/*            onClick={() => onRadioBtnClick(1)}*/}
      {/*            active={rSelected === 1}*/}
      {/*          >*/}
      {/*            One*/}
      {/*          </Button>*/}
      {/*          <Button*/}
      {/*            color="primary"*/}
      {/*            onClick={() => onRadioBtnClick(2)}*/}
      {/*            active={rSelected === 2}*/}
      {/*          >*/}
      {/*            Two*/}
      {/*          </Button>*/}
      {/*          <Button*/}
      {/*            color="primary"*/}
      {/*            onClick={() => onRadioBtnClick(3)}*/}
      {/*            active={rSelected === 3}*/}
      {/*          >*/}
      {/*            Three*/}
      {/*          </Button>*/}
      {/*        </ButtonGroup>*/}
      {/*        <p className="mb-0">Selected: {rSelected}</p>*/}
      {/*      </CardBody>*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/*/!* --------------------------------------------------------------------------------*!/*/}
      {/*/!* Row*!/*/}
      {/*/!* --------------------------------------------------------------------------------*!/*/}

      {/*/!* --------------------------------------------------------------------------------*!/*/}
      {/*/!* End Inner Div*!/*/}
      {/*/!* --------------------------------------------------------------------------------*!/*/}
    </div>
  );
};

export default Buttons;
