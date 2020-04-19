<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
            <a href="" class="breadcrumb">Modulos</a>
        </div>
        <div class="col s12 l12 m12">
          <button class="btn modal-trigger waves-effect teal lighten-1 "  data-target="mdlnuevomodulo">Nuevo
          </button>

          <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetModulos">  Recargar</button>
        </div>  

    
      <div class="col s12 container">
       <table>
         <thead>
              <th>Modulo</th>
              <th>Competencia</th>
              <th>Objetivo</th>
              <th>Estado</th>
              <th>Acciones</th>
         </thead>
         <tbody>
           <tr v-for="modulo in modulos">
             <td>{{ modulo.nombre }}</td>
             <td>{{ modulo.competencia }}</td>
             <td>{{ modulo.objetivo}}</td>
             <td>
                <strong v-if="modulo.estado=='A'" class="green-text"> Activo</strong>
                <strong v-if="modulo.estado=='I'" class="red-text"> Cerrado </strong>
             </td>
             <td>
                
                <router-link  :to="'/areaconocimiento/'+modulo.id"  class="waves-effect waves-green btn-small btn  indigo">Areas de Conocimiento</router-link>
              
        
                 <button class="waves-effect waves-green btn-small btn  cyan darken-1 modal-trigger"  data-target="mdlmodificarmodulo" @click="ViewModificar(modulo)"> Modificar</button>

                 <button class="waves-effect waves-green btn-small btn   blue-grey" v-if="modulo.estado=='A'"  @click="Desactivar(modulo.id)"> Desactivar</button>

                 <button class="waves-effect waves-green btn-small btn green accent-4 modal-trigger" v-if="modulo.estado=='I'" @click="Activar(modulo.id)"> Activar</button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
    </div>


     
     <!--INICIO MODAL NUEVO MODULO-->
      <div id="mdlnuevomodulo" class="modal">
       
        <div class="modal-content">
          <p><strong>NUEVO MODULO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" v-model="fillmodulo.nombre" class="validate">
              <label>Nombre <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input  type="text" v-model="fillmodulo.competencia" class="validate">
              <label>Competencia <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s12 l12 m12">
              <input  type="text" v-model="fillmodulo.objetivo" class="validate">
              <label >Objetivo <span class="red-text">*</span></label>
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
      <div id="mdlmodificarmodulo" class="modal">
       
        <div class="modal-content">
          <p><strong>MODIFICAR MODULO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input id="nombre" type="text" v-model="fillmodulo2.nombre" class="validate">
              <label for="nombre">Nombre <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input id="competencia" type="text" v-model="fillmodulo2.competencia" class="validate">
              <label for="competencia">Competencia <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s12 l12 m12">
              <input id="objetivo" type="text" v-model="fillmodulo2.objetivo" class="validate">
              <label for="objetivo">Objetivo <span class="red-text">*</span></label>
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
    data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              modulos:[],
              fillevaluacion:{'id':'','caract_personal_nota':'','coevaluacion_nota':'','nombre':''},

              fillmodulo:{'id':'','nombre':'','competencia':'','objetivo':''},
              fillmodulo2:{'id':'','nombre':'','competencia':'','objetivo':''},

              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            Activar(idmodulo){
               var url='/activarmodulo';
                    axios.post(url,{
                      'idmodulo':idmodulo
                    }
                ).then(response=>{ 
                  this.GetModulos();
                  M.toast({html: 'Modulo Activado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Desactivar(idmodulo){
               var url='/desactivarmodulo';
                    axios.post(url,{
                      'idmodulo':idmodulo
                    }
                ).then(response=>{ 
                  this.GetModulos();
                 
                  M.toast({html: 'Modulo Desactivado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Modificar(){
               var url='/modificarmodulo';
                    axios.post(url,this.fillmodulo2
                ).then(response=>{ 
                  this.GetModulos();
                  this.fillmodulo2.id='';
                  this.fillmodulo2.nombre='';
                  this.fillmodulo2.competencia='';
                  this.fillmodulo2.objetivo='';
                  M.toast({html: 'Modulo Modificado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            ViewModificar(modulo){
              this.fillmodulo2.id=modulo.id;
              this.fillmodulo2.nombre=modulo.nombre;
              this.fillmodulo2.competencia=modulo.competencia;
              this.fillmodulo2.objetivo=modulo.objetivo;
              document.querySelector("label[for='nombre']").classList.add('active');
              document.querySelector("label[for='competencia']").classList.add('active');
              document.querySelector("label[for='objetivo']").classList.add('active');
            },
            Registrar(){
                var url='/nuevomodulo';
                    axios.post(url,this.fillmodulo
                ).then(response=>{ 
                  this.GetModulos();
                  this.fillmodulo.id='';
                  this.fillmodulo.nombre='';
                  this.fillmodulo.competencia='';
                  this.fillmodulo.objetivo='';
                  M.toast({html: 'Modulo Registrado','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            GetModulos(){
            
               var url='/getmodulos';
                    axios.post(url,
                ).then(response=>{ 
                  this.modulos=response.data;
                  M.toast({html: 'Modulos Obtenidos','classes':'teal lighten-1'});
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

            this.GetModulos();
            
          },computed: {
       
          }
        }
      </script>