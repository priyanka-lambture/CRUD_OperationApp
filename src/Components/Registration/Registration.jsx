import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import React, { useState } from 'react';


function Registration() {

    const [show, setShow] = useState(true);
    const [allData, setAllData] = useState([{}]);
    const [buttonstate, setButtonState] = useState(true);
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState({
        Fullname: "",
        Email: "",
        Password: "",
        MobileNumber: ""
    })

    function getInputData(e) {
        let target = e.target;
        let value = target.value;
        let key = target.name;
        // console.log(key," ",value)
        return (
            setInput((old) => {
                return {
                    ...old,
                    [key]: value
                }
            })
        )

    }

    let temp = {}

    const getFormData = (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);

        // console.log(form);
        // console.log(formData);
        // console.log(formData.get("Fullname"));
        // console.log(formData.get("Email"));
        // console.log(formData.get("Password"));
        // console.log(formData.get("Profile"));
        // console.log(formData.get("Mobilenumber"));


        for (let data of formData.entries()) {
            let key = data[0];
            let value = data[1];
            if (typeof (value) == 'object') {
                value = URL.createObjectURL(value)
            }
            //    console.log(value);
            temp[key] = value;
            // console.log(temp);  
        }


    }
    function updateData(e) {
        e.preventDefault();
        // alert("Update Data")/
        // alert(index)
        getFormData(e);
        // console.log(temp)
      const tempData = [...allData]; 
      console.log(tempData)
      tempData[index] = temp;
      console.log(tempData) 
        return(
            setShow(false),
            setAllData(tempData)
        )

        }
    function editData(item) {
        // console.log(item);
        return (
            setShow(true),
            setInput(item),
            setButtonState(false),
            setIndex(item.index)
        )
    }
    
    function insertData(e) {
        e.preventDefault();
        // alert("Insert Data")
        getFormData(e);
        return (
            setAllData((old) => {
                return [
                    ...old,
                    temp
                ]
            }),
            setShow(false),
            setInput({
                Fullname: "",
                Email: "",
                Password: "",
                MobileNumber: ""

            }))

    }

    


    function deleteUser(index) {
        // console.log(item);
        let tempdata = [...allData];
        // console.log(tempdata);
        tempdata.splice(index, 1);
        window.confirm("Do you want to delete data?");

        //   console.log(tempdata);
        return (
            setAllData(tempdata)
        )


    }
    function addButton() {
        return (
            setShow(true),
            setInput({
                Fullname: "",
                Email: "",
                Password: "",
                MobileNumber: ""

            }),
            setButtonState(true)
        )
    }

    function Tr({ item }) {
        // console.log(item.index);
        return (
            <>
                <tr className='text-center'>
                    <td>{item.index + 1}</td>
                    <td>{item.Fullname}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password}</td>
                    <td>{item.MobileNumber}</td>
                    <td><img src={item.Profile} alt="" width={50} height={50} className='rounded-circle' /></td>
                    <td>
                        <Button className='me-2' onClick={() => editData(item)}>
                            <i className="fa fa-edit"></i></Button>
                        <Button variant='danger' onClick={() => { deleteUser(item.index) }}><i className="fa fa-trash"></i></Button>
                    </td>


                </tr>


            </>
        )
    }


    return (
        <>
            <h1 className='text-center'>Registration Details</h1>

            <Button className='position-absolute bottom-0 end-0 me-3 mb-3 rounded-circle'
                onClick={addButton}>
                <i className='fa fa-plus'></i>
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Registration Form</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={buttonstate ? insertData : updateData}>
                        <Form.Group>
                            <Form.Label>FullName</Form.Label>
                            <Form.Control type='text' name='Fullname'
                                placeholder='Enter Your Full Name' onChange={getInputData}
                                value={input.Fullname} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' name='Email' placeholder='Enter Your Email' onChange={getInputData}
                                value={input.Email} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='Password'
                                placeholder='Enter Your Password'
                                onChange={getInputData} value={input.Password}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>MobileNumber</Form.Label>
                            <Form.Control type='tel' name='Mobilenumber'
                                placeholder='Enter Your Mobile Number' onChange={getInputData}
                                value={input.MobileNumber} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Profile</Form.Label>
                            <Form.Control type='file' name='Profile' placeholder='Insert Your Image' />
                        </Form.Group>

                        <br></br>

                        <Form.Group className='mt-3'>
                            {
                                buttonstate ?
                                    <Button type='submit' variant='primary' className='me-2'>
                                        Submit
                                    </Button> :

                                    <Button type='update' variant='info' className='me-2'>Update</Button>
                            }

                            <Button type='reset' variant='danger' onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                        </Form.Group>


                    </Form>
                    {/* <p>{JSON.stringify(input)}</p> */}
                </Modal.Body>

            </Modal>
            {/* <p>{JSON.stringify(allData)}</p> */}

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th>{JSON.stringify(allData.Fullname)}</th> */}
                            <th>Sr. No</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>MobileNumber</th>
                            <th>Profile</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item, index) => {
                                item['index'] = index;
                                return <Tr item={item} key={index} />
                            }

                            )
                        }
                    </tbody>
                </Table>
            </Container>

        </>
    )
}
export default Registration;