<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12 l8 m8">
            <a href="" class="breadcrumb">Asignaturas a cargo de docente</a>
            <a href="" class="breadcrumb">Contenidos Imprescindibles</a>
        </div>
        <div class="col s12 l4 m4" style="text-align:right;">
          <div class="row">
           

            <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetContenido"><i class="material-icons left" >sync</i> Recargar</button>
          </div>
        </div>  
    

      <div class="col s12 l12 m12">
       
        <div>
          <strong>{{ contenidos.length }} registros</strong>
        </div>
        <div v-for="contenido in contenidos">
          <div class="card">
            <div class="row">
              <div class="card-content">
                <div class="row">
                  <div class="col s12 l8 m8">
                     <strong style="font-size:18px;" class="indigo-text">{{ contenido.contenido.nombre }}</strong>
                      <br>
                      
                     <strong v-if="contenido.asignado.length>0" class="green-text">Habilitado</strong>
                     <strong v-if="contenido.asignado.length==0" class="orange-text">No Habilitado</strong>
                     <br>
                     <strong>Evaluaciones:</strong>
                     <br>

                     <div v-for="asignado in contenido.asignado ">
                      <table  class="striped">
                        <tr v-for="evaluacion in asignado.evaluacion">
                          <td>
                           
                            <span class="new badge teal"  data-badge-caption="" >{{ evaluacion.tipo }}</span>
                            <span class="new badge red modal-trigger" data-target="mdldescartarevaluacion" @click="SelectContenidoDescartarEvaluacion(evaluacion.id)"  data-badge-caption="">Descartar</span>
                          </td>
                        </tr>
                        <label v-if="asignado.evaluacion.length==0">Ninguna evaluación</label>
                      </table>
                                           
                       
                     </div>

                      

                   
                  </div>
                  <div class="col s12 l4 m4" >
                   
                    <button class="waves-effect waves-light btn teal lighten-1 btn-small  modal-trigger" v-if="contenido.asignado.length==0"  data-target="mdlhabilitar" @click="SelectContenido(contenido.contenido)">Habilitar contenido</button>

                    <div v-for="cont_asig in contenido.asignado">
                    <button class="waves-effect waves-light btn indigo btn-small  modal-trigger"  data-target="mdlevaluacion" v-if="cont_asig.estado_ca=='A'"  style="margin:3px;" @click="SelectContenido2(contenido.contenido,contenido.asignado)">Nueva Evaluacion</button>

                    <button class="waves-effect waves-light btn orange btn-small" @click="Culminar(cont_asig.id)"  v-if="cont_asig.estado_ca=='A'"  style="margin:3px;"> Archivar</button>

                    <button class="waves-effect waves-light btn blue btn-small" @click="Activar(cont_asig.id)"  v-if="cont_asig.estado_ca=='I'"  style="margin:3px;"> Activar</button>


                    <button class="waves-effect waves-light btn red btn-small  modal-trigger"  data-target="mdldescartar" @click="SelectContenidoDescartar(contenido.contenido,cont_asig.id)"  v-if="cont_asig.estado_ca=='A'"  style="margin:3px;"> Descartar</button>

                    </div>


                  </div>

                </div>
              </div>
              
            </div>
              
            </div>
        </div>
          
      </div>
    </div>


<!--INICIO MODAL NUEVO HIJO-->
      <div id="mdldescartarevaluacion" class="modal">
        <div class="modal-content">
         <strong>¿Seguro que desea descartar evaluacion?</strong>
         <br>
          <label class="red-text">será eliminado para todos los matriculados en está promoción.</label>
         
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal lighten-1"  @click="DescartarEvaluacion">Entendido, Descartar</button>

          <button class="modal-close waves-effect btn-flat"><i class="material-icons left">close</i>No, Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO PADRE-->


     <!--INICIO MODAL NUEVO HIJO-->
      <div id="mdldescartar" class="modal">
        <div class="modal-content">
          <strong>Al Descartar contenido de  <em class="indigo-text">{{ fillcontenido.nombre }}</em> las evaluaciones asociados al mismo serán eliminados. </strong>
          <br>
          <label class="red-text">será eliminado para todos los matriculados en está promoción.</label>
        
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal lighten-1"  @click="DescartarContenido">Entendido, Descartar</button>

          <button class="modal-close waves-effect btn-flat"><i class="material-icons left">close</i>No, Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO PADRE-->

     <!--INICIO MODAL NUEVO EVALUACION-->
      <div id="mdlevaluacion" class="modal">
        <div class="modal-content">

          <span>Asignar Evaluación</span>

          <div>
            <strong>Al Habilitar la evaluación para  <em class="indigo-text">{{ fillcontenido.nombre }}</em> , será asignado a todos los matriculados de está promoción.</strong>
          </div>
          <div class="row">
           <br>
             <div class="input-field col s12 l12 m12">
               <select class="browser-default" v-model="fillevaluacion.tipo" id="tipo">
                  <option value="FORMADORA">Formadora</option>
                  <option value="INTEGRADORA">Integradora</option>
                </select>
              <label for="tipo">Tipo Evaluación <span class="red-text">*</span></label>
            </div>
          </div>
          
          
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal"  @click="HabilitarEvaluacion" v-if="fillevaluacion.tipo!=''"><i class="material-icons left">save</i>Entendido, Habilitar</button>

          <button class="modal-close waves-effect orange btn-flat"><i class="material-icons left">close</i>No, Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO EVALUACION-->


     <!--INICIO MODAL NUEVO HIJO-->
      <div id="mdlhabilitar" class="modal">
        <div class="modal-content">
          <strong>Al Habilitar  <em class="indigo-text">{{ fillcontenido.nombre }}</em> , será asignado a todos los matriculados de está promoción.</strong>
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal lighten-1"  @click="HabilitarContenido"><i class="material-icons left">save</i>Entendido, Habilitar</button>

          <button class="modal-close waves-effect orange btn-flat"><i class="material-icons left">close</i>No, Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO PADRE-->

    
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
   props:{
      idarea:String,
      iddocentearea:String,
     },
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,
              contenidos:[],
              fillcontenido:{'id':'','nombre':''},
              tipo_evaluacion:'', 
              fillevaluacion:{'tipo':'','idcontenidoasignado':''},
              idcontenido:'',
              idevaluacion:'',
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            Culminar(idcontenido){
              var url='/culminarcursoasignado';
                    axios.post(url,{
                      'idcontenido':idcontenido,
                    }
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Contenido Archivado','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            Activar(idcontenido){
              var url='/activarcursoasignado';
                    axios.post(url,{
                      'idcontenido':idcontenido,
                    }
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Contenido Activado','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            DescartarEvaluacion(){
              var url='/descartarevaluacion';
                    axios.post(url,{
                      'idevaluacion':this.idevaluacion,
                    }
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Contenido Descartado','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            DescartarContenido(){
               var url='/descartarcontenidoareaconocimiento';
                    axios.post(url,{
                      'idcontenido':this.idcontenido,
                    }
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Contenido Descartado','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            HabilitarEvaluacion(){
              var url='/habilitarevaluacion';
                    axios.post(url,this.fillevaluacion
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Evaluacion habilitado','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            HabilitarContenido(){
               var url='/habilitarcontenido';
                    axios.post(url,{
                      'idcontenido':this.fillcontenido.id,
                      'iddocentearea':this.iddocentearea
                    }
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Contenido Obtenido','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            SelectContenido2(contenido,asignado){
            
              this.fillcontenido.id=contenido.id;
              this.fillcontenido.nombre=contenido.nombre;
              this.fillevaluacion.idcontenidoasignado=asignado[0]['id'];

            },

            SelectContenido(contenido){
              this.fillcontenido.id=contenido.id;
              this.fillcontenido.nombre=contenido.nombre;
            },
            SelectContenidoDescartar(contenido,idcontenido){
              this.fillcontenido.id=contenido.id;
              this.fillcontenido.nombre=contenido.nombre;
              this.idcontenido=idcontenido;
            },
            SelectContenidoDescartarEvaluacion(idevaluacion){
              this.idevaluacion=idevaluacion;
            },
            GetContenido(){
               var url='/getcontenidobyidarea';
                    axios.post(url,{
                      'idarea':this.idarea,
                      'iddocente':this.iddocentearea
                    }
                ).then(response=>{ 
                 
                   document.querySelector("label[for='tipo']").classList.add('active');
                             document.addEventListener('DOMContentLoaded', function() {
                    var elems = document.querySelectorAll('.chips');
                    var instances = M.Chips.init(elems, options);
                  });
                  this.contenidos=response.data;
                  M.toast({html: 'Contenido Obtenido','classes':'teal lighten-1'});
                  
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
           

            this.GetContenido();
            
          },computed: {
       
          }
        }
      </script>