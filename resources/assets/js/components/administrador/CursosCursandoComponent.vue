<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row container">
        <div class="col s12">
          <router-link to="/promociones" class="breadcrumb">Promociones</router-link>
          <router-link :to="'/matricular/'+idciclo" class="breadcrumb">Matriculados</router-link>
          <router-link :to="'/modulomatricula/'+idciclo+'/'+idmatricula" class="breadcrumb">Modulos</router-link>
          <a  class="breadcrumb">Areas de Conocimiento</a>
        </div>
    
      <div class="col s12 l9 m9">
      
        <table class="striped responsive-table" style="font-size:12px;">
          <thead>
            <th>Area de Conocimiento</th>
            <th>Nota <br><label>ACA</label></th>
            
          </thead>

          <tbody>
            <tr v-for="materia in materias">
              <td v-text="materia.nombre"></td>
              <td v-text="materia.nota_aca"></td>

              
            </tr>
          </tbody>
        </table>
       
      </div>
    </div>

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
        
        idciclo:String,
        idmatricula:String,
        idmodulo:String
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
              datosestudiante:[],


              materias:[],
              fillevaluacion:{'id':'','nombre':'','nota_aca':''},

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
                this.GetCursosCargo(page);
              },
              GetMateria(){
                    var url='/getmateriacursando';
                    axios.post(url,

                      { 'idmodulo':this.idmodulo }

                    ).then(response=>{ 
                      
                      this.materias=response.data;
                      M.toast({html: 'Materias Obtenido','classes':'teal lighten-1'});

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
            this.GetMateria();
            
              

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          } 
        }
      </script>