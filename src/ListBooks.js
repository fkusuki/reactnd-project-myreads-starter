import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component
{
	static propTypes={
		books: PropTypes.array.isRequired,
		shelfes: PropTypes.array.isRequired,
		onUpdateBook: PropTypes.func.isRequired
	}
	
	
	render() {
		
	
		const{books,shelfes,onUpdateBook} = this.props
		
		
		
		return(
		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfes.map((shelf)=>(
                	<div key={shelf.value} className="bookshelf">
                  		<h2 className="bookshelf-title">{shelf.name}</h2>
                  		<div className="bookshelf-books">
		                    <ol className="books-grid">
		                     {books.filter((x)=>x.shelf===shelf.value).map((book)=>(

		                      <li key={book.id}>
		                        <div className="book">
		                          <div className="book-top">
		                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
		                            <div className="book-shelf-changer">
		                              <select onChange={(event)=> onUpdateBook(book,event.target.value)}>
		                                <option value="move" disabled>Move to...</option>
		                                <option value="currentlyReading">Currently book,Reading</option>
		                                <option value="wantToRead">Want to Read</option>
		                                <option value="read">Read</option>
		                                <option value="none">None</option>
		                              </select>
		                            </div>
		                          </div>
		                          <div className="book-title">{book.title}</div>
		                          {book.authors.map((author)=>(

		                          <div key={author} className="book-authors">{author}</div>
		                          	))}
		                        </div>
		                      </li>
		                     ))}
		                      
		                    </ol>
                  	    </div>
                  	</div>
                ))}
                 
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
		)
	}
}
export default ListBooks