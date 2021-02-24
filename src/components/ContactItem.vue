<template>
    <!-- <li v-if="name !== 'id'"> -->
    <li>
        {{name}}: {{ value }} 
    </li>
</template>

<script>
export default {
    name: 'Info',
    props: ['name', 'value']
}
</script>

