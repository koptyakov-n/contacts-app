<template>
  <div>
    <div class="header">
      <div class="header-left header-btn-wrapper">

        <router-link to="/" v-if="!isEdittable" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-clear" role="link">Close</button>
        </router-link>

      </div>
      <h1>{{contact.firstname}}</h1>
      <div class="header-right header-btn-wrapper" style="">
        <button 
          @click="undoLastAction" 
          v-if="contact.id > -1" 
          class="btn btn-clear" 
          :disabled="isBackDisabled"
          style="padding-left: 8px; padding-right: 8px;"
        >
          &#8617;&#xFE0E;
        </button>
        <button @click="askCancel" v-if="contact.id > -1" class="btn btn-clear">{{EditBtnLabel}}</button>
      </div>
    </div>
    <div v-if="contact.id > -1" class="contact body">
      <form @submit.prevent="updateContact" > 
        <div class="input-group" :class="'input-'+name" v-for="(value, name, index) in contact" :key="index" >
          <label style="display: block" for="name">{{name}}</label>
          <div class="input-wrapper">
            <input type="text" name="name" id="name" :disabled="!isEdittable" v-model="contact[name]">
            <span v-show="isEdittable" class="btn btn-remove" @click="askRemoveField(name)">X</span>
          </div>
        </div>
        <span v-if="isEdittable" style="padding-left: 0" class="btn btn-clear" v-show="!isNewField" @click="isNewField = !isNewField">Add field</span>
        <addField 
          v-if="isNewField && isEdittable" 
          @field-added="appendField"
        />
        <button type="submit" v-if="resetSteps" class="btn btn-fluid btn-clear" @click.prevent="updateContact">Save this state</button>
        <button type="submit" v-if="isEdittable" class="btn btn-fluid btn-clear" @click.prevent="updateContact">Save</button>
      </form>
    </div>
    <p v-else style="text-align: center; margin-top: 20px">Contact not found!</p>
    
      <Modal 
        v-if="isModalShows"
        :type="'cancel'"
        @modal-yes="cancelEditting"
        @modal-no="isModalShows = false"
      />
      <Modal 
        v-if="isFieldRemoving"
        :type="'removeField'"
        @modal-yes="removeField(fieldNameToRemove)"
        @modal-no="isFieldRemoving = false"
      />
  </div>
</template>

<script>
import addField from '@/components/addField.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Info',
  data(){
    return{

      // new field default props
      newField: {
        name: 'New Field',
        value: '',
      },
      isNewField: false,    // toggle addField component

      // for saving steps 
      lastSteps: [],        // for storing steps
      lastState: {},        // store last state
      stepID: 0,            // for navigating in steps
      resetSteps: false,    // if steps should be re-written 
      isBackDisabled: true, // toggle :disabled for btn

      
      isModalShows: false,  // toggle Modal "Cancel"

      // remove field data
      isFieldRemoving: false, // toggle Modal "eemoveField"
      fieldNameToRemove: '',  // name of field to remove

      // toggle default/editting modes
      isEdittable: false, 

      // get contanct info from store by id
      contact: this.$store.getters.getContactNoReact(this.$route.params.id)
    }
  },

  computed: {
    // toggle btn text in editing and default modes
    EditBtnLabel(){
      return this.isEdittable ? 'Cancel' : 'Edit'
    }
  },

  methods:{

    // addNewField
    appendField(newField){
      this.setLastStep(this.contact) // store state
      this.contact = Object.assign(this.contact, newField) //append new field to contact 
      this.isNewField = false // remove addNewField component
    },

    // get fields and update contact
    updateContact(){
      this.setLastStep(this.contact) // store state
      const updatedContact = this.contact; // get copy of contact
      this.$store.dispatch('updateContact', updatedContact) // push contact copy to store
      this.isEdittable = false  // close editting mode
    },

    // show modal "Cancel"
    askCancel(){

      // check mode
      if (this.isEdittable){ 
        this.isModalShows = true // if edditing (btn == cancel) then show modal
      }
      else {
        this.isEdittable = true // if default then switch mode to editting
      }
    },

    // cancel changes
    cancelEditting(){

        // get original contact from store
        this.contact = this.$store.getters.getContactNoReact(this.$route.params.id)
        this.isModalShows = false // close modal
        this.isEdittable = false // switch to default mode
    },

    // show modal "Remove field" and get name of field
    askRemoveField(name){
      this.fieldNameToRemove = name 
      this.isFieldRemoving = true // show modal
    },

    // remove field from contact info
    removeField(name){
      this.setLastStep(this.contact) // store state

      let updatedContact = {}
      for ( let field in this.contact){
        if (field !== name) updatedContact = Object.assign(updatedContact, { [field]: this.contact[field]})
      }
      this.contact = updatedContact  

      this.isFieldRemoving = false   // hide modal
    },
    
    // save state
    setLastStep(state){
      if (this.resetSteps) { // if fields was backuped

        // remove next steps
        this.lastSteps = this.lastSteps.splice(0, this.lastSteps.length - this.stepID - 1);
        
        //add last step
        this.lastSteps.push(this.lastState)

        this.resetSteps = false // return to default 
      }
      this.stepID++ 
      this.lastSteps.push(Object.assign({}, state)) // add new state to arr
      this.isBackDisabled = false // remove :disabled of btn
    },

    // return last change
    undoLastAction(){
      if (this.stepID >= 0 && this.stepID < this.lastSteps.length){
        this.stepID-- 

        // store last state in var in case of its changes
        this.lastState = Object.assign({}, this.lastSteps[this.lastSteps.length - 1 - this.stepID])
        
        this.contact = this.lastSteps[this.stepID] // backup state
        if (this.stepID == 0) {
          this.isBackDisabled = true // disable btn if there are no more backups
        }
      }
      this.resetSteps = true // data is backuped
    }
  },

  mounted(){
    // push default state in states
    this.lastSteps = []
    this.lastSteps.push(Object.assign({}, this.contact))

  },
  components:{
    addField, Modal
  }
}
</script>


<style lang="scss" scoped>
  .header{
    margin-bottom: 20px;
  }
  .input-id{
    display: none;
  }
  .input-wrapper{
    display: flex;
    justify-content: space-between;
  }
</style>
