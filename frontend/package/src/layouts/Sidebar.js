import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPrescriptionBottle, faUserMd, faUserInjured, faPills } from "@fortawesome/free-solid-svg-icons";

// Define the navigation items
const navigation = [
  {
    title: "Comptes",
    href: "comptes",
    icon: <FontAwesomeIcon icon={faUser} />,
    rolesAllowed: ["admin"] // Visible only to admin
  },
  {
    title: "Medicaments",
    href: "Medicaments",
    icon: <FontAwesomeIcon icon={faPills} />,
    rolesAllowed: ["admin", "Pharmacien"] // Visible to admin and pharmacien
  },
  {
    title: "Medecins",
    href: "badges",
    icon: <FontAwesomeIcon icon={faUserMd} />,
    rolesAllowed: ["admin", "medecin","Pharmacien"] // Visible to admin and medecin
  },
  {
    title: "Patients",
    href: "buttons",
    icon: <FontAwesomeIcon icon={faUserInjured} />,
    rolesAllowed: ["admin", "medecin", "Pharmacien", "Patient"] // Visible to admin, medecin, and pharmacien
  },
  {
    title: "Pharmaciens",
    href: "cards",
    icon: <FontAwesomeIcon icon={faPrescriptionBottle} />,
    rolesAllowed: ["admin", "Pharmacien"] // Visible to admin and pharmacien
  }
];
  // {
  //   title: "Grid",
  //   href: "grid",
  //   icon: "bi bi-columns",
  // },
  // {
  //   title: "Table",
  //   href: "table",
  //   icon: "bi bi-layout-split",
  // },
  // {
  //   title: "Forms",
  //   href: "forms",
  //   icon: "bi bi-textarea-resize",
  // },
  // {
  //   title: "Breadcrumbs",
  //   href: "breadcrumbs",
  //   icon: "bi bi-link",
  // },
  // {
  //   title: "About",
  //   href: "about",
  //   icon: "bi bi-people",
  // },

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "starter",
//     icon: "bi bi-speedometer2",
//   },
//   {
//     title: "Alert",
//     href: "alerts",
//     icon: "bi bi-bell",
//   },
//   {
//     title: "Badges",
//     href: "badges",
//     icon: "bi bi-patch-check",
//   },
//   {
//     title: "Buttons",
//     href: "buttons",
//     icon: "bi bi-hdd-stack",
//   },
//   {
//     title: "Cards",
//     href: "cards",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Grid",
//     href: "grid",
//     icon: "bi bi-columns",
//   },
//   {
//     title: "Table",
//     href: "table",
//     icon: "bi bi-layout-split",
//   },
//   {
//     title: "Forms",
//     href: "forms",
//     icon: "bi bi-textarea-resize",
//   },
//   {
//     title: "Breadcrumbs",
//     href: "breadcrumbs",
//     icon: "bi bi-link",
//   },
//   {
//     title: "About",
//     href: "about",
//     icon: "bi bi-people",
//   },
// ];

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState({"id":0,"name":"naziha","email":"turkinaziha2001@gmail.com","email_verified_at":null,"role":"admin","avatar":"http://res.cloudinary.com/esps/image/upload/v1733300323/images/yoaxjx773vx6p9vei0of.jpg","isActive":1,"created_at":"2024-12-04T08:18:50.000000Z","updated_at":"2024-12-04T08:18:50.000000Z"});
  const location = useLocation();
  // Assuming 'user' is the object you want to store
// const user = { name: 'John Doe', email: 'john@example.com' };

// Correctly stringify the object before storing it
// localStorage.setItem("user", JSON.stringify(user));
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

  
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  // let location = useLocation();
  const filteredNavigation = navigation.filter(item =>
    item.rolesAllowed.includes(currentUser?.role)
  );
  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
          className="profilebg"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dyzh0aong/image/upload/v1733319780/462579411_521130227592431_921157361335074824_n_vqloih.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image
          }}
        >
                <div className="p-3 d-flex">
          <img src={currentUser.avatar} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">{currentUser.name}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {filteredNavigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                {navi.icon} 
                {/* <i className={navi.icon}></i> */}
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {/* <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
