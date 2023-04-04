import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
function NavBar({ email }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("email");
    let email = localStorage.getItem("email");
    if (!email) {
      navigate("/");
    }
  };
  console.log("emailnav", email);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>

        <MDBBtn
          style={{ marginRight: "15px" }}
          rounded
          color="light"
          size="sm"
          rippleColor="dark"
          onClick={() => handleLogOut()}
        >
          Logout
        </MDBBtn>
      </Navbar>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          marginRight: "10px",
          marginTop:'10px'
        }}
      >
{email?<h5 style={{fontFamily:'cursive'}}>{"Hello" +  email}</h5>:null}
        
      </div>
    </>
  );
}
// const mapStateToProps = (state) => ({
//   dataList: state.addReducer.dataList,
//   viewSingleData: state.addReducer.viewSingleData,
// });

// const mapDispatchToProps = {
//   logOutUser
// };
//export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;
