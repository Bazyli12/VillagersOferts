const booksList = document.getElementById('booksList');
const searchBar = document.getElementById('search');
let enchanted_books = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredBooks = enchanted_books.filter((book) => {
        return (
            book.name.toLowerCase().includes(searchString) ||
            book.name_alt.toLowerCase().includes(searchString) ||
            book.name_pl.toLowerCase().includes(searchString) ||
            book.name_pl_alt.toLowerCase().includes(searchString) ||
            book.level.toLowerCase().includes(searchString)
        );
    });
    displayBooks(filteredBooks);
});

const loadBooks = async() => {
    try {
        const res = await fetch('./books.json');
        enchanted_books = await res.json();
        displayBooks(enchanted_books);
    } catch (err) {
        console.error(err);
    }
};


const displayBooks = (books) => {
    const htmlString = books
        .map((book) => {
            let shadow = hexToRgbA(`${book.color}`);
            return `
            <div class="grid-item">
                <div class="grid-item-container">
                    <div class="bookName">
                        <div class="bookName-name">${book.name}</div>
                        <div class="bookName-img">
                            <img style="background-color: ${book.color}; box-shadow: 4px 4px 2px ${shadow};" class="bookName-img-color" src="./img/Enchanted_book.gif" alt="" height="90" width="90">
                        </div>
                    </div>
                    <div class="bookMin">
                        <div class="bookMin-name">Min</div>
                        <div class="bookMin-img">
                            <div class="bookMin-value">${book.min}</div>
                            <img style="filter: drop-shadow(3px 3px 3px rgba(22, 22, 22, 0.5));" src="./img/Emerald.png" alt="" height="80" width="80">
                        </div>
                    </div>
                    <div class="bookMax">
                        <div class="bookMax-name">Max</div>
                        <div class="bookMax-img">
                            <div class="bookMax-value">${book.max}</div>
                            <img style="filter: drop-shadow(3px 3px 3px rgba(22, 22, 22, 0.5));" src="./img/Emerald.png" alt="" height="80" width="80">
                        </div>
                    </div>
                </div>
            </div>
        `;
        })
        .join('');
    booksList.innerHTML = htmlString;
};


loadBooks();

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)';
    }
    throw new Error('Bad Hex');
}

function remove() {
    document.getElementById('search').value = '';
    loadBooks();
}