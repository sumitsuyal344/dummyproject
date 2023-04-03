import React,{useState} from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/UserAction";
function Login(props){
    const navigate=useNavigate()
    const {loginUser}=props;
    const [formData, setFormData] = useState({})
    const handleChange=(e)=>{
setFormData({
    ...formData,
    [e.target.name]:e.target.value
})
    }
    console.log("formdata",formData)
const handleLogin=()=>{
    loginUser(formData,navigate )
}
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://media.istockphoto.com/id/1135341047/vector/login-page-on-laptop-screen-notebook-and-online-login-form-sign-in-page-user-profile-access.jpg?s=612x612&w=0&k=20&c=EsJEsevxVZujj_IU_nLz4tZcvmcXTy7sQt03bpfz3ZQ="
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <h2
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h2>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                name="email"
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                name="password"
                onChange={handleChange}
              />

              <MDBBtn className="mb-4 px-5" color="dark" size="lg"  onClick={()=>handleLogin()}>
                Login
              </MDBBtn>
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a href="/Register" style={{ color: "#393f81" }} onClick={navigate("/")} >
                  Register here
                </a>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
const mapStateToProps = (state) => ({
  dataList: state.addReducer.dataList,
  viewSingleData: state.addReducer.viewSingleData,
});

const mapDispatchToProps = {
 loginUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login;
