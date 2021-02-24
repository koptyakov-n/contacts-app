<template>
    <div class="new-contact body" >
      <div class="">
        <h2>New contact</h2>
      </div>
      <form @submit.prevent="addNewContact" > 
        <div class="input-group" :class="'input-'+name" v-for="(value, name, index) in template" :key="index">
          <label style="display: block" for="name">{{name}}</label>
          <input type="text" name="name" id="name" v-model="template[name]">
        </div>
        <button type="submit" class="btn btn-fluid btn-clear">Create</button>
      </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            temp: {
                id: -1,
                firstname: '',
                lastname: '',
                phone: ''
            },
        }
    },
    computed:{ 
        template(){
            this.temp.id = Date.now()
            return this.temp
        }
    },
    methods:{
        addNewContact(){
            const newContact = {
                id: this.template.id,
                firstname: this.template.firstname,
                lastname: this.template.lastname,
                phone: this.template.phone,
            }
            this.$store.dispatch('createContact', newContact)
            this.$emit('close-block')
        }
    }
}
</script>


<style lang="scss" scoped>
    .input-id{
        display: none;
    }
    .header{
        text-align: center;
        margin-bottom: 44px;
    }
    .new-contact{
        padding-bottom: 44px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 44px;
    }
    h2{
        margin-bottom: 44px;
    }
</style>