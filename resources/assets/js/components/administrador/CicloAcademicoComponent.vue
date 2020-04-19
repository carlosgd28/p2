<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008366" :width="100"  :height="100" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12 l12 m12">
              <div>
                <div class="col s12">
                  <router-link to="/promociones" class="breadcrumb">Promociones</router-link>
                  <a  class="breadcrumb">Ciclos Academicos</a>
                </div>
              </div>
        </div>

        <div class="col s12 l3 m3">
          <div class="card">
            <div class="card-content">
              
              <div>
                <center>
               
                <h4>{{ promo }}</h4>
               <label>Promoción</label>
                </center>
              </div>
            </div>
         </div>
        </div>

        <div class="col s12 l9 m9">
          <div class="row">
            <div class="col s12 l6 m6" >
                <div class="input-field col s12 l6 m6">
                  <i class="material-icons prefix">search</i>
                  <input type="text">
                  <label for="icon_prefix2">Fecha</label>
                </div>
            </div>

            <div class="col s12 m6 l6" style="text-align:right;">
              <button class="waves-effect waves-light btn btn-small  teal lighten-1 modal-trigger"  data-target="dmlnuevociclo"><i class="material-icons left" >assistant_photo</i> Aperturar</button>

               <button class="waves-effect waves-light btn btn-small  blue-grey lighten-1" @click="Obtener(page)"><i class="material-icons left" >sync</i> Recargar</button>
            </div>

             <div class="col s12 l12 m12">
        
        <table class="striped responsive-table" >
          <thead>
            <th>Promocion</th>
            <th>Año</th>
            <th>Modulo</th>
            <th>Especialidad</th>
            <th>Tipo</th>
            <th>División</th>
            <th>Grado</th>
            <th>Duración</th>
            <th>Estado</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(ciclo,index) in ciclos">
              <td>
                {{ ciclo.promocion.nombre }}  
              </td>

              <td>
                {{ ciclo.anio_academico.nombre }}
              </td>
              <td>
                {{ index+1 }}
              </td>
              <td>
                {{ ciclo.especialidad.nombre }}
              </td>

              <td >
                {{ ciclo.tipo_estudiante.nombre }}
              </td>
              <td>
                {{ ciclo.division.nombre }}
              </td>
              <td>
               {{ ciclo.tipo_estudiante.siglas+''+ciclo.anio_academico.siglas }}
              </td>
              <td>
                {{ ciclo.periodo.nombre }}
              </td>
           

              <td>
                <strong v-if="ciclo.estado=='A'" class="green-text"> Activo</strong>
                <strong v-if="ciclo.estado=='I'" class="red-text"> Cerrado </strong>
              </td>

              <td>
                <router-link  :to="'/matricular/'+idpromocion+'/'+ciclo.id"  class="waves-effect waves btn  indigo lighten-1 btn-small"><i class="material-icons">assignment_ind</i> Matricula</router-link>

                <router-link v-if="ciclo.cursos==0" class="waves-effect waves btn  indigo lighten-1 btn-small" disabled><i class="material-icons">assignment_ind</i> Matricula</router-link>

                <router-link :to="'/asignarcurso/'+idpromocion+'/'+ciclo.id"  class="waves-effect waves-green btn-small btn light-blue lighten-1 pulse"><i class="material-icons">settings</i> Asignaturas</router-link>

              </td>
            </tr>
              <label v-if="ciclos.length==0">Ningun registro.</label>
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
        </div>

        
     



    </div>


     <!--INICIO MODAL NUEVO CICLO ACADEMICO-->
      <div id="dmlnuevociclo" class="modal">
        <div class="modal-content">
          <h5>Aperturar Ciclo Academico</h5>

          <div class="row">
            <div class="col s12 l4 m4">
              <div class="input-field">
                  <select class="browser-default" v-model="fillapertura.idanio">
                    <option v-for="anio in anios" :value="anio.id">{{ anio.nombre }}</option>
                  </select>
                <span class="helper-text" data-error="wrong" data-success="right">Año/Periodo</span>
              </div>
            </div>

             <div class="col s12 l8 m8">
              <div class="input-field">
                  <select class="browser-default" v-model="fillapertura.idespecialidad">
                    <option v-for="especialidad in especialidades" :value="especialidad.id">{{ especialidad.nombre }}</option>
                  </select>
                <span class="helper-text" data-error="wrong" data-success="right">Especialidad</span>
              </div>
            </div>

            <div class="col s12 l4 m4">
                <div class="input-field">
                  <select class="browser-default" v-model="fillapertura.idtipoestudiante">
                    <option v-for="tipo in tipoestudiantes" :value="tipo.id">{{ tipo.nombre }}</option>
                  </select>
                <span class="helper-text" data-error="wrong" data-success="right">Tipo Estudiante</span>
              </div>
            </div>

            <div class="col s12 l4 m4">
                <div class="input-field">
                  <select class="browser-default" v-model="fillapertura.iddivision">
                    <option v-for="division in divisiones" :value="division.id">{{ division.nombre }}</option>
                  </select>
                <span class="helper-text" data-error="wrong" data-success="right">Division</span>
              </div>
            </div>

              <div class="col s12 l4 m4">
                <div class="input-field">
                  <select class="browser-default" v-model="fillapertura.idduracion">
                    <option v-for="tiempo in duracion" :value="tiempo.id">{{ tiempo.nombre }}</option>
                  </select>
                <span class="helper-text" data-error="wrong" data-success="right">Duración</span>
              </div>
            </div>

          </div>

        </div>



        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal lighten-1" v-if="fillapertura.idanio!='' && fillapertura.idtipoestudiante!='' && fillapertura.idduracion!=''" @click="Aperturar"><i class="material-icons left">save</i>Aperturar</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO CICLO ACADEMICO-->
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
            idpromocion:String
     },
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,

              anios:[],
              promociones:[],
              duracion:[],
              tipoestudiantes:[],
              divisiones:[],
              especialidades:[],
              promo:'',

              fillapertura:{'idanio':'','idtipoestudiante':'','idduracion':'','idusuario':'','idpromocion':'','iddivision':'','idespecialidad':''},
              ciclos:[],
              pagination:{'total':0,'current_page':0,'per_page':0,'last_page':0,'from':0,'to':0},
              offset:3,
              page:1
           
           
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
              this.Obtener(page);
            },
            moment: function() { 
              return moment(); 
            },
            Obtener(page){
              var url='/getciclosacademicos/?page='+page+'&idpromocion='+this.idpromocion;
              axios.get(url,{
                  onUploadProgress: progressEvent => this.isLoading=true
                  } 
                ).then(response=>{ 
                  this.ciclos=response.data.ciclos.data;
                  this.pagination=response.data.pagination; 
                  
                  this.isLoading=false;
                  if(this.ciclos.length==0){
                     M.toast({html: 'Ningun registro','classes':'orange'});
                  }else{
                    this.promo=this.ciclos[0]['promocion']['nombre'];
                    M.toast({html: 'Ciclos obtenidos','classes':'blue'});
                  }

                  
                }).catch(error=>{
                 
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            Aperturar(){
              this.fillapertura.idpromocion=this.idpromocion;
              this.fillapertura.idusuario=this.usuario.id;
               var url='/aperturarcicloacademico';
                    axios.post(url,this.fillapertura
                ).then(response=>{ 
                  this.Obtener(this.page);
                  M.toast({html: 'Aperturado','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            GetReferencial(){
               var url='/getreferencialforcicloacademico';
                    axios.post(url,
                ).then(response=>{ 
                  var valores=response.data;
                  this.anios=valores[0];
                  this.tipoestudiantes=valores[1];
                  this.duracion=valores[2];
                  this.divisiones=valores[3];
                  this.especialidades=valores[4];
                
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            }
          
          },  
          mounted() {
            M.AutoInit();
            
            this.Obtener(this.page);
            this.GetReferencial();

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          }
        }
      </script>