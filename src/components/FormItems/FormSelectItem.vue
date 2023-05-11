<script>
export default {
    props: ['modelValue', 'fieldName','selectorValues'],
    emits: ['update:modelValue']
}
</script>

<template>
    <div class="book-form__form-group">
        <label>{{ fieldName }}:</label>
        <select :model="modelValue" @change="$emit('update:modelValue', $event.target.value)"  >
            <option v-for="item in selectorValues" :value="item.Value">{{item.Description ?? item.Value}}</option>
        </select>
    </div>
</template>
