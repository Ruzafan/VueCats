
<script>
import SearchBar from './components/SearchBar.vue';
import FilterBar from './components/FilterBar.vue';
import BookList from './components/BookList.vue';
import ModalLayer from './components/ModalLayer.vue';
import BookForm from './components/BookForm.vue';
import { Book } from './models/book.js';
import { ref } from 'vue';
export default {
  name: 'App',
  components: {
    SearchBar,
    FilterBar,
    BookList,
    ModalLayer,
    BookForm
  },
  data() {
    return {
      showModal: ref(false),
      books: [
        new Book(
          1,
          "The Lord of the Rings",
          "J.R.R. Tolkien",
          1954,
          1178,
          "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
          ["Fantasy","Action","Adventures"],
          "Frodo Baggins, a hobbit of the Shire, is entrusted with the task of destroying an ancient and powerful ring that was forged by the dark lord Sauron in order to enslave the people of Middle Earth.",
          "Houghton Mifflin Harcourt",
          "English",
          "9780544003415",
          15.99,
          50,
          true,
          4.9,
          "The Lord of the Rings is a masterpiece of fantasy literature that immerses readers in a rich and complex world filled with memorable characters and epic battles. I loved the themes of friendship, courage, and sacrifice that are at the heart of the story."
        ),
        new Book(
          2,
          "The Hunger Games",
          "Suzanne Collins",
          2008,
          374,
          "https://upload.wikimedia.org/wikipedia/en/3/39/The_Hunger_Games_cover.jpg",
          ["Dystopian Fiction"],
          "In a future North America, where the rulers of Panem maintain control through an annual televised survival competition pitting young people from each of the twelve districts against one another, sixteen-year-old Katniss's skills are put to the test when she volunteers to take her younger sister's place.",
          "Scholastic Press",
          "English",
          "9780439023481",
          8.99,
          100,
          false,
          4.6,
          "The Hunger Games is a thrilling and thought-provoking book that explores issues of power, oppression, and resistance. The character of Katniss is a fierce and inspiring hero who I couldn't help but root for."
        ),
        new Book(
          3,
          "Eragon",
          "Christopher Paolini",
          2002,
          503,
          "https://upload.wikimedia.org/wikipedia/commons/8/83/Christopher_Paolini%2C_Eragon_1.jpg",
          ["Fantasy","Action","Adventures"],
          "A young farm boy named Eragon discovers a mysterious blue stone that turns out to be a dragon egg. When the dragon hatches, Eragon is thrust into a dangerous world of magic and politics, and must learn to become a Dragon Rider in order to fight against the evil king who wants to destroy him.",
          "Knopf Books for Young Readers",
          "English",
          "9780375826696",
          18.99,
          75,
          false,
          4.4,
          "Eragon is a great adventure story with a memorable cast of characters and a vividly imagined world. I loved the bond between Eragon and his dragon Saphira, and the epic battles that they fought together"
        ),
        new Book(
          4,
          "The Catcher in the Rye",
          "B J.D. Salinger",
          1951,
          277,
          "https://upload.wikimedia.org/wikipedia/commons/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
          ["Fiction","Action","Adventures"],
          "The novel's protagonist Holden Caulfield has become an icon for teenage rebellion.",
          "Little, Brown and Company",
          "English",
          "0316769177",
          9.99,
          10,
          false,
          4,
          "I really enjoyed this book!"
        )
      ],
      sortBy: ref("title"),
      orderBy:ref("asc"),
      favouriteItems: ref(false),
      searchTerm:ref("")
    }
  },
  created() {
    
  },
  methods: {
    addBook(book) {
      this.books.push(book);
      this.toggleForm();
    },
    toggleForm() {
      this.showModal = !this.showModal;
    },
    setFavFilter(val) {
      this.favouriteItems = val;
    },
   
    sort(event){
      this.sortBy = event;
    },
    order(event){
      this.orderBy = event;
    },
    setSearchTerm(event) {
      this.searchTerm = event;
    },
    deleteBook(id) {
      this.books = this.books.filter((result) => result.id != id);
    }
  },
  computed:{
    BookListFiltered(){
      let result = this.books;
      if(this.searchTerm)
      {
        result = this.books.filter((result) => result.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      if (this.favouriteItems && result) {
        result = result.filter((result) => result.favourite);
      } 
      result.sort((a, b) => {
            if (a[this.sortBy.toLowerCase()] < b[this.sortBy.toLowerCase()]) {
                return -1
            } else if (a[this.sortBy.toLowerCase()] > b[this.sortBy.toLowerCase()]) {
                return 1
            }
            return 0
        });
        if (this.orderBy == "desc") {
          result.reverse();
        }
        return result;
    },
  }
}
</script>


<template>
  <div>
    <header class="header">
      <div class="header__left">
        <img class="logo" src="./assets/logo.png" alt="Logo">
        <h1 class="title">My Book Collection</h1>
      </div>
    </header>
    <div class="content">
      <SearchBar  @show-form="toggleForm" @search="setSearchTerm"></SearchBar>
      <FilterBar :bookList="BookListFiltered" @favouriteItems="setFavFilter" @orderItems="order" @sortItems="sort"></FilterBar>
      <main class="main">
        <BookList :books="BookListFiltered" @delete-book="deleteBook"></BookList>
      </main>
      <ModalLayer v-show="showModal" @close-modal="toggleForm">
        <template v-slot:header>
          <h2>Add new book</h2>
        </template>
        <template v-slot:body>
          <BookForm @add-book="addBook"></BookForm>
        </template>
      </ModalLayer>
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}

.header__left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: 400;
}

.content {
  margin-top: 20px;
}
</style>
