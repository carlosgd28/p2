<template>
  <div class="row" >
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12 l6 m6">
            <a href="" class="breadcrumb">Año Academico</a>
            <a href="" class="breadcrumb">Asignación de docentes</a>
        </div>
        <div class="col s12 l6 m6" style="text-align:right;">
          <div class="row">
            <button class="waves-effect waves-light btn blue-grey lighten-1" @click="GetArea" ><i class="material-icons left" >sync</i> Recargar</button>
          </div>
        </div>  
    
        <div class="col s12 l3 m3">
         <div class="card">
              <div class="card-content">
                <table class="striped">
                  <tr>
                    <td><strong>Promocion</strong></td>
                    <td>{{ anio.nro_promocion }}</td>
                  </tr>

                  <tr>
                    <td><strong>Division</strong></td>
                    <td>{{ anio.division }}</td>
                  </tr>

                  <tr>
                    <td><strong>Grado</strong></td>
                    <td><span>{{ anio.grado }}</span></td>
                  </tr>

                  <tr>
                    <td><strong>Estado</strong></td>
                    <td>
                      <strong v-if="anio.estado_ac=='A'"  class="green-text">Activo</strong>
                      <strong v-if="anio.estado_ac=='I'" class="orange-text">Inactivo</strong>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
        </div>

      <div class="col s12 l9 m9">
        <div class="input-field">
          
          <strong>Modulo:</strong>
          <select class="browser-default" v-model="idmodulo" @change="GetArea">
            <option selected disabled>Seleccionar</option>
            <option v-for="modulo in modulos" :value="modulo.id">{{ modulo.nombre }}</option>
          </select>
        </div>

        <div>
         
          <div class="card" v-for="area in areas">
            <div class="row" >
              <div class="card-content" >
                <div class="row">
                  <div class="col s12 l8 m8">
                     <strong>{{ area.area.nombre }}</strong>
                     <br>
                     <ul><strong>Docentes</strong>
                      <li v-for="docente in area.docente" style="margin:4px;">
                        <em>{{ docente.nombres +' , '+docente.apellido1+' '+docente.apellido2}}</em>
                        <span class="new badge orange" data-badge-caption="" @click="DescartarDocente(docente.idda)">Descartar</span>
                      </li>
                     </ul>
                     
                     <br>
                     <br>
                     <strong>Horario</strong>
                     <div>
                       <table>
                        <thead>
                          <th>Día</th>
                          <th>Inicio</th>
                          <th>Termino</th>
                          <th>Accion</th>
                        </thead>
                        <tbody>
                          <tr v-for="horario in area.horario">
                            <td>{{ horario.dia }}</td>
                            <td>{{ horario.inicio }}</td>
                            <td>{{ horario.termino }}</td>
                            <td>
                              <span class="new badge orange" data-badge-caption="" @click="DescartarHorario(horario.id)">Descartar</span>
                             
                            </td>
                            
                          </tr>
                        </tbody>
                      </table>
                        <label  v-if="area.horario.length==0">Ningun horario</label>
                     </div>
                  </div>
                  <div class="col s12 l4 m4">
                    <button class="waves-effect waves-light btn indigo btn-small  modal-trigger"  data-target="mdlasignardocente" @click="GetDocente(area.area.id)">Asignar Docente</button>
                    <button class="waves-effect waves-light btn teal lighten-1 btn-small  modal-trigger"  data-target="mdlasignarhorario" @click="SelectCurso(area.area.id)">Horario</button>

                  </div>

                </div>
              </div>
              
            </div>
              
            </div>
        </div>
          
      </div>
    </div>


     <!--INICIO MODAL NUEVO ASIGNAR DOCENTE-->
      <div id="mdlasignardocente" class="modal">
        <div class="modal-content">
          <h5 class="card-title">Asignar Docente</h5>
           <div>
            <table>
              <thead>
                <th>Nombres y Apellidos</th>
                <th>Accion</th>
              </thead>
              <tbody>
                <tr v-for="docente in docentes">
                  <td>{{ docente.nombre+' , '+docente.apellidop+' '+docente.apellidom}}</td>
                  <td>
                    <button class="waves-effect waves-green btn  teal lighten-1" @click="AsignarDocente(docente.idcp)"  v-if="docente.e==0"><i class="material-icons left">check</i> Asignar</button>

                    <button class="btn" disabled v-if="docente.e==1">Asignado</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>

        </div>
      </div>
    <!--FIN MODAL ASIGNAR DOCENTE-->

      <!--INICIO MODAL NUEVO ASIGNAR DOCENTE-->
      <div id="mdlasignarhorario" class="modal">
        <div class="modal-content">
          <h5 class="card-title">Asignar Horario</h5>
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
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal lighten-1"  @click="RegistrarHorario"><i class="material-icons left">save</i>Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>

        </div>
      </div>
    <!--FIN MODAL ASIGNAR DOCENTE-->


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
      idpromocion:String
     },
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,
              fillhorario:{'idarea':'','dia':'','inicio':'','termino':'','idusuario':'','idanio':''},
              horarios:[],
              modulos:[],
              anio:{'id':'','nro_promocion':'','division':'','grado':'','estado_ac':''},
              idmodulo:'',
              areas:[],
              docentes:[],
              idarea:'',
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            DescartarHorario(id){
              var url='/descartarhorarioanio';
                    axios.post(url,{
                      'idhorario':id,
                     
                    }
                ).then(response=>{ 
                  
                  this.GetArea();

                  M.toast({html: 'Horario Descartado','classes':'teal lighten-1'});
                }).catch(error=>{
                   M.toast({html: 'Ocurrio un error','classes':'red'});
                  console.log(error.response);
                });
            },
            DescartarDocente(id){
              var url='/descartardocenteanio';
                    axios.post(url,{
                      'idda':id,
                     
                    }
                ).then(response=>{ 
                  
                  this.GetArea();

                  M.toast({html: 'Docentes Descartado','classes':'teal lighten-1'});
                }).catch(error=>{
                   M.toast({html: 'Ocurrio un error','classes':'red'});
                  console.log(error.response);
                });
            },
            SelectCurso(idarea){
              this.fillhorario.idarea=idarea;
              this.fillhorario.idanio=this.idpromocion;
            },
            RegistrarHorario(){
              this.fillhorario.idusuario=this.usuario.id;

              var url='/registrarhorario';
                  axios.post(url,this.fillhorario
                ).then(response=>{ 
                 
                  this.fillhorario.dia='';
                  this.fillhorario.inicio='';
                  this.fillhorario.termino='';
                  this.fillhorario.idarea='';
                  this.fillhorario.idanio='';
                  this.GetArea();
                  M.toast({html: 'Horario Registrado','classes':'green'});
                }).catch(error=>{
                    console.log(error.response);
                    M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            AsignarDocente(idcp){
               var url='/asignardocentearea';
                    axios.post(url,{
                      'idarea':this.idarea,
                      'idanio':this.idpromocion,
                      'idcp':idcp
                    }
                ).then(response=>{ 
                  
                  this.GetDocente(this.idarea);
                  this.GetArea();
                  M.toast({html: 'Docentes asignado','classes':'teal lighten-1'});
                }).catch(error=>{
                   M.toast({html: 'Ocurrio un error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            GetDocente(idarea){
              this.docentes=[];
              this.idarea=idarea;
              var url='/getdocentebyarea';
                    axios.post(url,{
                      'idarea':idarea,
                      'idanio':this.idpromocion
                    }
                ).then(response=>{ 
                  console.log(response);
                  this.docentes=response.data;

                  M.toast({html: 'Docentes obtenido','classes':'teal lighten-1'});
                }).catch(error=>{
                   M.toast({html: 'Ocurrio un error','classes':'red'});
                  console.log(error.response);
                }); 
            },
            GetArea(){
              var url='/getareasconocimientobymodulo';
                    axios.post(url,{
                      'idmodulo':this.idmodulo,
                      'idanio':this.idpromocion
                    }
                ).then(response=>{ 
                  this.areas=response.data;

                  M.toast({html: 'Area Conocimiento obtenido','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            GetAnioAcademico(){
              var url='/getaniacademico';
                    axios.post(url,{
                      'idanio':this.idpromocion
                    }
                ).then(response=>{ 
                  var data_anio=response.data[0];
                  this.anio.id=data_anio.id;
                  this.anio.nro_promocion=data_anio.nro_promocion;
                  this.anio.division=data_anio.division;
                  this.anio.grado=data_anio.grado;
                  this.anio.estado_ac=data_anio.estado_ac;

                  M.toast({html: 'Año Academico Obtenido','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            GetModulos(){
               var url='/getmodulos';
                    axios.post(url,{}
                ).then(response=>{ 
                  this.modulos=response.data;
                  M.toast({html: 'Modulos obtenidos','classes':'teal lighten-1'});
                }).catch(error=>{
                  console.log(error.response);
                }); 
            },
            NuevoHijo(){
               var url='/nuevoreferenciahijo';
                    axios.post(url,this.fillhijo
                ).then(response=>{ 
                  M.toast({html: 'Referencia Hijo Registrado!','classes':'green'});
                  
                  
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

            this.GetAnioAcademico();
            this.GetModulos();
            
          },computed: {
       
          }
        }
      </script>