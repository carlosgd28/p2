<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

    <div class="row">


      <div class="col s12">
        <div class="col s12 l6 m6">
            <a href="" class="breadcrumb">Años academicos</a>
        </div>
        
        <div class="col s6 l6 m6" style="text-align:right;">
         
          <button class="waves-effect waves-light btn btn-small teal lighten-1  modal-trigger"  data-target="dmlnuevociclo">Aperturar promocion</button>

           <button class="waves-effect waves-light btn btn-small blue-grey lighten-1" @click="Obtener(page)">Recargar</button>
        </div> 

        <div class="col s6 l12 m12">
          <table class="striped responsive-table" >
            <thead>
              <th>Promoción</th>
              <th>Division</th>
              <th>Grado</th>
              <th>Estado</th>
              <th>Seguimento por Modulo Pdf</th>
              <th>Cuadro General Excel</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="(promo,index) in promociones">

                <td >
                  <center>
                    {{ promo.nro_promocion }}
                  </center>
                </td>
                <td>{{ promo.division }}</td>
                <td>{{ promo.grado }}</td>

                
                <td>
                  <strong v-if="promo.estado_ac=='A'" class="green-text"> Activo</strong>
                  <strong v-if="promo.estado_ac=='I'" class="red-text"> Cerrado </strong>
                </td>

                <td>
                
                  <ul >
                    <li v-for="modulo in modulos" style="margin:5px;">
                      <a :href="'/seguimientomodulo/'+promo.id+'/'+modulo.id" target="_blank"  class="waves-effect waves btn btn-small blue-grey">{{'Seg. '+ modulo.nombre }}</a>


                    <a :href="'/actanotasexamfinal/'+promo.id+'/'+modulo.id" target="blank" class="waves-effect waves-light btn blue-grey btn-small">Exm.Final</a>

                    <a :href="'/actanotasacapdf/'+promo.id+'/'+modulo.id" target="blank" class="waves-effect waves-light btn blue-grey btn-small">ACA</a>

                    </li>
                  </ul>
                  
                </td>
                  
                <td>
                  <button v-on:click.prevent="Descargarxls(promo.id)" class="waves-effect waves btn btn-small green">Generar</button>
                </td>

                <td>
                  
              
                  <router-link :to="'/matricular/'+promo.id"  class="waves-effect waves btn btn-small indigo">Matricular</router-link>

                   <router-link :to="'/asignardocente/'+promo.id"  class="waves-effect waves btn btn-small teal lighten">Asignar Docentes</router-link>

                  <!--
                  <button class="modal-close waves-effect waves-green btn btn-small  blue-grey" disabled>Archivar</button>
                  -->
               
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>
        <div class="col s6 l12 m12">
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


     <!--INICIO MODAL NUEVO CICLO ACADEMICO-->
      <div id="dmlnuevociclo" class="modal">
        <div class="modal-content">
          <h5>Nuevo Promoción</h5>

          <div class="row">
            <div class="col s12 l6 m6">
              <div class="input-field">
                  <input type="number" v-model="promocion" min="0">
                <span class="helper-text" data-error="wrong" data-success="right">Promocion</span>
              </div>
            </div>

          </div>

        </div>



        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn teal lighten-1" v-if="promocion!=''" @click="Aperturar">Aperturar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

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
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,

              anios:[],
              promociones:[],
              duracion:[],
              divisiones:[],
              modulos:[],

              promocion:'',
              promociones:[],
              ciclos:[],
               fillapertura:{'idanio':'','idtipoestudiante':'','idduracion':'','idusuario':'','idpromocion':'','iddivision':'','idespecialidad':''},
               

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
              this.page=page;
              this.Obtener(page);
            },
            moment: function() { 
              return moment(); 
            },
            Descargarxls(idpromo){
              axios({
                      url: '/descargarexcel/'+idpromo,
                      method: 'GET',
                      responseType: 'blob', // important
                    }).then((response) => {
                      const url = window.URL.createObjectURL(new Blob([response.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', 'kardex.xlsx');
                      document.body.appendChild(link);
                      link.click();
                    }).catch(error=>{
                      console.log(error);
                      console.log(error.response);
                    M.toast({html: 'Ocurrio un Error','classes':'red'});
                    });
            },
            GetModulos(){
               var url='/getmodulos';
                    axios.post(url,
                ).then(response=>{ 
               
                  this.modulos=response.data;
                  M.toast({html: 'Modulos obtenidos','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            Obtener(page){
              var url='/getpromociones?page='+page;
                    axios.get(url,
                ).then(response=>{ 
                  console.log(response.data);
                  this.promociones=response.data.ciclos.data;
                  this.pagination=response.data.pagination;
                  M.toast({html: 'Promociones obtenidos','classes':'teal lighten-1'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
           Aperturar(){
              
               var url='/nuevopromocion';
                    axios.post(url,{
                      'promo':this.promocion
                    }
                ).then(response=>{ 
                  if(response.data=="existe"){
                    M.toast({html: 'Promocion Existe, No se puede duplicar','classes':'orange'});
                    this.promocion='';

                  }else{
                    this.promocion='';
                    this.Obtener(this.page);
                    M.toast({html: 'Aperturado','classes':'teal lighten-1'});
                  }
                  
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },

          
            ScritpActive(){
             
              document.querySelector("label[for='nombrehMOD']").classList.add('active');
              document.querySelector("label[for='siglahMOD']").classList.add('active');

            },
          
          },  
          mounted() {
            M.AutoInit();

            this.Obtener(this.page);
            this.GetModulos();



            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          }
        }
      </script>
