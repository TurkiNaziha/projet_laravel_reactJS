import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout} from '../SignUp/authservice'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({"id":0,"name":"naziha","email":"turkinaziha2001@gmail.com","email_verified_at":null,"role":"admin","avatar":"http://res.cloudinary.com/esps/image/upload/v1733300323/images/yoaxjx773vx6p9vei0of.jpg","isActive":1,"created_at":"2024-12-04T08:18:50.000000Z","updated_at":"2024-12-04T08:18:50.000000Z"});
  // const location = useLocation();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };


  const handleLogout = async () => {
    try {
      // Call the logout API
      // await logout();

      // Clear localStorage or any client-side tokens
      localStorage.removeItem("CC_Token");
      localStorage.removeItem("user");

      // Navigate to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  useEffect(() => {
    //   const userData = localStorage.getItem("user");
    //   console.log("User data in localStorage:", userData);
    //  setCurrentUser(userData)
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      console.log("User data in localStorage:", user);
      setCurrentUser(user);
    }
    }, []);
  return (
    <Navbar  dark expand="md" className="fix-header" style={{ backgroundColor: "#4cd4bc" , borderBottom: "5px solid #FFF"}}>
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          {/* <NavItem>
            <Link to="/starter" className="nav-link">
              Starter
            </Link>
          </NavItem> */}
          {/* <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem> */}
          <UncontrolledDropdown inNavbar nav>
            {/* <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle> */}
            {/* <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu> */}
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={currentUser.avatar}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem> */}
            <DropdownItem divider />
            {/* <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem> */}
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
