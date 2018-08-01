import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component
{
	static propTypes={
		books: PropTypes.array.isRequired,
		shelf: PropTypes.string,
		onUpdateBook: PropTypes.func.isRequired
	}
	render() {
		const{books,shelf,onUpdateBook} = this.props
		const showingBooks = !!shelf
  			  ? books.filter(book => book.shelf === shelf)
			  : books;
		return(
				<ol className="books-grid">
					{showingBooks.map((book)=>(
					<li key={book.id}>
						<div className="book">
							<div className="book-top">
								<div className="book-cover" 
								     style={{ width: 128, 
								     	      height: 193, 
								     	      backgroundImage: `url(${book.imageLinks!== undefined && (book.imageLinks.thumbnail)})`
								     	    }}>
								</div>
								<div className="book-shelf-changer">
									<select value={book.shelf === undefined ? 'none' : book.shelf } 
										    onChange={(event)=> onUpdateBook(book,event.target.value)}>
										<option value="move" disabled>Move to...</option>
										<option value="currentlyReading">Currently Reading</option>
										<option value="wantToRead">Want to Read</option>
										<option value="read">Read</option>
										<option value="none">None</option>
									</select>
								</div>
							</div>
							<div className="book-title">{book.title}</div>
								{book.authors===undefined?'':book.authors.map((author)=>(
									<div key={author} className="book-authors">{author}</div>
								))}
							</div>
					</li>
					))}
				</ol>

              )}
}
export default ListBooks