
<script>
import SearchBar from './components/SearchBar.vue';
import FilterBar from './components/FilterBar.vue';
import BookList from './components/BookList.vue';
import ModalLayer from './components/ModalLayer.vue';
import BookForm from './components/BookForm.vue';
import { Book } from './models/book.js';
import { ref } from 'vue';
import axios from "axios";
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
      sortBy: ref("title"),
      orderBy: ref("asc"),
      favouriteItems: ref(false),
      searchTerm: ref(""),
      books: []
    }
  },
  created() {
    this.GetBookList();
  },
  methods: {
    addBook(book) {
      axios.post("http://localhost:3000/book", book).then((response) => this.GetBookList());
      this.GetBookList();
      this.toggleForm();
    },
    toggleForm() {
      this.showModal = !this.showModal;
    },
    setFavFilter(val) {
      this.favouriteItems = val;
    },

    sort(event) {
      this.sortBy = event;
    },
    order(event) {
      this.orderBy = event;
    },
    setSearchTerm(event) {
      this.searchTerm = event;
    },
    deleteBook(id) {
      console.log(id);
      axios.delete("http://localhost:3000/book", { data: { "id": id } }).then((response) => {
        this.GetBookList();
        console.log(response)
      });

    },
    GetBookList() {
      axios
        .get("http://localhost:3000/catalog")
        .then((response) => {
          this.books = response.data.recipes;
        })
        .catch((err) => console.log(err));
    }
  },
  computed: {

    BookListFiltered() {
      if (this.books) {
        let result = this.books;
        if (this.searchTerm) {
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
      }
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
      <SearchBar @show-form="toggleForm" @search="setSearchTerm"></SearchBar>
      <FilterBar :bookList="BookListFiltered" @favouriteItems="setFavFilter" @orderItems="order" @sortItems="sort">
      </FilterBar>
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
