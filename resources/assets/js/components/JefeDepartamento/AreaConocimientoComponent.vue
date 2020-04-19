<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
            <a href="/modulos" class="breadcrumb">Modulos</a>
            <a href="" class="breadcrumb">Areas de Conocimiento</a>
        </div>
        <div class="col s12 l6 m6">
          <button class="btn modal-trigger waves-effect teal lighten-1 "  data-target="mdlnuevomodulo">Nuevo
          </button>

          <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetAreas">  Recargar</button>
        </div> 

        <div class="col s12 l6 m6" style="text-align:right;">
          <strong>{{ areas.length + ' Registros' }}</strong>
        </div> 

    
      <div class="col s12 container">
       <table>
         <thead>
              <th>Area de Conocimiento</th>
              <th>Estado</th>
              <th>Acciones</th>
         </thead>
         <tbody>
           <tr v-for="area in areas">
             <td>{{ area.nombre }}</td>
           
             <td>
                <strong v-if="area.estado=='A'" class="green-text"> Activo</strong>
                <strong v-if="area.estado=='I'" class="red-text"> Cerrado </strong>
             </td>
             <td>
                
                <router-link  :to="'/contenidos/'+idmodulo+'/'+area.id"  class="waves-effect waves-green btn-small btn  indigo">Contenidos Imprescindibles</router-link>
              
        
                 <button class="waves-effect waves-green btn-small btn  cyan darken-1 modal-trigger"  data-target="mdlmodificararea" @click="ViewModificar(area)"> Modificar</button>

                 <button class="waves-effect waves-green btn-small btn   blue-grey" v-if="area.estado=='A'"  @click="Desactivar(area.id)"> Desactivar</button>

                 <button class="waves-effect waves-green btn-small btn green accent-4 modal-trigger" v-if="area.estado=='I'" @click="Activar(area.id)"> Activar</button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
    </div>

     <!--INICIO MODAL NUEVO MODULO-->
      <div id="mdlnuevomodulo" class="modal">
       
        <div class="modal-content">
          <p><strong>NUEVO AREA DE CONOCIMIENTO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" v-model="fillarea.nombre" class="validate">
              <label>Nombre <span class="red-text">*</span></label>
            </div>

          </div>
        </div>

        <div class="modal-footer">
            <button class="waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close"  @click="Registrar">Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>
        </div>
      </div>
    <!--FIN MODAL NUEVO MODULO-->

    <!--INICIO MODAL MODIFICAR AREA CONOCIMIENTO-->
      <div id="mdlmodificararea" class="modal">
       
        <div class="modal-content">
          <p><strong>MODIFICAR AREA DE CONOCIMIENTO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input id="nombre" type="text" v-model="fillarea2.nombre" class="validate">
              <label for="nombre">Nombre <span class="red-text">*</span></label>
            </div>

          </div>
        </div>

        <div class="modal-footer">
            <button class="waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close"  @click="Modificar">Modificar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>
        </div>
      </div>
    <!--FIN MODAL MODIFICAR AREA CONOCIMIENTO-->

  </div>


</template>
<style type="text/css">
  
.breadcrumb:before {
    color: #999999;
}

.breadcrumb {
  font-size: 13px;
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
      components: {
          
      },
      props:{
        idmodulo:String
      },
      data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              areas:[],
              modulos:[],
              fillevaluacion:{'id':'','caract_personal_nota':'','coevaluacion_nota':'','nombre':''},

              fillarea:{'id':'','nombre':'','idmodulo':''},
              fillarea2:{'id':'','nombre':'','idmodulo':''},

              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            Activar(idarea){
               var url='/activararea';
                    axios.post(url,{
                      'idarea':idarea
                    }
                ).then(response=>{ 
                  this.GetAreas();
                  M.toast({html: 'Area Activado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Desactivar(idarea){
               var url='/desactivararea';
                    axios.post(url,{
                      'idarea':idarea
                    }
                ).then(response=>{ 
                  this.GetAreas();
                 
                  M.toast({html: 'Area Desactivado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Modificar(){
               var url='/modificararea';
                    axios.post(url,this.fillarea2
                ).then(response=>{ 
                  this.GetAreas();
                  this.fillarea2.id='';
                  this.fillarea2.nombre='';
                  M.toast({html: 'Area Modificado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            ViewModificar(area){
              this.fillarea2.id=area.id;
              this.fillarea2.nombre=area.nombre;
              document.querySelector("label[for='nombre']").classList.add('active');
            },
            Registrar(){
                this.fillarea.idmodulo=this.idmodulo;
                var url='/nuevoarea';
                    axios.post(url,this.fillarea
                ).then(response=>{ 
                  this.GetAreas();
                  this.fillarea.id='';
                  this.fillarea.nombre='';
                  M.toast({html: 'Area Registrado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            GetAreas(){
               var url='/getareasconocimiento';
                    axios.post(url,{
                      'idmodulo':this.idmodulo
                    }
                ).then(response=>{ 
                  this.areas=response.data;
                  M.toast({html: 'Areas Obtenidos','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            }
          },  
          mounted() {
            M.AutoInit();

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });

            this.GetAreas();
            
          },computed: {
       
          }
        }
      </script>