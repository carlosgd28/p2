<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
          <strong>Docentes</strong>
        </div>
        <div class="col s6">
         
          <button class="waves-effect waves-light btn indigo  modal-trigger"  data-target="mdlnuevohijo"><i class="material-icons left" >plus</i> Nuevo</button>

           <button class="waves-effect waves-light btn indigo" @click="Obtener"><i class="material-icons left" >sync</i> Recargar</button>
        </div>  
    
      <div class="col s12 container">
        contenido
      </div>
    </div>


     <!--INICIO MODAL NUEVO HIJO-->
      <div id="mdlnuevohijo" class="modal">
        <div class="modal-content">
          contenido modal
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn green" ><i class="material-icons left">save</i>Guardar</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO PADRE-->
  </div>


</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,
           
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
           
            NuevoHijo(){
               var url='/nuevoreferenciahijo';
                    axios.post(url,this.fillhijo
                ).then(response=>{ 
                  M.toast({html: 'Referencia Hijo Registrado!','classes':'green'});
                  
                  
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
          
            ScritpActive(){
             
              document.querySelector("label[for='nombrehMOD']").classList.add('active');
              document.querySelector("label[for='siglahMOD']").classList.add('active');

            },
          
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