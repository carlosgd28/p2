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
              <a  class="breadcrumb">Matriculados</a>
            </div>
          </div>
        </div>
        
        <div class="col s12 l12 m12">
          <button class="waves-effect waves-light btn btn-small teal lighten-1   modal-trigger"  data-target="mdlnuevomatricula">Nuevo</button>

           <button class="waves-effect waves-light btn btn-small blue-grey lighten-1" @click="GetMatricula(page)"> Recargar</button>
        </div>  



      <div class="col s12 l12 m12">
    
        <table class="striped responsive-table">
          <thead>
            
            <th>Cedula</th>
            <th>Especialista</th>
            <th>Estado</th>
            <th>Acciones</th>
          </thead>

          <tbody>
            <tr v-for="matricula in matriculas">
            
              <td>
                {{ matricula.cedula }}
              </td>
              <td>
                {{ matricula.nombres+' , '+matricula.appaterno+' '+matricula.apmaterno }}
              </td>
             

              <td>
                <strong v-if="matricula.estadomatricula=='A'" class="green-text">Activo</strong>
                <strong v-if="matricula.estadomatricula=='I'" class="orange-text">Archivado</strong>

               
              </td>
              <td>
                
                <router-link  :to="'/modulomatricula/'+idciclo+'/'+matricula.idmatricula"  class="waves-effect waves-green btn-small btn  light-blue darken-4">Modulos</router-link>
        
                 <button class="waves-effect waves-green btn-small btn teal lighten-1 modal-trigger"  data-target="mdlevaluar" @click="GetEvaluacion(matricula.idmatricula)"> Evaluar</button>
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


     <!--INICIO MODAL NUEVO MATRICULA-->
      <div id="mdlnuevomatricula" class="modal">
       
        <div class="modal-content">
          <p><strong>REGISTRO MATRICULA</strong></p>
          <div class="row">
          
            <div class="input-field col s3">
              <input id="cedula" type="text" class="validate" v-model="fillpersona.cedula" maxlength='10'>
              <label for="cedula">CEDULA <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s1">
              <button class="waves-effect waves-light btn btn-floating btn-small blue" @click="ConsultarPersona" v-if="fillpersona.cedula.length==10"><i class="material-icons left">search</i></button>
            </div>

            <div class="input-field col s12 l8 m8">
              <input id="nombre" type="text" v-model="fillpersona.nombres" class="validate">
              <label for="nombre">Nombres <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s12 l6 m6">
              <input id="apellido1" type="text" v-model="fillpersona.appaterno" class="validate">
              <label for="apellido1">Apellido Pateno <span class="red-text">*</span></label>
            </div>


            <div class="input-field col s12 l6 m6">
              <input id="apellido2" type="text" v-model="fillpersona.apmaterno" class="validate">
              <label for="apellido2">Apellido Materno <span class="red-text">*</span></label>
            </div>
          
            <div class="input-field col s12 l3 m3">
              <input id="fnacimiento" type="date" v-model="fillpersona.fecha_nacimiento" class="validate" @change="CalcularEdad">
              <label for="fnacimiento">F.Nacimiento <span class="red-text">*</span></label>
             
            </div>

             <div class="input-field col s12 l3 m3">
              <select class="browser-default" v-model="fillpersona.genero" id="genero">
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
              <label for="genero" class="active">Genero <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l3 m3">
              <select class="browser-default" v-model="fillpersona.estado_civil" id="estadocivil">
                <option value="S">Soltero (a)</option>
                <option value="C">Casado (a)</option>
                <option value="D">Divorciado (a)</option>
                <option value="V">Viudo (a)</option>
                <option value="UL">U. Libre</option>

              </select>
              <label for="estadocivil" class="active">Estado Civil <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s12 l3 m3">
              <input id="celular" type="text" v-model="fillpersona.celular" class="validate">
              <label for="celular">Celular <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s12 l6 m6">
              <input id="correo" type="email" v-model="fillpersona.correo" class="validate">
              <label for="correo">Correo Electronico</label>
            </div>

            <div class="input-field col s12 l4 m4">
              <input id="direccion" type="text" v-model="fillpersona.direccion" class="validate">
              <label for="direccion">Dirección <span class="red-text">*</span></label>
            </div>

          </div>
        </div>

        <div class="modal-footer">
          <button class="waves-effect waves-light btn   teal lighten-1 accent-4 btn modal-close"  @click="NuevoPersona" v-if="fillpersona.cedula!='' && fillpersona.nombres!='' && fillpersona.appaterno!='' && fillpersona.apmaterno!=''  && fillpersona.celular!='' && fillpersona.correo!='' && fillpersona.direccion!='' && fillpersona.fecha_nacimiento!='' && fillpersona.estado_civil!='' && fillpersona.genero!='' && btnregistrar==true && fillpersona.cedula.length==10 && (this.edad>=18 && this.edad<=35)">Matricular</button>

          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO MATRICULA-->

     <!--INICIO MODAL EVALUAR MATRICULA-->
      <div id="mdlevaluar" class="modal">
       
        <div class="modal-content">
          <p><strong>EVALUAR A ESPECIALISTA</strong></p>
          
          <div class="row">
             <div class="input-field col s4">
              <input id="notapic" type="number" v-model="fillevaluacion.nota_pic" class="validate">
              <label for="notapic">PIC <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="notacf1" type="number" v-model="fillevaluacion.nota_cf1" class="validate">
              <label for="notacf1">Condición Fisica #1 <span class="red-text">*</span></label>
            </div>


            <div class="input-field col s4">
              <input id="notacf2" type="number" v-model="fillevaluacion.nota_cf2" class="validate">
              <label for="notacf2">Condición Fisica #2 <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="notaim1" type="number" v-model="fillevaluacion.nota_im1" class="validate">
              <label for="notaim1">Instrucción Militar #1<span class="red-text">*</span></label>
            </div>


            <div class="input-field col s4">
              <input id="notaim2" type="number" v-model="fillevaluacion.nota_im2" class="validate">
              <label for="notaim2">Instrucción Militar #2<span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="notaconducta" type="number" v-model="fillevaluacion.nota_conducta" class="validate">
              <label for="notaconducta">Conducta<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
            <button class="waves-effect waves-light btn teal lighten-1 accent-4 btn modal-close"  @click="RegistrarNota">Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>
        </div>
      </div>
    <!--FIN MODAL EVALUAR MATRICULA-->
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
        idciclo:String
     },
    data(){
      return{
              usuario: global.user,
             
              fullPage:true,
              isLoading:false,

              fillpersona:{'cedula':'','nombres':'','appaterno':'','apmaterno':'','celular':'','correo':'','direccion':'','estado':'','fecha_nacimiento':'','estado_civil':'','genero':'','tipo':'','idciclo':'','idusuario':''},
              fillevaluacion:{'id':'','nota_pic':'','nota_cf1':'','nota_cf2':'','nota_im1':'','nota_im2':'','nota_conducta':''},
               btnregistrar:true,

               matriculas:[],
               datosciclo:[],
               edad:'',

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
                this.GetMatricula(page);
              },

              CalcularEdad(){
                var fecha_nac=this.fillpersona.fecha_nacimiento;
                var nacimiento=moment(fecha_nac);
                var hoy=moment();
                var anios=hoy.diff(nacimiento,"years");
                this.edad=anios;


                if(anios>=18 && anios<=35) M.toast({html: 'Edad Dentro de rango admisible','classes':'teal lighten-1'});
                else M.toast({html: 'Edad Incorrecto, No podra realizar el registro','classes':'red'});

              },

              RegistrarNota(){
                    var url='/registrarnotamatricula';
                    axios.post(url,this.fillevaluacion
                    ).then(response=>{ 
                      M.toast({html: 'Notas registrados','classes':'teal lighten-1'});
                      this.GetMatricula(this.page);
                    }).catch(error=>{
                        console.log(error.response);
                    }); 
              },
              GetEvaluacion(idmatricula){
             
                var url='/getevaluacionmatricula';
                    axios.post(url,
                      {
                        'idmatricula':idmatricula
                      }
                    ).then(response=>{ 
                      console.log(response.data);
                      var nota=response.data;
                      this.fillevaluacion.id=nota[0]['id'];
                      this.fillevaluacion.nota_pic=nota[0]['nota_pic'];
                      this.fillevaluacion.nota_cf1=nota[0]['nota_cf1'];
                      this.fillevaluacion.nota_cf2=nota[0]['nota_cf2'];
                      this.fillevaluacion.nota_im1=nota[0]['nota_im1'];
                      this.fillevaluacion.nota_im2=nota[0]['nota_im2'];
                      this.fillevaluacion.nota_conducta=nota[0]['nota_conducta'];
                      document.querySelector("label[for='notapic']").classList.add('active');
                      document.querySelector("label[for='notacf1']").classList.add('active');
                      document.querySelector("label[for='notacf2']").classList.add('active');
                      document.querySelector("label[for='notaim1']").classList.add('active');
                      document.querySelector("label[for='notaim2']").classList.add('active');
                      document.querySelector("label[for='notaconducta']").classList.add('active');



                    }).catch(error=>{
                        console.log(error.response);
                    }); 
              },
              GetMatricula(page){
                var url='/getmatricula?page='+page+'&idciclo='+this.idciclo;
                    axios.get(url,
                      {}
                    ).then(response=>{ 
                        console.log(response.data);
                        this.matriculas=response.data.matriculas.data;
                        this.pagination=response.data.pagination;
                        M.toast({html: 'Matriculas obtenido','classes':'teal lighten-1'});

                     
                    }).catch(error=>{
                        console.log(error.response);
                    }); 
              },
              NuevoPersona(){
                this.fillpersona.idciclo=this.idciclo;
                this.fillpersona.idusuario=this.usuario.id;
                console.log(this.fillpersona);

                var url='/nuevomatricula';
                    axios.post(url,this.fillpersona
                    ).then(response=>{ 
                        console.log(response.data);
                        if(response.data=='repetido'){
                          M.toast({html: 'Ya Existe Matricula, No es posible duplicarlo.','classes':'orange'});
                          this.fillpersona.cedula='';
                          this.fillpersona.nombres='';
                          this.fillpersona.appaterno='';
                          this.fillpersona.apmaterno='';
                          this.fillpersona.celular='';
                          this.fillpersona.correo='';
                          this.fillpersona.direccion='';
                          this.fillpersona.estado='';
                          this.fillpersona.fecha_nacimiento='';
                          this.fillpersona.estado_civil='';
                          this.fillpersona.genero='';
                          this.fillpersona.tipo='';
                          this.fillpersona.titulo=false;
                          this.fillpersona.nombretitulo='';
                        }else{

                          this.fillpersona.cedula='';
                          this.fillpersona.nombres='';
                          this.fillpersona.appaterno='';
                          this.fillpersona.apmaterno='';
                          this.fillpersona.celular='';
                          this.fillpersona.correo='';
                          this.fillpersona.direccion='';
                          this.fillpersona.estado='';
                          this.fillpersona.fecha_nacimiento='';
                          this.fillpersona.estado_civil='';
                          this.fillpersona.genero='';
                          this.fillpersona.tipo='';
                          this.fillpersona.titulo=false;
                          this.fillpersona.nombretitulo='';

                          this.GetMatricula(this.page);
                         
                          M.toast({html: 'Matriculado Exitosamente','classes':'teal lighten-1'});
                        }

                      
                    }).catch(error=>{
                        console.log(error.response);
                    }); 

             },
             ConsultarPersona(){
               var url='/consultarpersona';
                    axios.post(url,{
                      'cedula':this.fillpersona.cedula
                    }
                    ).then(response=>{ 
                      if(response.data.length>0){
                        var person=response.data[0];
                        console.log(person);
                        M.toast({html: 'Persona Existe','classes':'teal lighten-1'});
                        this.fillpersona.nombres=person.nombres;
                        this.fillpersona.appaterno=person.appaterno;
                        this.fillpersona.apmaterno=person.apmaterno;
                        this.fillpersona.celular=person.celular;
                        this.fillpersona.correo=person.correo;
                        this.fillpersona.direccion=person.direccion;
                        this.fillpersona.fecha_nacimiento=person.fecha_nacimiento;
                        this.fillpersona.estado_civil=person.estado_civil;
                        this.fillpersona.genero=person.genero;
                        this.fillpersona.tipo=person.tipo;
                        this.fillpersona.nombretitulo=person.nombretitulo;

                        document.querySelector("label[for='nombre']").classList.add('active');
                        document.querySelector("label[for='apellido1']").classList.add('active');
                        document.querySelector("label[for='apellido2']").classList.add('active');
                        document.querySelector("label[for='celular']").classList.add('active');
                        document.querySelector("label[for='correo']").classList.add('active');
                        document.querySelector("label[for='direccion']").classList.add('active');
                        document.querySelector("label[for='fnacimiento']").classList.add('active');
                        document.querySelector("label[for='estadocivil']").classList.add('active');
                        document.querySelector("label[for='genero']").classList.add('active');
                    
                        this.btnregistrar=true;
                        this.CalcularEdad();
                      }else{
                        M.toast({html: 'No Existe Persona, Llenar formulario','classes':'blue'});
                        this.btnregistrar=true;


                      }
                      
                    }).catch(error=>{
                        this.errors=error.response; 
                        console.log(error.response);
                    }); 
             },

            moment: function() { 
              return moment(); 
            }
          
          },  
          mounted() {
        
            M.AutoInit();
           this.GetMatricula(this.page);
          //  this.GetDatosCiclo();
              

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            
          }
        }
      </script>