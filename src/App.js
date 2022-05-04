import { Col, Container,Row } from 'react-bootstrap';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import Project from './components/Project';

import Form from './components/Form';
import ModalExample from './components/ModalExample';
import DeleteConfirmationExample from './components/DeleteConfirmationExample';

function App() {
  const marginTop = {
    marginTop:"20px"
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path='/' element={<Welcome />}></Route>
              <Route path='/save-project' element={<Project />}></Route>
              <Route path='/project-list' element={<ProjectList />}></Route>
              <Route path='/edit-project/:projectId' element={<Project />}></Route>
              
              <Route path='/form-example' element={<Form />}></Route>
              <Route path='/modal-example' element={<ModalExample />}></Route>
              <Route path='/delete-confirm-example' element={<DeleteConfirmationExample />}></Route>
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
