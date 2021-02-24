<template>
  <div>

    <div class="header">
      <div class="header-left header-btn-wrapper">
      </div>
      <h1>Contacts App</h1>
      <div class="header-right header-btn-wrapper">
        <button @click="isNewContact = !isNewContact" class="btn btn-clear">{{AddBtnLabel}}</button>
      </div>
    </div>

    <newContact 
      v-if="isNewContact" 
      @close-block="isNewContact = false"
    />

    <div class="contacts" v-if="contacts.length">
      <ul>
        <li 
          v-for="contact in contacts" 
          :key="contact.id"
        >

          <router-link 
            class="contact-link"
            :to="'/info/' + contact.id"
          >
            <div class="contact-info">
                <span class="contact-name" v-if="contact.firstname || contact.lastname">
                    {{contact.firstname}} <strong>{{contact.lastname}}</strong>
                </span>
                <span class="contact-name" v-else>
                    Empty
                </span>
                <span class="contact-phone">
                    {{contact.phone}}
                </span>
            </div>
            <span class="contact-label">Open</span> 
          </router-link>

          <button class="btn btn-remove" @click="askDelete(contact.id)">X</button>

        </li>
      </ul>
    </div>
    <p v-else class="body" style="text-align: center; margin-top: 20px">No contacts!</p>
    
    <Modal 
      v-if="isModalShows"
      :prop="idToDelete"
      :type="'delete'"
      @modal-yes="deleteContact"
      @modal-no="isModalShows = false"
    />
  </div>
</template>

<script>
import newContact from "@/components/newContact"
import Modal from "@/components/Modal"

export default {
  name: 'List',
  data(){
    return {
      isNewContact: false, // toggle newContact component
      isModalShows: false, // toggle Modal
      idToDelete: -1
    }
  },
  computed: {
    contacts(){
      return this.$store.getters.contacts // get contacts from store
    },
    AddBtnLabel(){
      return this.isNewContact ? 'Cancel' : 'Add'  // toggle btn label
    }
  },
  components: {
    newContact, Modal
  },
  methods: {
    askDelete(index){ // show modal
      this.idToDelete = index
      this.isModalShows = true
    },
    deleteContact(index){ 
      this.$store.dispatch('deleteContact', index) 
      this.isModalShows = false // remove modal
    }
  }
}
</script>


<style lang="scss" scoped>

  .contact{
    &-link{
      width: 100%;
      display: flex;
      justify-content: space-between;
      
      padding: 16px;
      color: unset;
      text-decoration: none;
      cursor: pointer;

      white-space: nowrap;
      overflow: hidden;
      
    }
    &-name{
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-phone{
      display: block;
      opacity: 0.7;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-label{
      color: #2f80ed;
      display: flex;
      align-items: center;
    }
    &-info{
      overflow: hidden;
    }
  }
  li{
    display: flex;
    overflow: hidden;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    &:hover .btn-remove{
      width: 66px;
      opacity: 1;
      transition: 0.5s ease;
      
    }
  }
  .btn-remove{

    padding: 0;
    opacity: 0;
    width: 0;
    transition: 0.5s ease width;

  }
</style>
