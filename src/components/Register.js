import React ,{useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';
function Register(props) {
  const navigate = useNavigate("/");
    const {
      registerUser
      } = props;
    const [formData, setFormData] = useState({})
    const handleChange=(e)=>{
setFormData({
    ...formData,
    [e.target.name]:e.target.value
})
    }
    console.log("formdata",formData)
const handleRegister=()=>{
    registerUser(formData,navigate )
}

  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' className='w-100' name='username'  onChange={handleChange}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='form2' type='email' name='email' onChange={handleChange}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput  minLength="8" required label='Password' id='form3' type='password' name='password' onChange={handleChange}/>
              </div>

              {/* <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' id='form4' type='password'/>
              </div> */}

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={()=>handleRegister()}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://img.lovepik.com/element/45009/2311.png_860.png' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}
const mapStateToProps = (state) => ({
    dataList: state.addReducer.dataList,
    viewSingleData: state.addReducer.viewSingleData,
  });
  
  const mapDispatchToProps = {
    registerUser
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;