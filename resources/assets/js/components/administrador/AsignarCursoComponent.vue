<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
          <div>
            <div class="col s12">
              
              <router-link to="/promociones" class="breadcrumb">Promociones</router-link>
              <router-link :to="'/cicloacademico/'+idpromocion" class="breadcrumb">Ciclos Academicos</router-link>
              <a  class="breadcrumb">Configurar Asignaturas</a>
            </div>
          </div>
        </div>
        <div class="col s6 l12 m12" style="text-align:right;">
         
          <button class="waves-effect waves-light btn  teal lighten-1 btn-small  modal-trigger"  data-target="mdlnuevohijo"><i class="material-icons left" >book</i> Definir Asignatura</button>

       

           <button class="waves-effect waves-light btn btn-small  blue-grey lighten-1" @click="GetCursos"><i class="material-icons left" >sync</i> Recargar</button>
        </div>  

      <div class="col s12 l3 m3">
          <div class="card">
            <div class="card-content">
              <div class="row">
                <center>
                <div class="preloader-wrapper small active" v-if="datosciclo.length==0">
                  <div class="spinner-layer spinner-green-only">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>
                </div>
                </center>

                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <strong>Promoción</strong>
                </div>
                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <label >{{ datosciclo[0]['promocion']['nombre'] }}</label>
                </div>


                <div class="col s12 l6 m6"  v-if="datosciclo.length>0">
                  <strong>Especialidad</strong>
                </div>
                <div class="col s12 l6 m6"  v-if="datosciclo.length>0">
                  <label>{{ datosciclo[0]['especialidad']['nombre'] }}</label>
                </div>

                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <strong>Tipo Estudiante</strong>
                </div>
                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <label>{{ datosciclo[0]['tipo_estudiante']['nombre'] }}</label>
                </div>

                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <strong>División</strong>
                </div>
                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <label>{{ datosciclo[0]['division']['nombre'] }}</label>
                </div>

                 <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <strong>Grado</strong>
                </div>
                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <label>{{ datosciclo[0]['tipo_estudiante']['siglas']+datosciclo[0]['anio_academico']['siglas'] }}</label>
                </div>

                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <strong>Duración</strong>
                </div>
                <div class="col s12 l6 m6" v-if="datosciclo.length>0">
                  <label>{{ datosciclo[0]['periodo']['nombre'] }}</label>
                </div>


              </div>


            </div>
         </div>
      </div>

      <div class="col s12 l9 m9">
        <table style="font-size:12px;">
          <thead>
            <th>Asignatura</th>
            <th>Docente responsable</th>
            <th>Opc</th>
          </thead>

          <tbody>
            <tr v-for="asignado in asignados">
              <td v-text="asignado.materia"></td>
              <td v-text="asignado.docente"></td>
              <td>
                <button class="waves-effect waves-green btn light-blue darken-4  btn-small modal-trigger"  data-target="mdlhorario" @click="Limpiar(asignado.id,asignado.horario)" ><i class="material-icons left">event</i>Horario</button>


                <button class="waves-effect waves-green btn btn-small blue modal-trigger" data-target="mdlnewevaluacion"  @click="GetEvaluaciones(asignado.id)"><i class="material-icons left">control_point_duplicate</i> Evaluacion</button>

               

                <a :href="'/actanotaspdf/'+asignado.id+'/'+idciclo" target="blank"  class="waves-effect waves-green btn btn-small green"><i class="material-icons">assignment_turned_in</i> Notas</a>
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="pagination">
              <li  v-if="pagination.current_page>1"><a href="#" @click.prevent="changePage(pagination.current_page-1)"><i class="material-icons">chevron_left</i></a></li>
              <li v-for="page in pagesNumber" v-bind:class="[page==isActived ? 'active' : '']">
                <a href="#" @click.prevent="changePage(page)">
                  {{ page }}
                </a> 
              </li>
            
              <li class="waves-effect" v-if="pagination.current_page < pagination.last_page"><a href="#"  @click.prevent="changePage(pagination.current_page+1)"><i class="material-icons">chevron_right</i></a></li>
            </ul>
      </div>
    </div>


     <!--INICIO MODAL NUEVO ASIGNACION-->
      <div id="mdlnuevohijo" class="modal">
        <div class="modal-content">
          <div class="row">

            <div class="col s12 l6 m6">
                <table class="table" style="font-size:12px;">
                  <thead>
                    <th>#</th>
                    <th>Asignatura</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="(curso,index) in cursos">
                      <td>{{ index+1 }}</td>
                      <td>
                      {{ curso.nombre }}
                      <br>
                      <label v-if="curso.docente!='ninguno'">{{ curso.docente }}</label>
                      </td>
                  
                      <td>
                          <button class="waves-effect waves-green btn-floating btn blue" @click="SelectCurso(curso)" v-if="curso.asignado==0"><i class="material-icons left">check</i></button>

                          <button class="waves-effect waves-green btn-floating btn blue" disabled v-if="curso.asignado==1"><i class="material-icons left">attach_file</i></button>
                      </td>
                    </tr>
                  </tbody>
                 
                </table>
            </div>

            <div class="col s12 l6 m6">
              
              <div class="row">
                <h4>ASIGNAR DOCENTE</h4>
                <div class="col s12 m12 l12">
                  <strong>Curso:</strong>
                  <span>{{ fillcurso.curso }}</span>
                </div>

                <div class="col s12 m12 l12">
                 
                  <select class="browser-default" v-model="fillcurso.iddocente">
                    <option selected disabled>Seleccionar Docente</option>
                    <option v-for="docente in docentes" :value="docente.id">{{ docente.nombre}}</option>
                  </select>
                  <label>Docente</label>
                </div>

                <div class="col s12 m12 l12">
                  <center>
                     <button class="waves-effect waves-green btn indigo" v-if="fillcurso.active==true && fillcurso.iddocente!=''" @click="AsignarCursoDocente" ><i class="material-icons left">assignment_turned_in</i>Asignar Curso Docente</button>
                  </center>
                </div>
              </div>
              
              
             
            </div>

          </div>
          
        </div>
      </div>
    <!--FIN MODAL NUEVO ASIGNACION-->

    <!--INICIO MODAL NUEVO HORARIO-->
      <div id="mdlhorario" class="modal">
        <div class="modal-content">
          <h5>Horario</h5>


          <div class="row">
           
            <div class="col s12 l4 m4">
              <div class="input-field">
                <select class="browser-default" v-model="fillhorario.dia">
                  <option value="LUNES">Lunes</option>
                  <option value="MARTES">Martes</option>
                  <option value="MIERCOLES">Miercorles</option>
                  <option value="JUEVES">Jueves</option>
                  <option value="VIERNES">Viernes</option>
                  <option value="SABADO">Sabado</option>
                  <option value="DOMINGO">Domingo</option>
                </select>
                <span class="helper-text" data-error="wrong" data-success="right">Día</span>
              </div>
            </div>

             <div class="col s12 l4 m4">
              <div class="input-field">
                <input type="time" v-model="fillhorario.inicio">
                <span class="helper-text" data-error="wrong" data-success="right">Inicio</span>
              </div>
            </div>

            <div class="col s12 l4 m4">
              <div class="input-field">
                <input type="time" v-model="fillhorario.termino">
                <span class="helper-text" data-error="wrong" data-success="right">Término</span>
              </div>
            </div>

            <div class="col s12 l12 m12">
              <center>
                <button class="waves-effect waves-green btn teal lighten-1 modal-close" @click="RegistrarHorario" v-if="fillhorario.dia!='' && fillhorario.inicio!='' && fillhorario.termino!=''" ><i class="material-icons left">save</i>Registrar Horario </button>
              </center>
            </div>

            <div class="col s12 m12 l12">
              
            <table>
              <thead>
                <th>Día</th>
                <th>Inicio</th>
                <th>Termino</th>
              </thead>
              <tbody>
                <tr v-for="horario in horarios">
                  <td>{{ horario.dia }}</td>
                  <td>{{ horario.inicio }}</td>
                    <td>{{ horario.termino }}</td>
                  
                </tr>
              </tbody>
            </table>
              <label  v-if="horarios.length==0">Ningun horario</label>
            </div>
          </div>

        </div>
      </div>
    <!--FIN MODAL NUEVO HORARIO-->

     <!--INICIO MODAL NUEVO EVALUACION-->
      <div id="mdlnewevaluacion" class="modal">
        <div class="modal-content">
          <div class="row">
            <h4>Aperturar Evaluación</h4>
           
            <div class="col s12 l12 m12">
               <label>Se asignará la evaluacion a todos los estudiantes de la asigantura.</label>
            </div>

              <div class="col s12 l6 m6">
              <div class="input-field">
                <select class="browser-default" v-model="idtipoevaluacion">
                  <option :value="tipo.id" v-for="tipo in tipoevaluacion">{{ tipo.nombre }}</option>
                </select>
                <span class="helper-text" data-error="wrong" data-success="right">Tipo Evaluación</span>
              </div>
            </div>

            <div class="col s12 l6 m6">
              <div class="input-field">
                 <button class="waves-effect waves-green btn teal lighten-1 btn-small" @click="RegistrarEvaluacion" v-if="idtipoevaluacion!=''" ><i class="material-icons left">save</i>Registrar Evaluacion </button>
              </div>
            </div>

             <div class="col s12 l12 m12">
              <h5>Evaluaciones</h5>
              <table class="striped" style="font-size:11px;">
                <thead>
                  <th>Evalución</th>
                  <th>Fecha Aperturado</th>
                  <th>Estado</th>
                  <th></th>
                </thead>
                <tbody>
                  <tr v-for="evaluacion in evaluaciones">
                    <td>{{ evaluacion.tipo_nota.nombre }}</td>
                    <td>{{ evaluacion.fecha_registro }}</td>

                    <td>
                      <strong v-if="evaluacion.estado=='A'" class="green-text">Activo</strong>
                      <strong v-if="evaluacion.estado=='I'" class="orange-text">Inactivo</strong>
                    </td>
                    <td>
                      
                    </td>

                  </tr>
                </tbody>
              </table>
              <label v-if="evaluaciones.length==0">Ninguna Evaluación</label>
             </div>
         
          </div>
          
        </div>
      </div>
    <!--FIN MODAL NUEVO EVALUACION-->


  </div>


</template>
<style type="text/css">
   .pagination li.active {
    background-color: rgb(0,128,128); 
  }

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
      components: {
          
        },
     props:{
        idpromocion:String,
        idciclo:String
     },
    data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,
              cursos:[],
              asignados:[],
              docentes:[],
              fillcurso:{'id':'','curso':'','iddocente':'','active':false,'idusuario':'','idca':''},

              fillhorario:{'idcurso':'','dia':'','inicio':'','termino':'','idusuario':''},

               horarios:[],
               datosciclo:[],

              pagination:{'total':0,'current_page':0,'per_page':0,'last_page':0,'from':0,'to':0},
              offset:3,
              page:1,
              idhorario:'',
              tipoevaluacion:[],
              idtipoevaluacion:'',
              evaluaciones:[],
              idmateria:'',

              }

             
            },
            components: {
             Loading
            },
             computed: {
            
              isActived:function(){
                return this.pagination.current_page;
              },
              pagesNumber:function(){
                if(!this.pagination.to){
                  return [];
                }

                var from=this.pagination.current_page-this.offset;

                if(from<1) from=1;

                var to=from+(this.offset*2);

                if(to>=this.pagination.last_page) to=this.pagination.last_page;

                var pagesArray=[];

                while(from <= to){  
                  pagesArray.push(from);
                  from++;
                }

                return pagesArray;
              } 
            },
            methods:{
            changePage:function(page){
                this.pagination.current_page=page;
                this.GetCursos(page);
            },
            RegistrarEvaluacion(){
                  var url='/registrarevaluacion';
                    axios.post(url,
                      {
                        'idmateria_ciclo':this.idmateria,
                        'idciclo':this.idciclo,
                        'id_tipo_nota':this.idtipoevaluacion,
                        'idusuario':this.usuario.id
                      }
                    ).then(response=>{ 
                        M.toast({html: 'Evaluación Registrado','classes':'green'});
                        M.toast({html: 'Evaluación Asignado','classes':'blue'});
                    }).catch(error=>{
                      console.log(error.response);
                        M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
            },
            GetEvaluaciones(idmateria_ciclo){
              this.idmateria=idmateria_ciclo;
               var url='/getevaluacion';
                    axios.post(url,
                      {
                        'idmateria_ciclo':idmateria_ciclo
                      }
                    ).then(response=>{ 
                        this.evaluaciones=response.data;
                        console.log(this.evaluaciones);
                    }).catch(error=>{
                      console.log(error.response);
                        M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
            },
             GetTipoEvaluacion(){
               var url='/gettypeevaluacion';
                    axios.post(url,
                      {
                        'idciclo':this.idciclo
                      }
                    ).then(response=>{ 
                        this.tipoevaluacion=response.data;
                        console.log(this.tipoevaluacion);
                    }).catch(error=>{
                        M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
            },
            GetDatosCiclo(){
                var url='/getdatoscicloacademico';
                    axios.post(url,
                      {
                        'idciclo':this.idciclo
                      }
                    ).then(response=>{ 
                        this.datosciclo=response.data;
                    }).catch(error=>{
                        M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
            },
            Limpiar(id,horario){
              this.fillhorario.idcurso=id;
              this.fillhorario.dia='';
              this.fillhorario.inicio='';
              this.fillhorario.termino='';
              this.horarios=horario;
            },
            RegistrarHorario(){
              this.fillhorario.idusuario=this.usuario.id;

              var url='/registrarhorario';
                  axios.post(url,this.fillhorario
                ).then(response=>{ 
                 
                  this.fillhorario.dia='';
                  this.fillhorario.inicio='';
                  this.fillhorario.termino='';
                  this.fillhorario.idcurso='';
                  this.GetCursoDocente();
                  this.GetCursos(this.page);
                
                  M.toast({html: 'Horario Registrado','classes':'green'});
                }).catch(error=>{
                    M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            GetCursos(page){
              var url='/getcursosasignados?page='+page+'&idciclo='+this.idciclo;
                    axios.get(url,
                ).then(response=>{ 
                  
          
                  this.asignados=response.data.cursos;

                  this.pagination=response.data.pagination;
                  M.toast({html: 'Curso obtenidos','classes':'blue'});
                  
                  
                }).catch(error=>{
                     M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            AsignarCursoDocente(){
              this.fillcurso.idusuario=this.usuario.id;
              this.fillcurso.idca=this.idciclo;
              var url='/asignardocentecurso';
                    axios.post(url,this.fillcurso
                ).then(response=>{ 
                  this.GetCursoDocente();
                  this.GetCursos();
                  M.toast({html: 'Curso Asignado','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            SelectCurso(curso){
              this.fillcurso.id=curso.id;
              this.fillcurso.curso=curso.nombre;
              this.fillcurso.active=true;
            },
            GetCursoDocente(){
               var url='/getreferencialcursodocente';
                    axios.post(url,{
                      'idciclo':this.idciclo
                    }
                ).then(response=>{ 
                  var valores=response.data;
                  this.cursos=valores[0];
                  this.docentes=valores[1];
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },

            moment: function() { 
              return moment(); 
            }
          
          },  
          mounted() {
        
            M.AutoInit();
            this.GetCursoDocente();
            this.GetCursos(this.page);
            this.GetDatosCiclo();
            this.GetTipoEvaluacion();
              

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          }
        }
      </script>