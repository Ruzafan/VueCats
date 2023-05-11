<script>
export default {
    props: ['modelValue', 'fieldName'],
    emits: ['update:modelValue']
}
</script>

<template>
    <div class="book-form__form-group">
        <label>{{ fieldName }}:</label>
        <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>
