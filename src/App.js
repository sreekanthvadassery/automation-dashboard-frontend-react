import { Col, Container,Row } from 'react-bootstrap';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import Project from './components/Project';

import Form from './components/Form';
import DeleteConfirmationExample from './components/DeleteConfirmationExample';
import PaginationExample from './components/PaginationExample';
import ProjectList_Pagination from './components/ProjectList_Pagination';
import ProjectList_BSTable from './components/ProjectList_BSTable';
import ProjectList_ReactTable from './components/ProjectList_ReactTable';
import ServerSidePagination from './components/ServerSidePagination';

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
              <Route path='/delete-confirm-example' element={<DeleteConfirmationExample />}></Route>
              <Route path='/pagination-example' element={<PaginationExample />}></Route>
              <Route path='/project-list-pagination' element={<ProjectList_Pagination />}></Route>
              <Route path='/project-list-bspagination' element={<ProjectList_BSTable />}></Route>
              <Route path='/project-list-react-table' element={<ProjectList_ReactTable/>}></Route>

              
              <Route path='/server-side-pagination' element={<ServerSidePagination/>}></Route>
              
              

            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
