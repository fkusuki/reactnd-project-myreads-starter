import React from 'react'
import { Route , Link} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query: '',
    showSearchPage: false,
    resultBooks :[],
    books:[],
    shelfes : [{value:'currentlyReading',name:'Currently Reading'},
             {value:'wantToRead',name:'Want to Read'},
             {value:'read', name: 'Read'}
            ]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books:books})
    })
  }

  updateQuery = (qry) =>
  {
    
    if(qry && qry.trim().length >0)
    {
      
      this.setState({query : qry})
      BooksAPI.search(qry).then((result) => {
        console.log(result)
        if(result === undefined || result.error)
        {
          this.setState({resultBooks:[]})

        } else {
          this.setState({resultBooks:result})        
        }
      })

    } else {
     
      this.clearQuery()
     
    }
  }

  clearQuery =() => {
    this.setState({query :''})
    this.setState({resultBooks:[]})
  }
  updatebookShelf = (book,shelf) =>{
    
    if(shelf==="none")
      return
    BooksAPI.update(book,shelf).then((data) =>{
      
      book.shelf=shelf;

      let tempBook = this.state.books
      let isAddBook = true
      tempBook.forEach((element, index) => {
          if(element.id === book.id) {
            tempBook[index] = book;
            isAddBook = false
          }
        })

      // add book on the shelf list
      if(isAddBook){
        tempBook.push(book)
      }
      this.setState({books:tempBook})
    })
   
  }
  render() {
    return (
      <div className="app">
      <Route path='/search' render={()=> (
        <div>
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
              
                <input type="text" placeholder="Search by title or author" 
                  value={this.state.query} 
                  onChange={(event)=> this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ListBooks
                books={this.state.resultBooks}
                onUpdateBook={this.updatebookShelf}
               />
            </div>
          </div>
        </div>
        )} />
        <Route exact path='/' render={()=>(
           <div>
                {this.state.shelfes.map((shelf)=>(
                  <div key={shelf.value} className="bookshelf">
                      <h2 className="bookshelf-title">{shelf.name}</h2>
                      <div className="bookshelf-books">
                        <div className="list-books">
                          <div className="list-books-title">
                            <h1>MyReads</h1>
                          </div>
                          <div className="list-books-content">
                            <ListBooks
                              books={this.state.books}
                              shelf={shelf.value}
                              onUpdateBook={this.updatebookShelf}
                             />
                          </div>
                          <div className="open-search">
                            <Link to="/search">Add a book</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                      ))}
                  </div>
            
          )} />
        
        
      </div>
    )
  }
}

export default BooksApp
