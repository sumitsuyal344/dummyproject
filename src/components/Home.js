import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addData,
  getData,
   deleteData,
  viewData,
  updateData,
} from "../redux/actions/DataAction"
import { MDBSpinner } from 'mdb-react-ui-kit';
// import Paginationcrud from "./components/Pagination";
import NavBar from './Navbar'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Home(props) {
  const {
    getData,
    addData,
     deleteData,
    dataList,
    // viewData,
    viewSingleData,
     updateData,
     loading
  } = props;
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [id, setId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  //   const dispatch = useDispatch();
  console.log("viewSingleData", viewSingleData.address);

  //   if (viewSingleData !== undefined && viewSingleData !== null) {
  //     setName("shubham");
  //     setAddress("ramnagar");
  //   }

  useEffect(() => {
    // dispatch(getData());
    getData();
    let email1=localStorage.getItem("email")
    setEmail(email1)
  }, [getData]);

  //   useEffect(() =>{})

  //   const dataList1 = useSelector((state) => state.addReducer.dataList);

  console.log("dataList1", dataList);

  const handleDeleteClick = (id) => {
    console.log(id);
    // dispatch(deleteData(id));
    deleteData(id);
  };

  const handlechange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    let name = e.target.name;
    if (name === "userName") {
      setName(value);
    }
    if (name === "userAddress") {
      setAddress(value);
    }
  };

  const reset = () => {
    setName("");
    setAddress("");
    setId('')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name: name,
      address: address,
    };
    reset();
    console.log("submit");
    console.log("obj", obj);
    addData(obj);
  };

  const handleUpdateClick=(Item)=>{
    console.log("itemclick",Item)
    setName(Item.name)
    setAddress(Item.address)
    setId(Item.id)
    setIsUpdate(true)
  }

  const handleSubmitUpdate=(e)=>{
    e.preventDefault()
let obj={
  name:name,
  address:address,
  id:id
}
console.log("updateObj",obj)
updateData(obj)
setIsUpdate(false)
// setName();
// setAddress('');
// setId('')
reset()
  }

  return (
    <>
      <NavBar email={email} />
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      {loading?<MDBSpinner grow>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>:null}
      </div>
     
     
      <br />
      <div className="wrapper">
        <Form className="mx-3">
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name..."
              name="userName"
              onChange={handlechange}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address..."
              name="userAddress"
              onChange={handlechange}
              value={address}
            />
          </Form.Group>
{isUpdate?<Button
            variant="primary"
            type="submit"
            className="mb-3"
            onClick={handleSubmitUpdate}
          >
            Update
          </Button>:<Button
            variant="primary"
            type="submit"
            className="mb-3"
            onClick={handleSubmit}
          >
            Submit
          </Button>}
          
        </Form>
      
        <div style={{ marginRight: "30px" }}>
          <Table striped bordered hover variant="dark" className="mx-3">
            <thead>
              <tr>
                <th>#</th>
                <th> Name</th>
                <th>Address</th>
                <th>Action</th>
                {/* <th>Action2</th> */}
              </tr>
            </thead>
            <tbody>
              {dataList?.map((Item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Item.name}</td>
                    <td>{Item.address}</td>
                    <td>
                      {
                        <Button variant="danger"
                         type="button"
                         className="mb-3"
                         onClick={()=>handleDeleteClick(Item.id)}
                         >
                          
                          Delete
                        </Button>
                      }
                      {
                        <Button
                          variant="success"
                          type="button"
                          className="mb-3 mx-2"
                          onClick={()=>handleUpdateClick(Item)}
                        >
                          Update
                        </Button>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* <Paginationcrud/> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dataList: state.addReducer.dataList,
  viewSingleData: state.addReducer.viewSingleData,
  loading:state.addReducer.loading,
});

const mapDispatchToProps = {
  addData,
  getData,
  viewData,
  updateData,
  deleteData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default App;
