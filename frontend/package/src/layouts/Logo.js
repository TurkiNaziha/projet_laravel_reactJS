import logo from "../assets/images/logos/logo.png"; // Use default import for the image
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Logo" width={"150px"}/>
    </Link>
  );
};

export default Logo;
