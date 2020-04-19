<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
          <strong>Auditoria de Sistemas</strong>
        </div>
        <div class="col s12 l6 m6"> 

           <button class="waves-effect waves-light btn indigo" v-if="fecha==''" @click="Obtener"><i class="material-icons left" >sync</i> Recargar</button>
           <button class="waves-effect waves-light btn indigo" v-if="fecha!=''" @click="ObtenerFecha"><i class="material-icons left" >sync</i> Recargar</button>

        </div>  

        <div class="col s12 l6 m6">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">search</i>
                <input type="date" @change="ObtenerFecha" v-model="fecha">
                <label for="icon_prefix2">Fecha</label>
              </div>
            </div>
        </div>
    
      <div class="col s12 container">
        <table>
          <thead>
            <th>Tabla</th>
            <th>Operacion</th>
            <th>Fecha</th>
            <th>Observacion</th>
            <th>Realizado por</th>
            <th>Desde Equipo</th>
          </thead>

          <tbody>
            <tr v-for="registro in registros">
              <td v-text="registro.nombre_tabla"></td>
              <td v-text="registro.tipo_operacion"></td>
              <td v-text="registro.fecha_registro"></td>
              <td v-text="registro.observacion"></td>
              <td>[{{ registro.idusuario }}] {{ registro.name }}</td>
              <td v-text="registro.nombre_pc"></td>
            </tr>
          </tbody>
        </table>
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
              registros:[],
              fecha:'',
           
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            Obtener(){
              
                var url='/getauditoria';
                    axios.post(url,{
                      onUploadProgress: progressEvent => this.isLoading=true
                    }
                ).then(response=>{ 
                  this.registros=response.data;
                  this.isLoading=false;
                  
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            ObtenerFecha(){
              alert('registro');
              this.registros=[];
                var url='/getauditoriabydate';
                    axios.post(url,{
                      'fecha':this.fecha
                    },{
                      onUploadProgress: progressEvent => this.isLoading=true
                    }
                ).then(response=>{ 
                  this.registros=response.data;
                  this.isLoading=false;
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

            this.Obtener();


            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          },computed: {
       
          }
        }
      </script>