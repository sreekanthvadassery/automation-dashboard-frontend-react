import React ,{ useState, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Card, Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusSquare, faUndo, faList } from '@fortawesome/free-solid-svg-icons'
import ProjectService from '../services/ProjectService';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

//React React Forms Full Tutorial - Validation, React-Hook-Form, Yup
//https://www.youtube.com/watch?v=UvH70UkbyfE&t=19s
//https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react

//React-Hook-Form and Yup imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitConfirmation from './SubmitConfirmation';

//Container style css
const containerStyle = {
    align: "center",
    width: "40rem"
};

//Yup validation - Create schema with the form inputs
const schema = yup.object().shape({
    projectName: yup.string().required("Project Name is a required field"),
    projectDescription: yup.string().required("Description is a required field"),
    enabled: yup.boolean()
});

//React Arrow Function Component Export start
const Project = () => {
  
  //Yup validation
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  //Variables present in form
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [enabled, setEnabled] = useState(false)
  //function to update the checkbox
  const updateEnabled = () => setEnabled(!enabled);
 
  //This variable is used for page navigation
  const navigate = useNavigate();
  //Finding whether any path variable present in  the request (For update we will be having the id present)
  const {projectId} = useParams();

  //React-Hook-Form submit
  /*const submitForm = (data) => {
    console.log(data);
    //Call saveOrUpdateProject()
    saveOrUpdateProject(data);
  };*/
  //React-Hook-Form submit (Modified to call the Modal function)
  const submitForm = (data) => {
    console.log(data);
    //Data received from Form is being set to data variable
    setData(data)
    //Call show Modal function
    showSubmitModal(data)
  };

  //Function which saves or update data, based on the presense of projectId
  const saveOrUpdateProject = (data) => {
    //If projectId is present -> Update data
    if(projectId){
        ProjectService.updateProject(projectId,data).then( (response) =>{
            console.log(response.data)
            //navigate('/project-list');
            //Navigating to project-list page with message
            //https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react
            navigate('/project-list', {
                state: {
                    dataSubmittedSuccessMessage:`Project '${data.projectName}' updated successfully!`
                }
            });
        }).catch(error => {
            console.log(error)
        })
    }
    //Else -> Save data
    else{
        ProjectService.saveProject(data).then((response) => {
            console.log(response.data)
            //navigate('/project-list');
            //Navigating to project-list page with message
            //https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react
            navigate('/project-list', {
                state: {
                    dataSubmittedSuccessMessage:`Project '${data.projectName}' saved successfully!`
                }
            });
        }).catch(error => {
            console.log(error)
        })
    } 
  }

  //https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
  useEffect(() => {
    //We need the below code only when projectId is present , which means during update
    //Call the API -> findById and populate the data in form
    if(projectId){
        ProjectService.getProjectById(projectId).then( (response) => {
            console.log(response.data)
            //Setting the values
            setProjectName(response.data.projectName)
            setProjectDescription(response.data.projectDescription)
            setEnabled(response.data.enabled)
            
            //Below code was added for the validation to work in update page (Used reset function)
            //https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
            reset({
                projectName: response.data.projectName,
                projectDescription: response.data.projectDescription,
                enabled: response.data.enabled
            });
        }).catch(error => {
            console.log(error)
        })
    }
  }, [projectName,projectDescription,enabled,projectId,reset])
 
  //Function to update the page title (Add or Update)
  const title = () => {
    if(projectId){
        return 'Update Project'
    }
    else{
        return 'Add Project'
    }
  }

  //Function to find Save or Update
  const saveOrUpdate = () => {
    if(projectId){
        return 'Update'
    }
    else{
        return 'Save'
    }
  }

  //reset funtion
  const resetProject= () =>{
    setProjectName('')
    setProjectDescription('')
    setEnabled(false)
  }

  // SUBMIT CONFIRM MODAL CODE START//
  // Set up some additional local states for handling the Submit Confirmation Modal dialog box
  const [data, setData] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);

  // Handle the displaying of the Modal 
  const showSubmitModal = (data) => {
    //Create the data that needs to be shown in Modal confirm body section
    const modalBody = () => {
        return <table size='sm' className='table text-white'>
                    <thead>
                        <tr>
                            <th width="50%">ProjectName</th>
                            <td width="50%">{data.projectName}</td>
                        </tr>
                        <tr>
                            <th width="50%">Description</th>
                            <td width="50%">{data.projectDescription}</td>
                        </tr>
                        <tr>
                            <th width="50%">Enabled</th>
                            <td width="50%">{data.enabled? <AiOutlineCheck/> : <AiOutlineClose/> }</td>
                        </tr>
                    </thead>
                </table>
    }
    //Set Confirm Message state variable so that it can be viewed in Modal Body
    setConfirmMessage(modalBody());
    //We are setting this variable to true and pass it to the Modal so that it will show the Modal
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual form submission which is being called from Modal
  const submitData = (data) => {
    //Call saveOrUpdateProject()
    saveOrUpdateProject(data);
    //After submitting the form, we need to close the Modal    
    setDisplayConfirmationModal(false);
  };
  // SUBMIT CONFIRM MODAL CODE END//

  return (
    <Container style={containerStyle}>
        <Card className="border border-dark bg-dark text-white">
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div>
                    <FontAwesomeIcon icon={faPlusSquare} /> <b>{title()}</b>
                </div>
                <Button href='/project-list' className='float-right' size="sm" variant="success" type="button">
                    <FontAwesomeIcon icon={faList} /> Project List
                </Button>
            </Card.Header>
            <Form onReset={resetProject} onSubmit={handleSubmit(submitForm)} id="projectFormId">
                <Card.Body>
                    <Form.Group className="mb-3" controlId="formGridProjectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control 
                            defaultValue ={projectName} 
                            name="projectName" 
                            className="bg-dark text-white" 
                            type="text" 
                            placeholder="Enter Project Name" 
                            onChange = {(e) => setProjectName(e.target.value)}
                            autoComplete = "off"
                            {...register("projectName")}
                            isInvalid={errors.projectName && errors.projectName.message}
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.projectName && errors.projectName.message}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Enter your Project Name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridProjectDescription">
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control 
                            defaultValue ={projectDescription} 
                            name="projectDescription" 
                            className="bg-dark text-white" 
                            type="text" 
                            placeholder="Enter Description" 
                            onChange = {(e) => setProjectDescription(e.target.value)}
                            autoComplete = "off"
                            {...register("projectDescription")}
                            isInvalid={errors.projectDescription && errors.projectDescription.message}
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.projectDescription && errors.projectDescription.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formGridEnabled">
                        <Form.Check 
                            //this key is added to get the enabled selected correctly in update page
                            key={Math.random()}
                            defaultChecked ={enabled} 
                            name="enabled" 
                            type="checkbox" 
                            label="Enabled" 
                            onChange={updateEnabled}
                            {...register("enabled")}
                        />
                        <p className="text-white">{errors.enabled && errors.enabled.message}</p>
                    </Form.Group>                    
                            
                </Card.Body>
                <Card.Footer style={{textAlign:"right"}}>
                    <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> {saveOrUpdate()}
                    </Button>{' '}
                    <Button size="sm" variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} /> Reset
                    </Button>
                </Card.Footer>
                <SubmitConfirmation showModal={displayConfirmationModal} hideModal={hideConfirmationModal} confirmModal={submitData} data={data} message={confirmMessage} />
            </Form>
        </Card>
    </Container>
  )
}

export default Project