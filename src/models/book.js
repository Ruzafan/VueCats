export class Book {
    id;
    title;
    author;
    year;
    pages;
    cover;
    genre;
    description;
    editorial;
    language;
    isbn;
    price;
    stock;
    favourite;
    rating;
    personalNote;

    constructor(
        id,
        title,
        author,
        year,
        pages,
        cover,
        genre,
        description,
        editorial,
        language,
        isbn,
        price,
        stock,
        favourite,
        rating,
        personalNote
    ) {
        if(!id){
            this.id = Math.floor(Math.random() * 999999);
        }else{
            this.id = id;
        }
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.cover = cover;
        this.genre = genre;
        this.description = description;
        this.editorial = editorial;
        this.language = language;
        this.isbn = isbn;
        this.price = price;
        this.stock = stock;
        this.favourite = favourite;
        this.rating = rating;
        this.personalNote = personalNote;
    }

}