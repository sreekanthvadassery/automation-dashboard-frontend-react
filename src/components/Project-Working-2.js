import React ,{useState,useEffect} from 'react'

import {useNavigate,useParams} from 'react-router-dom'

import { Card,Form,Button, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons'
import ProjectService from '../services/ProjectService';

//React React Forms Full Tutorial - Validation, React-Hook-Form, Yup
//https://www.youtube.com/watch?v=UvH70UkbyfE&t=19s
//https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react

//React-Hook-Form and Yup imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Yup validation
const schema = yup.object().shape({
    projectName: yup.string().required("Required field"),
    projectDescription: yup.string().required("Required field"),
    enabled: yup.boolean()
});

//Container style css
const containerStyle = {
    align: "center",
    width: "40rem"
  };

const Project = () => {

  //Yup validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  //React-Hook-Form submit
  const submitForm = (data) => {
    console.log(data);
    
    //saveOrUpdateProject(data) function steps given below
    //const project = {projectName,projectDescription,enabled}
    //console.log(project);

    if(projectId){
        //ProjectService.updateProject(projectId,project).then( (response) =>{
        ProjectService.updateProject(projectId,data).then( (response) =>{
            console.log(response.data)
            navigate('/project-list');
        }).catch(error => {
            console.log(error)
        })
    }
    else{
        //ProjectService.saveProject(project).then((response) => {
        ProjectService.saveProject(data).then((response) => {
            console.log(response.data)
            navigate('/project-list');
        }).catch(error => {
            console.log(error)
        })
    }  

  };

  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  
  const [enabled, setEnabled] = useState(false)
  const updateEnabled = () => setEnabled(!enabled);

  const navigate = useNavigate();

  const {projectId} = useParams();

  const saveOrUpdateProject = (e) => {
    /*e.preventDefault();*/
    
    const project = {projectName,projectDescription,enabled}
    console.log(project);

    if(projectId){
        ProjectService.updateProject(projectId,project).then( (response) =>{
            console.log(response.data)
            navigate('/project-list');
        }).catch(error => {
            console.log(error)
        })
    }
    else{
        ProjectService.saveProject(project).then((response) => {
            console.log(response.data)
            navigate('/project-list');
        }).catch(error => {
            console.log(error)
        })
    }  
  }

  //https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
  useEffect(() => {
    //We need the below code only when projectId is present , which means during update
    if(projectId){
        ProjectService.getProjectById(projectId).then( (response) => {
            console.log(response.data)

            //const newProjectName = response.data.projectName
            //const newProjectDescription = response.data.projectDescription
            //const newEnabled = response.data.enabled

            setProjectName(response.data.projectName)
            setProjectDescription(response.data.projectDescription)
            setEnabled(response.data.enabled)
            
            //setProjectName(newProjectName)
            //setProjectDescription(newProjectDescription)
            //setEnabled(newEnabled)


            console.log({projectName})
            console.log({projectDescription})            
            console.log({enabled})

        }).catch(error => {
            console.log(error)
        })
    }
  }, [enabled,projectDescription,projectName,projectId])
 
  
  const title = () => {
    if(projectId){
        return 'Update Project'
    }
    else{
        return 'Add Project'
    }
  }

  const resetProject= () =>{
    setProjectName('')
    setProjectDescription('')
    setEnabled(false)
  }

  return (
    <Container style={containerStyle}>
        <Card className="border border-dark bg-dark text-white">
            <Card.Header>
                <FontAwesomeIcon icon={faPlusSquare} /> {title()}
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
                        />
                        <Form.Text className="text-muted">
                            Enter your Project Name.
                        </Form.Text>
                        <p className="text-white">{errors.projectName && errors.projectName.message}</p>
                        
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
                        />
                        <p className="text-white">{errors.projectDescription && errors.projectDescription.message}</p>
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