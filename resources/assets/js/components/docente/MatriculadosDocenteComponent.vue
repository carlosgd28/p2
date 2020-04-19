<template>
  <div >
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12 l6 m6">
            <a href="" class="breadcrumb">Asignaturas a cargo de docente</a>
            <a href="" class="breadcrumb">Matriculados</a>
        </div>
        <div class="col s12 l6 m6" style="text-align:right;">
          <div class="row">
            
            <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetMatriculados"><i class="material-icons left" >sync</i> Recargar</button>
          </div>
        </div>  

        <div class="col s12 l12 m12">
          <label>Buscar:</label>
          <input type="text" id="inputsearchproducto" v-on:keyup="Buscar">
        </div>
    
       

      <div class="col s12 l12 m12">


        <table class="responsive-table">
          <thead>
            <th>CEDULA</th>
            <th>GRADO</th>
            <th>NOMBRES Y APELLIDOS</th>
            <th>EXM.FINAL</th>
            <th>NOTA ACA</th>

            <th>CONTENIDO IMPRESCINDIBLE</th>

            
          </thead>
          <tbody>
            <tr v-for="matricula in matriculados">
              <td v-text="matricula.cedula"></td>
              <td>GR/ESP</td>
              <td>
                {{ matricula.nombres +' , '+matricula.appaterno+' '+matricula.apmaterno }}
              </td>
              <td>
                <div class="chip grey lighten-2 white-text modal-trigger" data-target="mdlevaluaref" v-for="aca in matricula.aca" @click="ViewEF(aca,matricula.nombres,matricula.appaterno,matricula.apmaterno)">
                  <span class="new badge  grey lighten-2 red-text" data-badge-caption="" v-if="aca.nota_aca>=0 && aca.examen_final<14"><strong>{{ aca.examen_final }}</strong></span>
                  <span class="new badge grey lighten-2  green-text" data-badge-caption="" v-if="aca.examen_final >=14  && aca.examen_final<=20 "><strong>{{ aca.examen_final }}</strong></span>
                </div>
              </td>
              <td>
                <div class="chip grey lighten-2 white-text modal-trigger" data-target="mdlevaluareaca" v-for="aca in matricula.aca" @click="ViewAca(aca,matricula.nombres,matricula.appaterno,matricula.apmaterno)">
                  <span class="new badge  grey lighten-2 red-text" data-badge-caption="" v-if="aca.nota_aca>=0 && aca.nota_aca<14"><strong>{{ aca.nota_aca }}</strong></span>
                  <span class="new badge grey lighten-2  green-text" data-badge-caption="" v-if="aca.nota_aca>=14 && aca.nota_aca<=20"><strong>{{ aca.nota_aca }}</strong></span>
                </div>
              </td>
              <td>
                <ul v-for="contenido in matricula.contenido">
                  <li>

                      <div class="chip teal white-text   modal-trigger" data-target="mdlevaluarespecialista"   @click="ViewEvaluar(contenido.contenido.idcc,matricula.id,matricula.nombres,matricula.appaterno,matricula.apmaterno)" v-if="contenido.contenido.estado_ca=='A'">
                        {{ contenido.contenido.nombre_contenido }}
                      </div>

                      <div class="chip   teal lighten-3" v-if="contenido.contenido.estado_ca=='A'" v-for="eval in contenido.evaluaciones">
                        {{eval.evaluacion_id+'.-'+eval.tipo_nota}}
                        <span class="new badge white red-text" data-badge-caption="" v-if="parseFloat(eval.nota)>=0 && parseFloat(eval.nota)<14"><strong>{{ eval.nota }}</strong></span>
                        <span class="new badge white green-text" data-badge-caption="" v-if="parseFloat(eval.nota)>=14 && parseFloat(eval.nota)<=20"><strong>{{ eval.nota }}</strong></span>
                      </div>

                      <div class="chip" v-if="contenido.contenido.estado_ca=='I'">
                        {{ contenido.contenido.nombre_contenido }}
                      </div>

                      <div class="chip grey lighten-2" v-if="contenido.contenido.estado_ca=='I'" v-for="eval in contenido.evaluaciones">
                       {{eval.evaluacion_id+'.-'+eval.tipo_nota}}
                         <span class="new badge  grey lighten-2 red-text" data-badge-caption="" v-if="eval.nota>=0 && eval.nota<14"><strong>{{ eval.nota }}</strong></span>
                        <span class="new badge grey lighten-2  green-text" data-badge-caption="" v-if="eval.nota>=14 && eval.nota<=20"><strong>{{ eval.nota }}</strong></span>
                      </div>
                  </li>
                </ul>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>


     <!--INICIO MODAL NUEVO HIJO-->
      <div id="mdlevaluarespecialista" class="modal">
        <div class="modal-content">
          <div class="progress" v-if="evaluacion.length==0">
              <div class="indeterminate"></div>
          </div>
         
          <div>
            <h5 class="indigo-text">{{ nombre }}</h5>
            <label>Realizar Evaluación</label>
             <br>
             <br>
          </div>
          <div  v-if="evaluacion.length>0">
            <div v-for="(eval,index) in evaluacion">
              <label>{{ eval.id+'.-'+ eval.tipo_nota }}</label>
              <input type="text" v-model="eval.nota" :key="index">
            </div>

          </div>

         
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal" @click="RegistrarEvaluacion" ><i class="material-icons left">save</i>Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO PADRE-->


     <!--INICIO MODAL EVALUAR ACA-->
      <div id="mdlevaluareaca" class="modal">
        <div class="modal-content">    
          <div>
            <h5 class="indigo-text">{{ nombre }}</h5>
            <label>Evaluar nota ACA</label>
             <br>
             <br>
          </div>
          <div>
              <label>Nota ACA</label>
              <input type="text" v-model="fillaca.nota_aca">
          </div>

         
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal" @click="RegistrarNotaACA"  v-if="fillaca.nota_aca!=''"><i class="material-icons left">save</i>Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL EVALUAR ACA-->

         <!--INICIO MODAL EVALUAR EXAMEN FINAL-->
      <div id="mdlevaluaref" class="modal">
        <div class="modal-content">    
          <div>
            <h5 class="indigo-text">{{ nombre }}</h5>
            <label>Evaluar Examen Final</label>
             <br>
             <br>
          </div>
          <div>
              <label>Nota EXM. FINAL</label>
              <input type="text" v-model="fillef.nota">
          </div>

         
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal" @click="RegistrarExamenFinal"  v-if="fillef.nota!=''"><i class="material-icons left">save</i>Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL EVALUAR EXAMEN FINAL-->
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
      iddocentearea:String
     },
    data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              matriculados:[],
              evaluacion:'',
              nombre:'',
              fillaca:{'id':'','nota_aca':''},
              fillef:{'id':'','nota':''},
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            RegistrarExamenFinal(){
              var url='/registrarexamenfinal';
                    axios.post(url,this.fillef
                ).then(response=>{ 

                  this.GetMatriculados();
                  M.toast({html:'Examen Final registrado','classes':'green'});

                }).catch(error=>{
                  M.toast({html:'Ocurrio un Error','classes':'red'});

                  console.log(error.response);
                }); 
            },
            RegistrarNotaACA(){
              var url='/registrarnotaaca';
                    axios.post(url,this.fillaca
                ).then(response=>{ 

                  this.GetMatriculados();
                  M.toast({html:'Nota ACA registrado','classes':'green'});

                }).catch(error=>{
                  M.toast({html:'Ocurrio un Error','classes':'red'});

                  console.log(error.response);
                }); 
            },
            ViewEF(ef,nombre,ap1,ap2){
              this.fillef.id=ef.id;
              this.fillef.nota=ef.examen_final;
              var name=nombre+' , '+ap1+' '+ap2; 
              this.nombre=name;
            },
            ViewAca(aca,nombre,ap1,ap2){
              this.fillaca.id=aca.id;
              this.fillaca.nota_aca=aca.nota_aca;
              var name=nombre+' , '+ap1+' '+ap2; 
              this.nombre=name;
            },
            Buscar(){
              var val=document.getElementById('inputsearchproducto').value;

              if(val==' ' || val=='  '){
                M.toast({html:'Ingrese un valor valido','classes':'orange'});
              }else{
                 var url='/searchmatriculadosdocente';
                    axios.post(url,{
                      'valor':val,
                      'idarea':this.idarea,
                      'iddocentearea':this.iddocentearea
                    }
                ).then(response=>{ 

                  this.matriculados=response.data;
                //  M.toast({html:'Matriculados obtenidos','classes':'green'});

                }).catch(error=>{
                  M.toast({html:'Ocurrio un Error','classes':'red'});

                  console.log(error.response);
                }); 
              }
            },
            RegistrarEvaluacion(){
              var url='/registrarevaluacionespecialista';
                    axios.post(url,{

                      'evaluacion':this.evaluacion
                    }
                ).then(response=>{ 

                  this.GetMatriculados();
                  M.toast({html:'Evaluacion registrado','classes':'green'});

                }).catch(error=>{
                  M.toast({html:'Ocurrio un Error','classes':'red'});

                  console.log(error.response);
                }); 
            },
            ViewEvaluar(idcontenido_c,idmatricula,nombre,ap1,ap2){
              var name=nombre+' , '+ap1+' '+ap2; 
              this.nombre=name;
              this.evaluacion=[];
              var url='/getcontenidoevaluacion';
                    axios.post(url,{
                      'idcc':idcontenido_c,
                      'idmatricula':idmatricula
                    }
                ).then(response=>{ 

                  this.evaluacion=response.data;
                  M.toast({html:'Evaluacion obtenido','classes':'green'});

                }).catch(error=>{
                  M.toast({html:'Ocurrio un Error','classes':'red'});

                  console.log(error.response);
                }); 
            },
            GetMatriculados(){
               var url='/getespecialistasmatriculados';
                    axios.post(url,{
                      'idarea':this.idarea,
                      'iddocentearea':this.iddocentearea
                    }
                ).then(response=>{ 

                  this.matriculados=response.data;
                  M.toast({html:'Matriculados obtenidos','classes':'green'});

                }).catch(error=>{
                  M.toast({html:'Ocurrio un Error','classes':'red'});

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
              var elems = document.querySelectorAll('.chips');
              var instances = M.Chips.init(elems, options);
            });


            this.GetMatriculados();
            
          },computed: {
       
          }
        }
      </script>