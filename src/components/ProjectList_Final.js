import React from 'react'
import { useTable,usePagination } from 'react-table';
import { useQuery } from 'react-query';
import { QueryClientProvider, QueryClient } from 'react-query';
import BTable from 'react-bootstrap/Table';
import {Button, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare,faAngleRight,faAngleLeft,faAnglesLeft,faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const queryClient = new QueryClient();

const columns = [
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
];


const trimData = (data = []) =>
  data.map(({ projectId, projectName, projectDescription }) => ({
    projectId,
    projectName,
    projectDescription
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


const ProjectList_Final = () => {


   /* const getProjectData =  (page, pageSize) => {
        console.log(`http://localhost:8080/api/v1/project/find-all?page=${page}&size=${pageSize}`)
        axios.get(`http://localhost:8080/api/v1/project/find-all?page=${page}&size=${pageSize}`).then((response) => {
            console.log(response.data);
            
            const data = response;

            console.log(data)
  
            return data;
            
            
        }).catch(error => {
            console.log(error);
        })
    }*/

    const getProjectData = async (page, pageSize) => {
        console.log(`http://localhost:8080/api/v1/project/find-all?page=${page}&size=${pageSize}`)
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/project/find-all?page=${page}&size=${pageSize}`
          );
          const data = await response.json();

          console.log(data)

          return data;
        } 
        catch (e) {
          throw new Error(`API error:${e?.message}`);
        }
    };

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

    React.useEffect(() => {
        dispatch({ type: PAGE_CHANGED, payload: pageIndex });
    }, [pageIndex]);
    
    React.useEffect(() => {
        dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
        gotoPage(0);
    }, [pageSize, gotoPage]);
    
    React.useEffect(() => {
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