import React ,{useState} from 'react'

import {useNavigate} from 'react-router-dom'

import {Card,Form,Button, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons'
import ProjectService from '../services/ProjectService';

const containerStyle = {
    align: "center",
    width: "40rem"
  };

const Project = () => {

  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  
  const [enabled, setEnabled] = useState(false)
  const updateEnabled = () => setEnabled(!enabled);

  const navigate = useNavigate();

  const saveProject = (e) => {
    e.preventDefault();
    
    const project = {projectName,projectDescription,enabled}
    console.log(project);

    ProjectService.saveProject(project).then((response) => {
        console.log(response.data)
        navigate('/project-list');
    }).catch(error => {
        console.log(error)
    })

  }

  return (
    <Container style={containerStyle}>
        <Card className="border border-dark bg-dark text-white">
            <Card.Header>
                <FontAwesomeIcon icon={faPlusSquare} /> Add Project
            </Card.Header>
            <Form id="projectFormId">
                <Card.Body>

                    <Form.Group className="mb-3" controlId="formGridProjectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control 
                            value={projectName} 
                            name="projectName" 
                            className="bg-dark text-white" 
                            required 
                            type="text" 
                            placeholder="Enter Project Name" 
                            onChange = {(e) => setProjectName(e.target.value)}
                            autoComplete = "off"
                        />
                        <Form.Text className="text-muted">
                            Enter your Project Name.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridProjectDescription">
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control 
                            value={projectDescription} 
                            name="projectDescription" 
                            className="bg-dark text-white" 
                            type="text" 
                            placeholder="Enter Description" 
                            onChange = {(e) => setProjectDescription(e.target.value)}
                            autoComplete = "off"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formGridEnabled">
                        <Form.Check 
                            value={enabled} 
                            name="enabled" 
                            type="checkbox" 
                            label="Enabled" 
                            checked={enabled}
                            onChange={updateEnabled}
                        />
                    </Form.Group>                    
                            
                </Card.Body>
                <Card.Footer style={{textAlign:"right"}}>
                    <Button size="sm" variant="success" type="submit" onClick={(e) => saveProject(e)}>
                        <FontAwesomeIcon icon={faSave} /> Submit
                    </Button>{' '}
                    <Button size="sm" variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} /> Reset
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    </Container>
  )
}

export default Project