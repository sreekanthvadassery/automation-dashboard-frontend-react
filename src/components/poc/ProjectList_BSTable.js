import React, {useState, useEffect} from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Card, Spinner,Table} from 'react-bootstrap';
import { faList} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';

//BootstrapTable style css
const bootstrapTableStyle = {
    color: "white",
    backgroundColor: "black"
};

const ProjectList_BSTable = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalElements,setTotalElements] = useState(0);

    const getProjectData =  (page, sizePerPage) => {
        console.log(`http://localhost:8080/api/v1/project/find-all?page=${page-1}&size=${sizePerPage}`)
        axios.get(`http://localhost:8080/api/v1/project/find-all?page=${page-1}&size=${sizePerPage}`).then((response) => {
            console.log(response.data);
            console.log('Total Elements: '+ response.data.totalElements);
            setProjects(response.data.content);
            setLoading(true);
            setTotalElements(response.data.totalElements)
        }).catch(error => {
            console.log(error);
        })
    }

    const columns =[
        {dataField: "projectId", text: "Project Id",sort: true},
        {dataField: "projectDescription", text: "Description",sort: true},
        {dataField: "lastUpdatedBy", text: "Updated By",sort: true},
    ]

    const defaultSorted = [{
        dataField: 'projectId',
        order: 'asc'
      }];

    useEffect(() => {
       getProjectData(1,5);
       console.log('inside useEffect')
       console.log(projects)
    }, [])
    
    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to } of { size } Results
      </span>
    );    

    const options = {
        //page: 1,
        //sizePerPage: 5,
        totalSize:totalElements,
        //paginationSize:5,
        showTotal: true,
        //paginationTotalRenderer: customTotal,
        lastPageText: 'Last',
        firstPageText: 'First',
        nextPageText: '>',
        prePageText: '<',
        alwaysShowAllBtns: true,
        sizePerPageList: [
            {
              text: "5",
              value: 5
            },
            {
              text: "10",
              value: 10
            },
            {
              text: "25",
              value: 25
            },
            {
              text: "50",
              value: 50
            },
            {
              text: "100",
              value: 100
            }
        ],
        onPageChange: function (page,sizePerPage ) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
          getProjectData(page,sizePerPage);
        },
        onSizePerPageChange: function (sizePerPage,page) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
          getProjectData(page,sizePerPage);
        }
    }

    const onTableChange = (type, newState) => {
      console.log('type:'+type);
      console.log('page:'+newState.page);
      console.log('size per page:'+newState.sizePerPage);
      // handle any data change here

     // if(type==='pagination'){
       // getProjectData(newState.page,newState.sizePerPage);
      //}
    }

    return (
        <Card >
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div>
                    <FontAwesomeIcon icon={faList} /> <b>Project List</b>
                </div> 
            </Card.Header>
            <Card.Body>
                {loading ? (
                    
                    <BootstrapTable /*rowStyle={ bootstrapTableStyle } */
                        
                        wrapperClasses="table-responsive"
                        onTableChange={ onTableChange } 
                        noDataIndication="No results!"
                        keyField='projectId'
                        defaultSorted={defaultSorted}
                        data={projects}
                        columns={columns}
                        pagination={paginationFactory(options)}
                        //condensed
                        bootstrap4
                        striped
                        hover
                        bootstrapTableStyle
                        remote
                    />
                    
                ) : (
                    <Spinner animation='border'/>
                )}
            </Card.Body>
            <Card.Footer>

            </Card.Footer>
        </Card>
    )
}

export default ProjectList_BSTable