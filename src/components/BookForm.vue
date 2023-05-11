<script>
import { Book } from "../models/book.js"
import FormTextItem from "./FormItems/FormTextItem.vue"
import FormNumberItem from "./FormItems/FormNumberItem.vue"
import FormTextAreaItem from "./FormItems/FormTextAreaItem.vue"
import FormCheckBoxItem from "./FormItems/FormCheckBoxItem.vue"
import FormSelectItem from "./FormItems/FormSelectItem.vue"
export default {
    data() {
        return {
            form: new Book(),
            ratingValues: [{
                Value: "",
                Description: "Not defined"
            },{
                Value: "1",
                Description: "1 star"
            },{
                Value: "2",
                Description: "2 stars"
            },
            {
                Value: "3",
                Description: "3 stars"
            },
            {
                Value: "4",
                Description: "4 stars"
            },
            {
                Value: "5",
                Description: "5 stars"
            }],
            languageValues: [{
                Value: "",
                Description: "Not defined"
            },{
                Value: "Spanish"
            },{
                Value: "English"
            },{
                Value: "French"
            },{
                Value: "Italian"
            },{
                Value: "German"
            }],
            displayError: false
        }
    },
    components: {
    FormTextItem,
    FormNumberItem,
    FormTextAreaItem,
    FormCheckBoxItem,
    FormSelectItem
},
    methods: {
        submitForm() {
            if(this.form.title && this.form.description && this.form.author && this.form.year)
            {
                this.displayError = false;
                this.form.genre = this.form.genre.split(',').map((g) => g.trim())
                this.$emit('add-book', this.form)
                this.form = new Book()
            }else{
                this.displayError = true;
            }
        }
    }
}
</script>
<template>
    <div class="book-form">
        <form class="book-form__form" @submit.prevent="submitForm">

            <FormTextItem v-model="form.title" fieldName="Title" />
            <FormTextItem v-model="form.author" fieldName="Author" />

            <FormTextAreaItem v-model="form.description" fieldName="Description" />
            <FormNumberItem v-model="form.year" fieldName="Year" />

            <FormNumberItem v-model="form.pages" fieldName="Pages" />
            <FormTextItem v-model="form.genre" fieldName="Genre" />

            <FormTextItem v-model="form.editorial" fieldName="Editorial" />
            <FormSelectItem v-model="form.language" fieldName="Language" :selectorValues="languageValues" />

            <FormTextItem v-model="form.isbn" fieldName="ISBN" />
            <FormNumberItem v-model="form.price" fieldName="Price" />

            <FormNumberItem v-model="form.stock" fieldName="Stock" />
            <FormCheckBoxItem v-model="form.favourite" fieldName="Favorite" />

            <FormSelectItem v-model="form.rating" fieldName="Rating" :selectorValues="ratingValues" />
            <FormTextItem v-model="form.cover" fieldName="Image" />

            <div v-if=displayError>
                <span>An error has ocurred</span>
            </div>
            <div class="book-form__form-group">
                <button type="submit" class="book-form__submit">Add Book</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.book-form:deep(.book-form__form) {
    display: flex;
    flex-wrap: wrap;
}


.book-form:deep(.book-form__form-group) {
    margin-bottom: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
}

.book-form:deep(.book-form__form-group label) {
    display: block;
    margin-bottom: 10px;
    text-align: left;
    font-size: 14px;
}

.book-form:deep(.book-form__form-group input),
.book-form:deep(.book-form__form-group select),
.book-form:deep(.book-form__form-group textarea) {
    width: 80%;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    text-align: left;
}

.book-form:deep(.book-form__form-group input:focus),
.book-form:deep(.book-form__form-group select:focus),
.book-form:deep(.book-form__form-group textarea:focus) {
    border-color: #000;
}

.book-form:deep(.book-form__form-group textarea) {
    height: 100px;
}

.book-form:deep(.book-form__submit ){
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    min-width: 100px;
    background-color: #4caf50;
    color: #fff;
}

.book-form:deep(.book-form__submit:hover) {
    background-color: #43a047;
}
</style>