import React, { useMemo}  from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import BTable from 'react-bootstrap/Table';
import {Button, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare,faAngleRight,faAngleLeft,faAnglesLeft,faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

//Reference: https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz
const ProjectList_ReactTable = () => {

    /*const getProjectData =  (page, sizePerPage) => {
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
    }*/

    const COLUMNS = [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'First Name',
            accessor: 'first_name'
        },
        {
            Header: 'Last Name',
            accessor: 'last_name'
        },
        {
            Header: 'Date Of Birth',
            accessor: 'date_of_birth',
            Cell: ({ value }) => {return format(new Date(value),'dd/MM/yyyy HH:mm:ss')}
        },
        {
            Header: 'Country',
            accessor: 'country'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        }
    ]

    //useMemo ensures that data is not being recreated in every render and improves performance
    const columns = useMemo(() => COLUMNS,[])
    const data = useMemo(() => MOCK_DATA,[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state: { pageIndex, pageSize },
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex : 0, pageSize : 10}
        },
        useSortBy,
        usePagination
    );

    //const {pageIndex , pageSize} = state
  
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
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                                </span>
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
            <Card.Footer style={{textAlign:"right"}}>
                
                <span>
                    <i>Page{' '} <strong> {pageIndex + 1} of {pageOptions.length}</strong>{'  '}</i>
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
                {' '}
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
                <Button onClick={ () => gotoPage(0)} disabled={!canPreviousPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                    <b><FontAwesomeIcon icon={faAnglesLeft} /> First</b>
                </Button>{' '}
                <Button onClick={ () => previousPage()} disabled={!canPreviousPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                    <b><FontAwesomeIcon icon={faAngleLeft} /> Previuos</b>
                </Button>{' '}
                <Button onClick={ () => nextPage()} disabled={!canNextPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                    <b>Next <FontAwesomeIcon icon={faAngleRight} /></b>
                </Button> {' '}   
                <Button onClick={ () => gotoPage(pageCount - 1)} disabled={!canNextPage} size="sm" variant="secondary" type="button" className='rounded-pill'>
                    <b>Last <FontAwesomeIcon icon={faAnglesRight} /></b>
                </Button>   
                
            </Card.Footer>
            <br></br>
            <br></br>
        </Card>    
    )
}

export default ProjectList_ReactTable