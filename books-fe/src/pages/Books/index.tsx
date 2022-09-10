import Button from '@mui/material/Button'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useLazyQuery } from '@apollo/client'
import { BOOK_QUERY } from '@services/api'
import IBook, { IBookRow } from '@mytypes/book'

const Books = () => {
  const [getBooks, { loading, error, data }] = useLazyQuery(BOOK_QUERY)

  const handleClick = (): void => {
    getBooks()
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'author', headerName: 'Author', width: 130 },
  ]

  let rows: IBookRow[] = []

  data?.books &&
    data.books.map((item: IBook) =>
      rows.push({
        ...item,
        author: item.author.name,
      }),
    )

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        I want my books
      </Button>

      {data?.books && (
        <div style={{ height: '50vh', width: '100%', marginTop: '50px' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      )}
    </>
  )
}

export default Books
