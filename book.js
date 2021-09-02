const searchField = document.getElementById('input-field');
const booksContainer = document.getElementById('books-container');
const booksSearchResult = document.getElementById('search-result');

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleBookList = displayStyle => {
    document.getElementById('books-list').style.display = displayStyle;
}
const toggleSearchSection = displayStyle => {
    document.querySelector('.container-fluid').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}
const toggleErrorResult = displayStyle => {
    document.getElementById('error-msg').style.display = displayStyle;
}

//search button handler
document.getElementById('search-btn').addEventListener('click', function () {
    const searchText = searchField.value;
    searchField.value = '';

    // all toggle function
    toggleSpinner('block');
    toggleBookList('none');
    toggleSearchSection('none');
    toggleSearchResult('none');
    toggleErrorResult('none');
    
    const bookSearchUrl = `https://openlibrary.org/search.json?q=${searchText}`
    if (searchText === '') {
        document.getElementById('error-msg').style.display = 'block';
        toggleSpinner('none');
        toggleSearchSection('block');
        toggleErrorResult('block');

    }
    else {
        fetch(bookSearchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.docs.length === 0) {
                    document.getElementById('error-msg').style.display = 'block';
                    toggleSpinner('none');
                    toggleSearchSection('block');
                    toggleErrorResult('block');

                }
                else {
                    displayBooks(data.docs);
                }
            })
    }
});


// displey booklist
const displayBooks = books => {
    booksContainer.textContent = '';
    booksSearchResult.textContent = '';

    //total search result
    const p = document.createElement('p');
    p.innerText = `Total books found: ${books.length}`;
    p.classList.add('text-white', 'fs-5', 'mt-5');
    booksSearchResult.appendChild(p);

    books.slice(0, 30)?.forEach(book => {
        let imgUrl;
        if (book.cover_i === undefined) {
            imgUrl = 'image/no-img.png'
        }
        else {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }

        // book div
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-body text-white border border-1 p-2">
            <div class="img-section">
                <img src="${imgUrl}" class="card-img-top w-100 h-100">
            </div>
            <div class="card-body d-flex flex-column justify-content-between p-1 mt-3">
                <div class="text-center">
                    <h3 class="card-title text-danger d-block text-truncate" title="${book.title}">${book.title}</h3>
                </div>
                <div class="mt-3">
                    <h6 class="card-text text-white-50">Authors: <span title="${book.author_name}" class="text-danger d-block text-truncate fs-5">${book.author_name ? book.author_name : 'Not Found'}</span></h6>
                </div>
                <div class="mt-3">
                    <h6 class="card-text text-white-50">Publisher: <span title="${book.author_name}" class="text-danger d-block text-truncate fs-5">${book.publisher ? book.publisher : 'Not Found'}</span></h6>
                </div>
                <div class="mt-3">
                    <p class="card-text text-muted">Publish Date: ${book.first_publish_year ? book.first_publish_year : 'Not Found'}</p>
                </div>
            </div>
        </div>
        `;

        booksContainer.appendChild(div);

        // all toggle function
        toggleSpinner('none');
        toggleBookList('block');
        toggleSearchSection('block');
        toggleSearchResult('block');
    });
}