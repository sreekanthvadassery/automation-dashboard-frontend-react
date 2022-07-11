import React ,{useEffect, useState, useMemo} from 'react'
import { useTable,usePagination } from 'react-table';
import { useQuery } from 'react-query';
import { QueryClientProvider, QueryClient } from 'react-query';
import BTable from 'react-bootstrap/Table';
import {Button, Card, ButtonGroup,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare,faAngleRight,faAngleLeft,faAnglesLeft,faAnglesRight,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import {AiOutlineCheck,AiOutlineClose} from 'react-icons/ai'
import {useLocation} from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import DeleteConfirmation from './DeleteConfirmation';

const queryClient = new QueryClient();


/*const columns = [
    {
        Header: 'Id',
        accessor: 'projectId',
    },
    {
        Header: 'Project Name',
        accessor: 'projectName',
    },
    {
        Header: 'Description',
        accessor: 'projectDescription',
    },
    {
        Header: 'Enabled',
        accessor: 'enabled',
        Cell: ({ value }) => {return value? <div style={{ textAlign: "center" }}><AiOutlineCheck/></div> : <div style={{ textAlign: "center" }}><AiOutlineClose/></div>}
    },
    {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }) => {return format(new Date(value),'dd/MM/yyyy HH:mm:ss')}
    },
    {
        Header: 'Updated At',
        accessor: 'updatedAt',
        Cell: ({ value }) => {return format(new Date(value),'dd/MM/yyyy HH:mm:ss')}
    },
    {
        Header: 'Last Updated By',
        accessor: 'lastUpdatedBy',
    },
    {
        Header: 'Actions',
        Cell: row => (
            <ButtonGroup>
                <Button href={`/edit-project/${row.row.original.projectId}`} size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                <Button onClick={() => showDeleteModal("Project", row.row.original.projectId)} size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
            </ButtonGroup>
        )
    },
];*/


const trimData = (data = []) =>
  data.map(({ projectId, projectName, projectDescription,enabled,createdAt,updatedAt,lastUpdatedBy }) => ({
    projectId,
    projectName,
    projectDescription,
    enabled,
    createdAt,
    updatedAt,
    lastUpdatedBy
  })
);


const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: null,
};

const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

//Reference: https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz
//         : https://dev.to/elangobharathi/server-side-pagination-using-react-table-v7-and-react-query-v3-3lck
const ProjectList_Final = () => {

    const [projects, setProjects] = useState([])

    const COLUMNS = [
        {
            Header: 'Id',
            accessor: 'projectId',
        },
        {
            Header: 'Project Name',
            accessor: 'projectName',
        },
        {
            Header: 'Description',
            accessor: 'projectDescription',
        },
        {
            Header: 'Enabled',
            accessor: 'enabled',
            Cell: ({ value }) => {return value? <div style={{ textAlign: "center" }}><AiOutlineCheck/></div> : <div style={{ textAlign: "center" }}><AiOutlineClose/></div>}
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
            Cell: ({ value }) => {return format(new Date(value),'dd/MM/yyyy HH:mm:ss')}
        },
        {
            Header: 'Updated At',
            accessor: 'updatedAt',
            Cell: ({ value }) => {return format(new Date(value),'dd/MM/yyyy HH:mm:ss')}
        },
        {
            Header: 'Last Updated By',
            accessor: 'lastUpdatedBy',
        },
        {
            Header: 'Actions',
            Cell: row => (
                <ButtonGroup>
                    <Button href={`/edit-project/${row.row.original.projectId}`} size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                    <Button onClick={() => showDeleteModal("Project '"+row.row.original.projectName+"'", row.row.original.projectId)} size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                </ButtonGroup>
            )
        },
    ];

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
            setSuccessMessage(loc.state.dataSubmmittedSuccessMessage)
            //Once set the data clear it so that during page refresh the message will be disappeared
            //https://stackoverflow.com/questions/53278986/how-to-clear-props-location-state-on-refresh
            window.history.replaceState(null, '')
        }
        //calling the method for getting the list of Projects
        getProjectData(queryPageIndex,queryPageSize);
    }, [loc.state])

    const getProjectData = async (page, pageSize) => {
        console.log(`http://localhost:8080/api/v1/project/find-all?page=${page}&size=${pageSize}`)
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/project/find-all?page=${page}&size=${pageSize}`
          );
          const data = await response.json();

          console.log(data)

          setProjects(data.content)

          return data;
        } 
        catch (e) {
          throw new Error(`API error:${e?.message}`);
        }
    };

    //method for deleting the project
    const deleteProject = (projectId) =>{
        console.log('Delete Id: '+projectId);
        ProjectService.deleteProject(projectId).then((response) =>{
            //call the method which returns all the project details
            getProjectData(queryPageIndex,queryPageSize);
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
        
        //setDeleteMessage(`Are you sure you want to delete the ${entityType} '${projects.find((x) => x.projectId === id).projectName}' with ID: ${id}?`);
        //setDeleteMessage(`Are you sure you want to delete the ${entityType} `);
        setDeleteMessage(`Are you sure you want to delete the ${entityType} '${projects.find((x) => x.projectId === id)?.projectName}' with ID: ${id}?`);
        
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
        //setSuccessMessage(`The ${entityType} '${projects.find((x) => x.projectId === id).projectName}' was deleted successfully.`);

        setSuccessMessage(`The ${entityType}  was deleted successfully.`);

        //Calling the actual delete method
        deleteProject(id);
        //After calling the delete method, we need to close the Modal    
        setDisplayConfirmationModal(false);
    };
    // DELETE CONFIRM MODAL CODE END//

    const [{ queryPageIndex, queryPageSize, totalCount }, dispatch] =
        React.useReducer(reducer, initialState);

    const { isLoading, error, data, isSuccess } = useQuery(
        ['projects', queryPageIndex, queryPageSize],
        () => getProjectData(queryPageIndex, queryPageSize),
        {
            keepPreviousData: true,
            staleTime: Infinity,
        }
    );

    const columns = useMemo(() => COLUMNS,[])
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
          columns,
          //data: isSuccess ? trimData(data.results) : [],
          data: isSuccess ? trimData(data.content) : [],
          initialState: {
            pageIndex: queryPageIndex,
            pageSize: queryPageSize,
          },
          manualPagination: true, // Tell the usePagination
          // hook that we'll handle our own data fetching
          // This means we'll also have to provide our own
          // pageCount.
          pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : null,
        },
        usePagination
    );

    

    useEffect(() => {
        dispatch({ type: PAGE_CHANGED, payload: pageIndex });
    }, [pageIndex]);
    
    useEffect(() => {
        dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
        gotoPage(0);
    }, [pageSize, gotoPage]);
    
    useEffect(() => {
       // if (data?.count) {
        if (data?.totalElements) {
            dispatch({
                type: TOTAL_COUNT_CHANGED,
                //payload: data.count,
                payload: data.totalElements,
            });
        }
    //}, [data?.count]);
    }, [data?.totalElements]);
    
    if (error) {
        return <p>Error</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
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
                {successMessage && <Alert variant="success" align="center">{successMessage}</Alert>}
                <BTable bordered hover striped variant="dark" {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map(headerGroup =>(
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) =>(
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map( cell => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })
                                        }
                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </BTable>
            </Card.Body>
            <Card.Footer /*style={{textAlign:"right"}}*/ className='d-flex justify-content-between '>
                <div className='float-left'>
                    <span>
                        <i>Page{' '} <strong> {pageIndex + 1} of {pageOptions.length}</strong>{'   '}</i>
                    </span>
                    <span>
                        | Go to page: {' '}
                        <input className="bg-dark text-white border border-white rounded-pill" type='number' defaultValue={pageIndex + 1}
                            onChange={ e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                            style={{width: '60px'}}
                        />
                    </span>
                    {' '}{' '}
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="bg-dark text-white border border-white">
                        {
                            [10,25,50,100].map(pageSize =>(
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))
                        }
                    </select>
                    {' '}
                </div>
                <div className='float-right'>
                    <Button onClick={ () => gotoPage(0)} disabled={!canPreviousPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                        <b><FontAwesomeIcon icon={faAnglesLeft} /> First</b>
                    </Button>{' '}
                    <Button onClick={ () => previousPage()} disabled={!canPreviousPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                        <b><FontAwesomeIcon icon={faAngleLeft} /> Prev</b>
                    </Button>{' '}
                    <Button onClick={ () => nextPage()} disabled={!canNextPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                        <b>Next <FontAwesomeIcon icon={faAngleRight} /></b>
                    </Button> {' '}   
                    <Button onClick={ () => gotoPage(pageCount - 1)} disabled={!canNextPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                        <b>Last <FontAwesomeIcon icon={faAnglesRight} /></b>
                    </Button>   
                </div>
            </Card.Footer>
            <br></br>
            <br></br>
            <DeleteConfirmation showModal={displayConfirmationModal} hideModal={hideConfirmationModal} confirmModal={submitDelete} id={id} entityType={entityType} message={deleteMessage} />
        </Card>    
    )
}

//export default ProjectList_Final
export default function Wraped(){
    return(<QueryClientProvider client={queryClient}>
            <ProjectList_Final/>
        </QueryClientProvider>
    );       
}