<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12">
          <router-link to="/promociones" class="breadcrumb">Promociones</router-link>
          <router-link :to="'/cicloacademico/'+idpromocion" class="breadcrumb">Ciclos Academicos</router-link>
          <router-link :to="'/matricular/'+idpromocion+'/'+idciclo" class="breadcrumb">Matriculados</router-link>
          <router-link :to="'/asignaturacargo/'+idpromocion+'/'+idciclo+'/'+idmatricula" class="breadcrumb">Asignaturas</router-link>
          <a  class="breadcrumb">Evaluar</a>
        </div>

      <div class="col s12 container">
       
        <div class="row">
          <div class="col s12 l3 m3">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Datos de Estudiante</span>
           
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

                    

                    <div class="col s12 l12 m12" v-if="datosciclo.length>0">
                      <strong>Estudiante</strong>
                    </div>
                    <div class="col s12 l12 m12" v-if="datosestudiante.length>0">
                      <label >{{ datosestudiante[0]['nombres']+','+datosestudiante[0]['appaterno']+' '+datosestudiante[0]['apmaterno'] }}</label>
                    </div>

                    <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <strong>Cedula</strong>
                    </div>
                    <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <label>{{ datosestudiante[0]['cedula'] }}</label>
                    </div>

                     <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <strong>Cod Matricula</strong>
                    </div>
                    <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <label>{{ datosestudiante[0]['codigomatricula'] }}</label>
                    </div>


                    <div class="col s12 l12 m12">
                      <hr>
                    </div>

                     <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <strong>Asignatura</strong>
                    </div>
                    <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <label>{{ datosasignatura[0].nombremateria}}</label>
                    </div>

                     <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <strong>Docente</strong>
                    </div>
                    <div class="col s12 l6 m6" v-if="datosestudiante.length>0">
                      <label>{{ datosasignatura[0].nombredocente }}</label>
                    </div>
                 

                    <div class="col s12 l12 m12">
                      <hr>
                    </div>

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
            <div class="card">
              <div class="card-content">
                <span class="card-title">Notas</span>
                <div class="row">
                  <div class="col s12 l8 m8">
                   
                    <table class="table" style="font-size:11px;">
                      <thead>
                        <th>Tipo Evalucion</th>
                        <th>Nota</th>
                        <th>Accion</th>
                      </thead>
                      <tbody>
                        <tr v-for="(nota,index) in notas">
                          <td>{{ nota.tipo_nota.nombre }}</td>
                          <td>
                            <input type="number" min="0" v-model="fillnota[index]" :key="index" >
                          </td>


                          <td>
                             <button class="waves-effect waves-light btn btn-small teal lighten-1" @click="RegistrarNota(nota.id,fillnota[index])" ><i class="material-icons left" >save</i> Registrar</button>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="col s12 l4 m4">
                
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>



     <!--INICIO MODAL NUEVO MATRICULA-->
      <div id="mdlevaluaciones" class="modal">
       
        <div class="modal-content">
          <p><strong>REGISTRO MATRICULA</strong></p>
          
        </div>

        <div class="modal-footer">
   
        </div>
      </div>
    <!--FIN MODAL NUEVO MATRICULA-->
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
      components: {
          
        },

     props:{
        idpromocion:String,
        idciclo:String,
        idmatricula:String,
        idasignatura:String
     },
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,
              fillnota:{'t1':'','t2':'','t3':'','t4':'','t5':'','t6':'','t7':'','t8':'','t9':'','t10':'','t11':'','t12':'','t13':'','t14':'','t15':'','p1':'','p2':'','p3':'','p4':'','p5':'','p6':'','p7':'','p8':'','p9':'','p10':'','p11':'','p12':'','p13':'','p14':'','p15':'','examenfinal':'','supletorio':''},
               notas:[],
               datosciclo:[],
               datosasignatura:[{'nombremateria':'','nombredocente':''}],
               datosestudiante:[],
               fillnota:[],
              }
            },
            components: {
             Loading
            },
            methods:{
              RegistrarNota(idnota,value){
                 var url='/registrarnota';
                    axios.post(url,
                      {
                        'idnota':idnota,
                        'nota':value,
                      }
                    ).then(response=>{ 
                       
                        this.GetNotas();
                        this.notas=response.data;
                        M.toast({html: 'Evaluaciones Registrado','classes':'green'});
                        
                    }).catch(error=>{
                       M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
              },
              GetNotas(){
                  var url='/getnotas';
                    axios.post(url,

                      { 
                        'idcurso':this.idasignatura,
                        'idmatricula':this.idmatricula,

                       }

                    ).then(response=>{ 
                      
                        this.notas=response.data;

                        for(var i=0;i<this.notas.length;i++){
                          this.fillnota[i]=this.notas[i]['nota'];
                        }
                       
                    }).catch(error=>{
                         M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
              },
              GetDatosAsignatura(){
                var url='/getdatosasignatura';
                    axios.post(url,

                      { 'idasignatura':this.idasignatura }

                    ).then(response=>{ 
                      
                        this.datosasignatura=response.data;
                       
                    }).catch(error=>{
                         M.toast({html: 'Ocurrio un Error','classes':'red'});
                    }); 
              },

                 GetDatosEstudiante(){
                var url='/getdatosestudiantematricula';
                    axios.post(url,

                      { 'idmatricula':this.idmatricula }

                    ).then(response=>{ 
                      
                        this.datosestudiante=response.data;
                       
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
              moment: function() { 
              return moment(); 
            }
          
          },  
          mounted() {
        
            M.AutoInit();
            this.GetNotas();
            this.GetDatosCiclo();
            this.GetDatosEstudiante();
            this.GetDatosAsignatura();
              

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          },computed: {
       
          }
        }
      </script>