import { Col, Container,Row } from 'react-bootstrap';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import Project from './components/Project';

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
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
