<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
            <router-link  :to="'/matricular/'+idciclo" class="breadcrumb" >Matricula</router-link>
            <a href="" class="breadcrumb">Modulos</a>
        </div>
        <div class="col s12 l12 m12">

           <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetModulos">  Recargar</button>
        </div>  

    
      <div class="col s12 container">
       <table>
         <thead>
             <th>MODULO</th>
              <th>NOTA <br><label>Caracteristica Personal</label></th>
              <th>NOTA <br><label>Coevaluación</label></th>
              <th>NOTA <br><label>Actividad Integradora Grupal</label></th>

              <th>ACCIONES</th>
         </thead>
         <tbody>
           <tr v-for="modulo in modulos">
            
             <td>{{ modulo.nombre }}</td>
             <td>{{ modulo.caract_personal_nota }}</td>
             <td>{{ modulo.coevaluacion_nota }}</td>
             <td>{{ modulo.nota_aig }}</td>
             <td>
                <router-link  :to="'/asignaturas/'+idciclo+'/'+idmatricula+'/'+modulo.idmc"  class="waves-effect waves-green btn-small btn  indigo">Areas de Conocimiento</router-link>
              
        
                 <button class="waves-effect waves-green btn-small btn teal lighten-1 modal-trigger"  data-target="mdlevaluar" @click="Evaluar(modulo)"> Evaluar</button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
    </div>


     
     <!--INICIO MODAL EVALUAR MODULO-->
      <div id="mdlevaluar" class="modal">
       
        <div class="modal-content">
          <p><strong>EVALUAR MODULO</strong></p>
         
          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input id="nombre" type="text" v-model="fillevaluacion.nombre" disabled class="validate">
              <label for="nombre">Modulo <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s4">
              <input id="nota1" type="number" v-model="fillevaluacion.caract_personal_nota" class="validate">
              <label for="nota1">Caracteristica Personal <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="nota2" type="number" v-model="fillevaluacion.coevaluacion_nota" class="validate">
              <label for="nota2">Coevaluación <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="nota3" type="number" v-model="fillevaluacion.nota_aig" class="validate">
              <label for="nota3">Actividad Integradora Grupal <span class="red-text">*</span></label>
            </div>

          </div>
        </div>

        <div class="modal-footer">
            <button class="waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close"  @click="RegistrarNota">Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>
        </div>
      </div>
    <!--FIN MODAL EVALUAR MODULO-->
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
   props:{
            idciclo:String,
            idmatricula:String
     },
    data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              modulos:[],
              fillevaluacion:{'id':'','caract_personal_nota':'','coevaluacion_nota':'','nombre':'','nota_aig':''}
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            RegistrarNota(){
                var url='/registrarnotamodulo';
                    axios.post(url,this.fillevaluacion
                ).then(response=>{ 
                  this.GetModulos();
                  M.toast({html: 'Notas Registrados','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            Evaluar(modulo){

              this.fillevaluacion.id=modulo.idmc;
              this.fillevaluacion.caract_personal_nota=modulo.caract_personal_nota;
              this.fillevaluacion.coevaluacion_nota=modulo.coevaluacion_nota;
              this.fillevaluacion.nota_aig=modulo.nota_aig;
              this.fillevaluacion.nombre=modulo.nombre;
              document.querySelector("label[for='nombre']").classList.add('active');
              document.querySelector("label[for='nota1']").classList.add('active');
              document.querySelector("label[for='nota2']").classList.add('active');
              document.querySelector("label[for='nota3']").classList.add('active');

            },
            GetModulos(){
            
               var url='/getmodulosmatricula';
                    axios.post(url,{
                      'idmatricula':this.idmatricula
                    }
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