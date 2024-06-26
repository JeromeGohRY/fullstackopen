import { useState } from 'react'
import{gql,useMutation} from '@apollo/client'
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const CREATE_BOOk = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title, 
      published: $published, 
      author: $author, 
      genres: $genres
    ) {
      title
      published
      genres 
    }
  }
  `
  const ALL_BOOKS=gql`
  query {
    allBooks {
      title
      published
      author{
        name
        id
      }
    }
  }
  `
  
const ALL_PERSONS = gql`
query {
  allAuthors {
    name
    born
    id
    bookCount
  }
}
`

  const [addBook]=useMutation(CREATE_BOOk,{refetchQueries: [ { query: ALL_BOOKS},{query:ALL_PERSONS} ]})
  if (!props.show) {
    return null
  }
 
  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    console.log(author)
    addBook({  variables: { title, published:Number(published), author,genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook