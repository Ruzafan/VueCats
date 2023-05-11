<script>
export default {
    props: ['modelValue', 'fieldName'],
    emits: ['update:modelValue']
}
</script>

<template>
    <div class="book-form__form-group">
        <label>{{ fieldName }}:</label>
        <input type="number" :value="modelValue" step="any" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>
