<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
          <strong>Referenciales</strong>
        </div>
        <div class="col s6">
          <a class="btn modal-trigger waves-effect blue accent-4"  data-target="mdlnuevopersona">Nuevo<i class="material-icons left">person_add</i>
          </a>
          <button class="waves-effect btn-floating waves-light btn blue-grey" @click="Obtener"><i class="material-icons left">sync</i></button>
        </div>

        <div class="row">
          <form class="col s6">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">search</i>
                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                <label for="icon_prefix2">Nombre</label>
              </div>
            </div>
          </form>
        </div>
       
    
      <div class="col s12">
      
      </div>
    </div>


    <!--INICIO MODAL NUEVO PERSONA-->
      <div id="mdlnuevopersona" class="modal">
        <div class="modal-content">
          <p><strong>REGISTRO PERSONA</strong></p>
          <div class="row">
            formulario
          </div>
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn blue-grey"><i class="material-icons left">close</i>Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO CLIENTE-->
  </div>


</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data(){
      return{
              usuario: global.user,

           
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
              }
          },  
          mounted() {
            M.AutoInit();

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
          },computed: {
       
          }
        }
      </script>