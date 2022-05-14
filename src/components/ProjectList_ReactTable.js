import React, { useMemo}  from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import BTable from 'react-bootstrap/Table';
import {Button, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare,faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

//Reference: https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz
const ProjectList_ReactTable = () => {

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
        state,
        prepareRow
    } = useTable({
        columns,
        data
    },useSortBy,usePagination)

    const {pageIndex} = state
  
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
                <Button onClick={ () => previousPage()} disabled={!canPreviousPage} size="sm" variant="info" type="button">
                    <b><FontAwesomeIcon icon={faAngleLeft} />Previuos</b>
                </Button>{' '}
                <Button onClick={ () => nextPage()} disabled={!canNextPage} size="sm" variant="info" type="button" >
                    <b>Next<FontAwesomeIcon icon={faAngleRight} /></b>
                </Button>                
            </Card.Footer>
            <br></br>
            <br></br>
        </Card>    
    )
}

export default ProjectList_ReactTable