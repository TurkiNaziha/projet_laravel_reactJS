import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
  } from "reactstrap";
  
  const CardMedicament = (props) => {
    return (
      <Card>
        <CardImg alt="Card image cap" src={props.image} />
        <CardBody className="p-4">
          <CardTitle tag="h5">{props.nom}</CardTitle>
          <CardSubtitle>{props.label}</CardSubtitle>
          <CardText className="mt-3">{props.prix}$</CardText> 
          <Button style={{marginRight:20}}color={props.color}>Modifier</Button>
          <Button color={props.color}>Supprimer</Button>
        </CardBody>
      </Card>
    );
  };
  
  export default CardMedicament;
  