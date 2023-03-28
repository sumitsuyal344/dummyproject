import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  addData,
  getData,
  deleteData,
  viewData,
  updateData,
} from "./redux/actions/DataAction";
import {  Icon, Item } from "semantic-ui-react";
import NavBar from "./components/Navbar";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App(props) {
  const {
    getData,
    addData,
    deleteData,
    dataList,
    viewData,
    viewSingleData,
    updateData,
  } = props;
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  //   const dispatch = useDispatch();
;

  console.log("viewSingleData", viewSingleData.address);

  //   if (viewSingleData !== undefined && viewSingleData !== null) {
  //     setName("shubham");
  //     setAddress("ramnagar");
  //   }

  
  useEffect(() => {
    // dispatch(getData());
    getData();
   
  }, [getData]);

  //   useEffect(() =>{})

  //   const dataList1 = useSelector((state) => state.addReducer.dataList);

  console.log("dataList1", dataList);

  const deleteCategory = (id) => {
    console.log(id);
    // dispatch(deleteData(id));
    deleteData(id);
  };

  const handlechange = (e) => {
    console.log(e.target.value)
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
  };

  const handleSubmit = (e) => {
    let obj = {
      name: name,
      address: address,
    };
    reset();
    console.log("submit");
    console.log("obj",obj);
     addData(obj);
   
  };
 
  return (
    <>
   <NavBar/>
   <br/>
    <div className="wrapper">
      
       <Form className="mx-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control type="text" placeholder="Enter Name..."   name="userName"  onChange={handlechange}  value={name ? name : viewSingleData.name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address..." name="userAddress" onChange={handlechange} value={address ? address : viewSingleData.address} />
      </Form.Group>
     
      <Button variant="primary" type="submit"  className="mb-3" onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
      <Table striped bordered hover variant="dark"  className="mx-3">
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dataList?.map((Item,index)=>{
          return (
            <tr>
              <td>{index+1}</td>
          <td>{Item.name}</td>
          <td>{Item.address}</td>
          <td>{ <Button variant="danger" type="button"  className="mb-3">
        Delete
      </Button>}</td>
            </tr>
          )
        })}
        
       
      </tbody>
    </Table>
    </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dataList: state.addReducer.dataList,
  viewSingleData: state.addReducer.viewSingleData,
});

const mapDispatchToProps = {
  addData,
  getData,
  viewData,
  updateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
