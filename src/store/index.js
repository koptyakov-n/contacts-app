import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {id: 0, firstname: 'Иван', lastname: 'Дорн', phone: '+7 (901) 123 4567'},
      {id: 1, firstname: 'Николай', lastname: 'Басков', phone: '+7 (964) 000 1122'},
      {id: 2, firstname: 'Александр', lastname: 'Ревва', phone: '+7 (950) 555 6677'},
      {id: 3, firstname: 'Юрий', lastname: 'Шатунов', phone: '+7 (800) 555 3535'},
      {id: 4, firstname: 'Владимир', lastname: 'Соловьев', phone: '+7 (911) 255 7667'},
      {id: 5, firstname: 'Григорий', lastname: 'Лепс', phone: '+7 (921) 530 0515'},
      {id: 6, firstname: 'Алла', lastname: 'Пугачева', phone: '+7 (952) 605 2379'},
      {id: 7, firstname: 'Надежда', lastname: 'Кадышева', phone: '+7 (906) 180 1122'},
      {id: 8, firstname: 'Евгений', lastname: 'Петросян', phone: '+7 (980) 007 2687'},
      {id: 9, firstname: 'Дима', lastname: 'Билан', phone: '+7 (962) 675 9800'},
      {id: 10, firstname: 'Эльдар', lastname: 'Джарахов', phone: '+7 (953) 808 4207'},
    ]
  },
  mutations: {
    createContact(state, newContact){
      state.contacts.push(newContact)
    },
    deleteContact(state, id){
      state.contacts = state.contacts.filter(item => item.id !== id)
    },
    updateContact(state, updatedContact){
      state.contacts = state.contacts.filter(item => item.id !== updatedContact.id)
      state.contacts.push(updatedContact)
    }
  },
  actions: {
    createContact({commit}, newContact){
      commit('createContact', newContact)
    },
    deleteContact({commit}, id){
      commit('deleteContact', id)
    },
    updateContact({commit}, updatedContact){
      commit('updateContact', updatedContact)
    }
  },
  modules: {
  },
  getters: {
    contacts: s => s.contacts,
    contact: s => id => s.contacts.filter(t => t.id == id),
    getContactNoReact: state => id => Object.assign({},state.contacts.filter(t => t.id == id)[0]),
  }
})
