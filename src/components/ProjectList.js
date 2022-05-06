import React,{useState,useEffect} from 'react'

import {Button, ButtonGroup, Card,  Table, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,faEdit,faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import ProjectService from '../services/ProjectService';
import {AiOutlineCheck,AiOutlineClose} from 'react-icons/ai'
import DeleteConfirmation from './DeleteConfirmation';

import {useLocation} from 'react-router-dom';

const ProjectList = () => {

  const [projects, setProjects] = useState([])

  //useLocation is used to get the data passed via useNavigate()
  //https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react
  const loc  = useLocation();
  
  //this useEffect is used to load the data in list (on page load this will be called)
  useEffect(() => {
    //When we are saving or updating any value, we are passing a state 'dataSubmittedSuccessMessage' along with useNavigate() function
    //Using useLocation hook we can get the state passed via useNavigate() function
    //We are reading the state and assigning it to the successMessage state available in this component
    //we need to set the state if and only if loc.state is present
    if(loc.state){
        //setting the data to existing successMessage state
        setSuccessMessage(loc.state.dataSubmittedSuccessMessage)
        //Once set the data clear it so that during page refresh the message will be disappeared
        //https://stackoverflow.com/questions/53278986/how-to-clear-props-location-state-on-refresh
        window.history.replaceState(null, '')
    }
    //calling the method for getting the list of Projects
    getAllProjects();
  }, [loc.state])

  //method for getting all the project details from back end
  const getAllProjects = () => {
    ProjectService.getAllProjects().then((response) => {
        setProjects(response.data)
        console.log(response.data)
    }).catch(error => {
        console.log(error);
    })
  }

  //method for deleting the project
  const deleteProject = (projectId) =>{
      console.log('Delete Id: '+projectId);
      ProjectService.deleteProject(projectId).then((response) =>{
        //call the method which returns all the project details
        getAllProjects();
      }).catch(error =>{
          console.log(error);
      })
  }

  // DELETE CONFIRM MODAL CODE START//
  // Set up some additional local states for handling the Delete Confirmation Modal dialog box
  const [entityType, setEntityType] = useState(null);
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle the displaying of the Modal based on entityType and id
  const showDeleteModal = (entityType, id) => {
    setEntityType(entityType);
    setId(id);
    //Setting the success message to null (Once the delete is completed, then only we need the success message)
    setSuccessMessage(null);
    //Setting the message which needs to be displayed inside Modal
    setDeleteMessage(`Are you sure you want to delete the ${entityType} '${projects.find((x) => x.projectId === id).projectName}' with ID: ${id}?`);
    //We are setting this variable to true and pass it to the Modal so that it will show the Modal
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = (entityType, id) => {
    //Setting the success message
    setSuccessMessage(`The ${entityType} '${projects.find((x) => x.projectId === id).projectName}' was deleted successfully.`);
    //Calling the actual delete method
    deleteProject(id);
    //After calling the delete method, we need to close the Modal    
    setDisplayConfirmationModal(false);
  };
  // DELETE CONFIRM MODAL CODE END//
  
  return (
    <Card className="border border-dark bg-dark text-white">
        <Card.Header className='d-flex justify-content-between align-items-center'>
            <div>
                <FontAwesomeIcon icon={faList} /> <b>Project List</b>
            </div>
            <Button href='/save-project' className='float-right' size="sm" variant="success" type="button">
                <FontAwesomeIcon icon={faPlusSquare} /> Add Project
            </Button>
        </Card.Header>
        <Card.Body>
            {successMessage && <Alert variant="success" align="center">{successMessage}</Alert>}
            <Table bordered hover striped variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Enabled</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Last Updated By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(
                            project => 
                            <tr key={project.projectId}>
                                <td>{project.projectId}</td>
                                <td>{project.projectName}</td>
                                <td>{project.projectDescription}</td>
                                <td align='center'>{project.enabled? <AiOutlineCheck/> : <AiOutlineClose/> }</td>
                                <td>{project.createdAt}</td>
                                <td>{project.updatedAt}</td>
                                <td>{project.lastUpdatedBy}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button href={`/edit-project/${project.projectId}`} size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                        <Button onClick={() => showDeleteModal("Project", project.projectId)} size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    }                    
                </tbody>
            </Table>
        </Card.Body>
        <DeleteConfirmation showModal={displayConfirmationModal} hideModal={hideConfirmationModal} confirmModal={submitDelete} id={id} entityType={entityType} message={deleteMessage} />
    </Card>
  )
}

export default ProjectList