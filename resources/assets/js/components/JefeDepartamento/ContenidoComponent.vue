<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
            <a href="/modulos" class="breadcrumb">Modulos</a>
            <router-link  :to="'/areaconocimiento/'+idmodulo" class="breadcrumb">Areas de Conocimiento</router-link>
            <a href="" class="breadcrumb">Contenido Imprescindible</a>

        </div>
        <div class="col s12 l12 m12">
          <button class="btn modal-trigger waves-effect teal lighten-1"  data-target="mdlnuevocontenido">Nuevo
          </button>

          <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetContenido">  Recargar</button>
        </div>  

    
      <div class="col s12 container">
       <table>
         <thead>
              <th>Contenido Imprescindible</th>
              <th>Estado</th>
              <th>Acciones</th>
         </thead>
         <tbody>
           <tr v-for="contenido in contenidos">
             <td>{{ contenido.nombre }}</td>
           
             <td>
                <strong v-if="contenido.estado=='A'" class="green-text"> Activo</strong>
                <strong v-if="contenido.estado=='I'" class="red-text"> Cerrado </strong>
             </td>
             <td>
                
             
              
        
                 <button class="waves-effect waves-green btn-small btn  cyan darken-1 modal-trigger"  data-target="mdlmodificarcontenido" @click="ViewModificar(contenido)"> Modificar</button>

                 <button class="waves-effect waves-green btn-small btn   blue-grey" v-if="contenido.estado=='A'"  @click="Desactivar(contenido.id)"> Desactivar</button>

                 <button class="waves-effect waves-green btn-small btn green accent-4 modal-trigger" v-if="contenido.estado=='I'" @click="Activar(contenido.id)"> Activar</button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
    </div>

     <!--INICIO MODAL NUEVO MODULO-->
      <div id="mdlnuevocontenido" class="modal">
       
        <div class="modal-content">
          <p><strong>NUEVO CONTENIDO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" v-model="fillcontenido.nombre" class="validate">
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

    <!--INICIO MODAL MODIFICAR MODULO-->
      <div id="mdlmodificarcontenido" class="modal">
       
        <div class="modal-content">
          <p><strong>MODIFICAR CONTENIDO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input id="nombre" type="text" v-model="fillcontenido2.nombre" class="validate">
              <label for="nombre">Nombre <span class="red-text">*</span></label>
            </div>

          </div>
        </div>

        <div class="modal-footer">
            <button class="waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close"  @click="Modificar">Modificar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>
        </div>
      </div>
    <!--FIN MODAL MODIFICAR MODULO-->

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
        idmodulo:String,
        idarea:String
      },
      data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              contenidos:[],
              modulos:[],
              fillevaluacion:{'id':'','caract_personal_nota':'','coevaluacion_nota':'','nombre':''},

              fillcontenido:{'id':'','nombre':'','idarea':''},
              fillcontenido2:{'id':'','nombre':'','idarea':''},
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            Activar(idcontenido){
               var url='/activarcontenido';
                    axios.post(url,{
                      'idcontenido':idcontenido
                    }
                ).then(response=>{ 
                  this.GetContenido();
                  M.toast({html: 'Contenido Activado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Desactivar(idcontenido){
               var url='/desactivarcontenido';
                    axios.post(url,{
                      'idcontenido':idcontenido
                    }
                ).then(response=>{ 
                  this.GetContenido();
                 
                  M.toast({html: 'Contenido Desactivado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Modificar(){
               var url='/modificarcontenido';
                    axios.post(url,this.fillcontenido2
                ).then(response=>{ 
                  this.GetContenido();
                  this.fillcontenido2.id='';
                  this.fillcontenido2.nombre='';
                  this.fillcontenido2.idarea='';
                  M.toast({html: 'Modulo Modificado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            ViewModificar(contenido){
              this.fillcontenido2.id=contenido.id;
              this.fillcontenido2.nombre=contenido.nombre;
              this.fillcontenido2.idarea=contenido.idarea;
              document.querySelector("label[for='nombre']").classList.add('active');
            },
            Registrar(){
              this.fillcontenido.idarea=this.idarea;
                var url='/nuevocontenido';
                    axios.post(url,this.fillcontenido
                ).then(response=>{ 
                  this.GetContenido();
                  this.fillcontenido.id='';
                  this.fillcontenido.nombre='';
                  M.toast({html: 'Contenido Registrado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            GetContenido(){
               var url='/getcontenido';
                    axios.post(url,{
                      'idarea':this.idarea
                    }
                ).then(response=>{ 
                  this.contenidos=response.data;
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

            this.GetContenido();
            
          },computed: {
       
          }
        }
      </script>