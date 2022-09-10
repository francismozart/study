export default interface IBook {
  id: string;
  title: string;
  author: Author;
}

export interface IBookRow {
  id: string;
  title: string;
  author: string;
}

interface Author {
  id: string;
  name: string;
}
