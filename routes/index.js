import { 
  getBooks, getBooksById, createBooks, updateBooks, deleteBooks, 
} from '../handlers/index.js';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksById,
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBooks,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooks,
  },
];

export default routes;
