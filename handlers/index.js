import { nanoid } from 'nanoid';

const books = [];

function getBooks(req, hapi) {
  if (books.length !== 0) {
    return hapi.response({
      status: 'success',
      data: {
        books: books.map(({ id, name: bookName, publisher }) => {
          return {
            id, name: bookName, publisher,
          };
        }),
      },
    }).code(200);
  }

  return hapi.response({
    status: 'success',
    data: {
      books,
    },
  }).code(200);
}

function getBooksById(req, hapi) {
  const { bookId } = req.params;

  const book = books.filter((element) => element.id === bookId);

  if (book.length !== 0) {
    // bookId is exist
    return hapi.response({
      status: 'success',
      data: {
        book: book[0],
      },
    }).code(200);
  }
  // check bookId
  return hapi.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
}

function createBooks(req, hapi) {
  const { 
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const id = nanoid(16);

  // check name
  if (!name) {
    return hapi.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // check readpage
  if (readPage > pageCount) {
    return hapi.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  books.push({
    id: id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt,
  });

  // success
  if (books.filter((book) => book.id === id).length > 0) {
    return hapi.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  // fail
  return hapi.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
    data: {
      bookId: id,
    },
  }).code(500);
}

function updateBooks(req, hapi) {
  const { bookId } = req.params;
  const { 
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  // check name
  if (!name) {
    return hapi.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  // check readpage
  if (readPage > pageCount) {
    return hapi.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  // if bookId exist in books
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      reading,
      updatedAt: new Date().toISOString(), 
    };

    return hapi.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  // bookId not exist in books
  return hapi.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
}

function deleteBooks(req, hapi) {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    return hapi.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  // bookId not found
  return hapi.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
}

export {
  getBooks,
  getBooksById,
  createBooks,
  updateBooks,
  deleteBooks,
};
