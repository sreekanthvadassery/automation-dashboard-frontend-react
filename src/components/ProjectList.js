import React from 'react'

const ProjectList = () => {
  return (
    <Card className="border border-dark bg-dark text-white">
        <Card.Header>
            <FontAwesomeIcon icon={faList} /> Book List
        </Card.Header>
        <Card.Body>
            <Table bordered hover striped variant="dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>IBSN Number</th>
                        <th>Price</th>
                        <th>Language</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.books.length===0 ?
                        <tr align="center">
                            <td colSpan="6">No Books available</td>
                        </tr> :
                        this.state.books.map( (book) =>(
                        <tr key={book.id}>
                            <td>
                                <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/> {book.title}
                            </td>
                            <td>{book.author}</td>
                            <td>{book.isbnNumber}</td>
                            <td>{book.price}</td>
                            <td>{book.language}</td>
                            <td>
                                <ButtonGroup>
                                    <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                    <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Card.Body>
    </Card>
  )
}

export default ProjectList