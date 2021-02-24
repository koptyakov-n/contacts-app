<template>
    <div class="modal-layout">
        <div class="modal-wrapper">
            <div class="modal-window">
                <h3>{{modalHeader}}</h3>
                <p>{{modalText}}</p>
                <div class="modal-btn">
                    <button @click="$emit('modal-yes', args)" class="btn btn-clear btn-danger">Yes</button>
                    <button @click="$emit('modal-no', args)" class="btn btn-clear ">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data(){
        return{
            // default text
            header: '', 
            text: '',  
        }
    },
    props: ['type', 'prop'], 
    computed: {
        args(){
            if (this.type == 'delete'){
                return this.prop //id
            }
            if (this.type == 'cancel'){
                return this.prop //id
            }  
            if (this.type == 'removeField'){
                return this.prop //id
            }  
        },
        modalHeader(){ // set header by modal type
            if (this.type == 'delete'){
                return 'Are you sure?'
            }
            if (this.type == 'cancel'){
                return 'Are you sure?'
            }
            if (this.type == 'removeField'){
                return 'Are you sure?'
            }  
        },
        modalText(){ // set text by modal type
            if (this.type == 'delete'){
                return 'Do you really want to delete this contact?'
            }
            if (this.type == 'cancel'){
                return 'Unsaved changes will be lost'
            }
            if (this.type == 'removeField'){
                return 'Do you really want to delete this field?'
            }  
        } 
    }
}
</script>

<style lang="scss" scoped>
    .modal{
        &-layout{
            background: #00000099;
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
        }
        &-wrapper{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        &-window{
            background: #ffffff;
            padding: 24px 32px;
            width: 100%;
            max-width: 320px;
            min-width: 260px;
            text-align: center;
        }
        &-btn{
            display: flex;
            justify-content: space-between;
        }
    }
</style>