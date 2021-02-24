<template>
    <div class="new-input">
        <div class="input-group input-new">
          <label style="display: block" for="newField">New field name</label>
          <div class="input-wrapper" style="display: flex">
            <input type="text" name="newField" id="newField" v-model="newField.name">
            <span class="btn btn-clear" @click="addNewField">Add</span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addField',
    data(){
        return{
            newField:{
                name: 'New field',
                value: ''
            }
        }
    },
    methods: {
        addNewField(){
            const field = { [this.newField.name] : this.newField.value }
            this.$emit('field-added', field)
        }
    }
}
</script>
