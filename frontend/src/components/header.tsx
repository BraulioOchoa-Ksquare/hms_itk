import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { clearStateAuth, selectUID } from "./slices/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { clearStateDoctor } from "./slices/doctorSlice";
import { clearStateAppointment } from "./slices/appointmentsSlice";
import { clearStatePatient } from "./slices/patientsSlice";
import { clearStateProfile } from "./slices/profileSlice";
import { clearStateUser } from "./slices/signUpSlice";

export const Auth = () => {
  const userAuth = useAppSelector(selectUID);
  return userAuth;
};

const NavBarComp = () => {
  const auth = Auth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const page = useLocation();

  const logOut = () => {
    dispatch(clearStateAuth());
    dispatch(clearStateAppointment());
    dispatch(clearStateDoctor());
    dispatch(clearStatePatient());
    dispatch(clearStateProfile());
    dispatch(clearStateUser());

    navigate("/home");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Hospital
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            {auth === undefined && (
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/signup"}>
                  Signup
                </Nav.Link>
              </>
            )}
            {auth !== undefined && (
              <>
                 {page.pathname !== "/dashboard" && (
                  <Nav.Link as={Link} to={"/dashboard"}>
                    Dashboard
                  </Nav.Link>
                )}

                  <Nav.Link as={Link} to={"/"}>
                    Logout
                  </Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComp;
