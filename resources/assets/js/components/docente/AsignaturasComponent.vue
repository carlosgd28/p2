<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12 l6 m6">
            <a href="" class="breadcrumb">Asignaturas a cargo de docente</a>
        </div>
        <div class="col s12 l6 m6" style="text-align:right;">
          <div class="row">
           
            <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetAsignatura"><i class="material-icons left" >sync</i> Recargar</button>
          </div>
        </div>  
    
      

      <div class="col s12 l12 m12">
   
        <div>
          <strong>{{ asignaturas.length }} Asignaturas a su cargo.</strong>
          
        </div>
        <div v-for="asignatura in asignaturas">
          <div class="card">
            <div class="row">
              <div class="card-content">
                <div class="row">
                  <div class="col s12 l6 m6">
                     
                     <strong style="font-size:18px;" class="indigo-text">{{ asignatura.area.nombre }}</strong>
                     <br>
                     <em>{{ asignatura.area.modulo.nombre }}</em>
                     <br>
                     <strong>Promocion:{{ asignatura.promocion.nro_promocion }}</strong>
                     <br>
                      <strong v-if="asignatura.estado_da=='A'" class="green-text">Activo</strong>
                     <br>
                    
                  </div>
                  <div class="col s12 l6 m6">
                     <router-link :to="'/contenidosasignatura/'+asignatura.area.id+'/'+asignatura.id" class="waves-effect waves-light btn indigo btn-small">Contenidos</router-link>


                     <router-link :to="'/especialistasmatriculados/'+asignatura.area.id+'/'+asignatura.id" class="waves-effect waves-light btn teal lighten-1 btn-small">Matriculados</router-link>

                     <button class="waves-effect waves-light btn blue btn-small  modal-trigger"  data-target="mdlverhorario" @click="GetHorario(asignatura.id)" style="margin:3px;">Ver Horario</button>


                    <a :href="'/actanotaspdf/'+asignatura.id" target="blank" class="waves-effect waves-light btn red btn-small">Acta de Notas</a>

              

                    
                   
                  </div>

                </div>
              </div>
              
            </div>
              
            </div>
        </div>
          
      </div>
    </div>


     <!--INICIO MODAL VER HORARIO-->
      <div id="mdlverhorario" class="modal">
        <div class="modal-content">
          <h5>Horario de clases</h5>
          
          <div class="progress" v-if="smshorario==true">
              <div class="indeterminate"></div>
          </div>
          <table>
            <thead>
              <th>Día</th>
              <th>Inicio</th>
              <th>Término</th>
            </thead>
            <tbody>
              <tr v-for="horario in horarios">
                <td>{{ horario.dia }}</td>
                <td>{{ horario.inicio }}</td>
                <td>{{ horario.termino }}</td>
              </tr>
            </tbody>
            <div>
              <label v-if="horarios.length==0">Ningun registro.</label>
            </div>
          </table>
        </div>

        <div class="modal-footer">
        
          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>

        </div>
      </div>
    <!--FIN MODAL VER HORARIO-->
  </div>


</template>
<style type="text/css">
.breadcrumb:before {
    color: #999999;
}

.breadcrumb {
  font-size: 18px;
  color: #999999;
}
 
.breadcrumb:before {
    color: #999999;
}
 
.breadcrumb:last-child {
  color: #999999 ;
}
</style>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {

    data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              asignaturas:[],
              horarios:[],
              smshorario:false,
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            GetHorario(idasignatura){
                this.smshorario=true;
                this.horarios=[];
               var url='/gethorarioasignatura';
                    axios.post(url,{
                      'idasignatura':idasignatura,
                      

                    }
                ).then(response=>{
                  this.horarios=response.data; 
                  this.smshorario=false;
                  M.toast({html: 'Horario obtenido','classes':'teal lighten-1'});
                  
                  

                }).catch(error=>{
                   M.toast({html: 'Ocurrio un error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            GetAsignatura(){
              var url='/getasignaturadocente';
                    axios.post(url,{
                      'id':this.usuario.clasifica_persona_id
                    }
                ).then(response=>{
                  this.asignaturas=response.data; 
                  M.toast({html: 'Asignaturas obtenidos','classes':'teal lighten-1'});
                  
                  

                }).catch(error=>{
                   M.toast({html: 'Ocurrio un error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            NuevoHijo(){
               var url='/nuevoreferenciahijo';
                    axios.post(url,this.fillhijo
                ).then(response=>{ 
                  M.toast({html: 'Referencia Hijo Registrado!','classes':'teal lighten-1'});
                  
                  
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
            this.GetAsignatura();
          },computed: {
       
          }
        }
      </script>