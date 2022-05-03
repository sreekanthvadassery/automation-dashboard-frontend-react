import React,{useState,useEffect} from 'react'

import {Button, ButtonGroup, Card,  Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,faEdit,faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import ProjectService from '../services/ProjectService';
import {AiOutlineCheck,AiOutlineClose} from 'react-icons/ai'

const ProjectList = () => {

  const [projects, setProjects] = useState([])

  //this useEffect is used to load the data in list (on page load this will be called)
  useEffect(() => {
    //calling the method 
    getAllProjects();
  }, [])

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
            <Table bordered hover striped variant="dark">
                <thead>
                    <tr>
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
                                <td>{project.projectName}</td>
                                <td>{project.projectDescription}</td>
                                <td align='center'>{project.enabled? <AiOutlineCheck/> : <AiOutlineClose/> }</td>
                                <td>{project.createdAt}</td>
                                <td>{project.updatedAt}</td>
                                <td>{project.lastUpdatedBy}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button href={`/edit-project/${project.projectId}`} size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                        <Button onClick={()=> deleteProject(project.projectId)} size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    }                    
                </tbody>
            </Table>
        </Card.Body>
    </Card>
  )
}

export default ProjectList