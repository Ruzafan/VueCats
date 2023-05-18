<script setup>
import BookItem from './BookItem.vue';
import { defineProps } from 'vue';
const props = defineProps({
    books: Array
})
</script>

<template>
    <div v-if="books" class="book-list">
        <BookItem v-for="book in books" :key="book.id" :book="book" @delete-book="$emit('delete-book', $event)" />
    </div>
    <div v-else>
        No books to display
    </div>
</template>
  
<style scoped>
.book-list {
    padding: 20px;
    display: flex;
    grid-gap: 20px;
    flex-wrap: wrap;
    grid-auto-rows: minmax(680px, 680px);

}
</style>