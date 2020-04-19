<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12 l12 m12">
              <div >
                <div class="col s12">
                  <a href="" class="breadcrumb">Personas</a>
               <!--   <a href="#!" class="breadcrumb">Second</a>-->
                </div>
              </div>
        </div>

        <div class="col s12 l6 m6">
         <br>
          <a class="btn modal-trigger waves-effect teal lighten-1 "  data-target="mdlnuevopersona">Nuevo
          </a>
          <button class="waves-effect waves-light btn blue-grey lighten-1" @click="Obtener(page)">Recargar</button>
         
        </div>
       
    
      <div class="col s12">
        <table class="striped" style="font-size:11px;">
          <thead>
            
            <th>CEDULA</th>
            <th>NOMBRES Y APELLIDOS</th>
            <th>SEXO</th>
            <th></th>
            <th>CELULAR</th>
            <th>CORREO</th>
            <th>DIRECCION</th>
        <!---    <th>CLASIFICACION</th>-->
          </thead>
          <tbody>
            <tr v-for="persona in personas">
              <!--
              <td>
                <i class="material-icons prefix green-text" v-if="persona.estado=='A'">check</i>
                <i class="material-icons prefix red-text" v-if="persona.estado=='I'">block</i>
              </td>-->

              <td >
                 
                 {{ persona.cedula }}

              </td>

              <td>
                {{ persona.nombres +' , '+persona.appaterno+' '+ persona.apmaterno }}
              </td>
              <td>
                <i class="material-icons prefix purple-text" v-if="persona.genero=='F'" >radio_button_checked</i>

                <i class="material-icons prefix blue-text" v-if="persona.genero=='M'" >radio_button_checked</i>

              </td>
              <td>
                
                
              </td>


              <td v-text="persona.celular"></td>
              <td v-text="persona.correo"></td>
              <td v-text="persona.direccion"></td>
              <!--
              <td>
                <ul v-for="classf in persona.clasificacion">
                  <li>
                    <i class="material-icons prefix green-text" v-if="classf.estado=='A'" style="font-size:16px;">person_pin</i>
                    <i class="material-icons prefix red-text" v-if="classf.estado=='I'" style="font-size:16px;">block</i>
                   {{ classf.tipo_persona }}
                  </li>
                </ul>
              </td>
            -->


              <td>
               
                <a class="btn-small waves-effect waves-light   cyan darken-1 tooltipped modal-trigger" data-target="mdlmodificarcliente" @click="VistaModificarcliente(persona)"><i class="material-icons" data-position="bottom" data-tooltip="Modificar">edit</i> Modificar</a>
            
                <a class="  btn-small waves-effect waves-light  cyan darken-2 tooltipped modal-trigger" data-target="mdlvercliente" @click="VerPersona(persona)"><i class="material-icons" data-position="bottom" data-tooltip="Ver">remove_red_eye</i> Ver</a>


                <a class="btn-small waves-effect waves-light  blue-grey"  @click="DesactivarAll(persona.id)" v-if="persona.estado=='A'"><i class="material-icons" data-position="bottom" data-tooltip="Ver">archive</i> Archivar</a>

                 <a class="  btn-small waves-effect waves-light green accent-4"  @click="ActivarAll(persona.id)" v-if="persona.estado=='I'"><i class="material-icons" data-position="bottom" data-tooltip="Ver">done_all</i> Habilitar</a>
                
              </td>
            </tr>
          </tbody>
        </table>
        <div>
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


    <!--INICIO MODAL NUEVO PERSONA-->
      <div id="mdlnuevopersona" class="modal">
       
        <div class="modal-content">
          <p><strong>REGISTRO PERSONA</strong></p>
          <div class="row">

            <div class="input-field col s3">
              <input id="cedula" type="text" class="validate" v-model="fillpersona.cedula" maxlength="10">
              <label for="cedula">CEDULA <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s1">
              <button class="waves-effect waves-light btn btn-floating btn-small blue" @click="ConsultarPersona" v-if="fillpersona.cedula.length>=8"><i class="material-icons left">search</i></button>
            </div>

            <div class="input-field col s8">
              <input id="nombre" type="text" v-model="fillpersona.nombres" class="validate">
              <label for="nombre">Nombres <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s6">
              <input id="apellido1" type="text" v-model="fillpersona.appaterno" class="validate">
              <label for="apellido1">Apellido Pateno <span class="red-text">*</span></label>
            </div>


            <div class="input-field col s6">
              <input id="apellido2" type="text" v-model="fillpersona.apmaterno" class="validate">
              <label for="apellido2">Apellido Materno <span class="red-text">*</span></label>
            </div>
          
            <div class="input-field col s4">
              <input id="fnacimiento" type="date" v-model="fillpersona.fecha_nacimiento" class="validate">
              <label for="fnacimiento">F.Nacimiento <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s2">
              <select class="browser-default" v-model="fillpersona.genero" id="genero">
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
              <label for="genero">Genero <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s2">
              <select class="browser-default" v-model="fillpersona.estado_civil" id="estadocivil">
                <option value="S">Soltero (a)</option>
                <option value="C">Casado (a)</option>
                <option value="D">Divorciado (a)</option>
                <option value="V">Viudo (a)</option>
                <option value="UL">U. Libre</option>

              </select>
              <label for="estadocivil">Estado Civil <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="celular" type="text" v-model="fillpersona.celular" class="validate">
              <label for="celular">Celular <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s6">
              <input id="correo" type="email" v-model="fillpersona.correo" class="validate">
              <label for="correo">Correo Electronico</label>
            </div>

            <div class="input-field col s6">
              <input id="direccion" type="text" v-model="fillpersona.direccion" class="validate">
              <label for="direccion">Dirección <span class="red-text">*</span></label>
            </div>
            

            <div class="input-field col s12">
              <p>
                <strong>Registrarme como:</strong>
              </p>
              
              <p>

                <label>
                  <input name="tipopersona" type="radio" value="JEFE DEPARTAMENTO" v-model="fillpersona.tipo"/>
                  <span v-if="usuario.rol==1">Jefe de Departamento</span>
                </label>

                <label>
                  <input name="tipopersona" type="radio" value="DOCENTE" v-model="fillpersona.tipo"/>
                  <span v-if="usuario.rol==1">Docente</span>
                </label>


                <label>
                  <input name="tipopersona" type="radio" value="ADMINISTRADOR" v-model="fillpersona.tipo" checked />
                  <span v-if="usuario.rol==1">Administrador System</span>
                </label>


                <label>
                  <input name="tipopersona" type="radio" value="SECRETARIA" v-model="fillpersona.tipo" />
                  <span v-if="usuario.rol==1">Secretaria</span>
                </label>

                

              </p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="waves-effect waves-light btn teal lighten-1 btn modal-close"  @click="NuevoPersona" v-if="fillpersona.cedula!='' && fillpersona.nombres!='' && fillpersona.appaterno!='' && fillpersona.apmaterno!=''  && fillpersona.celular!='' && fillpersona.correo!='' && fillpersona.direccion!='' && fillpersona.fecha_nacimiento!='' && fillpersona.estado_civil!='' && fillpersona.genero!='' && fillpersona.tipo!='' "  >Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>


        </div>

 

      </div>
    <!--FIN MODAL NUEVO PERSONA-->

    <!--INICIO MODAL MODIFICAR PERSONA-->
      <div id="mdlmodificarcliente" class="modal">
        <div class="modal-content">
          
          <p><strong>MODIFICAR PERSONA</strong></p>

         <div class="row">

            <div class="input-field col s6">
              <input id="MODnombre" type="text" v-model="viewpersona.nombres" class="validate">
              <label for="MODnombre">Nombres <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s6">
              <input id="MODapellido1" type="text" v-model="viewpersona.appaterno" class="validate">
              <label for="MODapellido1">Apellido Pateno <span class="red-text">*</span></label>
            </div>


            <div class="input-field col s6">
              <input id="MODapellido2" type="text" v-model="viewpersona.apmaterno" class="validate">
              <label for="MODapellido2">Apellido Materno <span class="red-text">*</span></label>
            </div>
          
            <div class="input-field col s6">
              <input id="MODfnac" type="date" v-model="viewpersona.fecha_nacimiento" class="validate">
              <label for="MODfnac">F.Nacimiento <span class="red-text">*</span></label>
            </div>

             <div class="input-field col s4">
              <select class="browser-default" v-model="viewpersona.genero" id="MODgenero">
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
                <option value="O">Otros</option>
              </select>
              <label for="MODgenero">Genero <span class="red-text">*</span></label>
              
            </div>

             <div class="input-field col s4">
              <select class="browser-default" v-model="viewpersona.estado_civil" id="MODestadocivil">
                <option value="S">Soltero</option>
                <option value="C">Casado</option>
                <option value="D">Divorciado</option>
                <option value="V">Viudo</option>
              </select>
              <label for="MODestadocivil">Estado Civil <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s4">
              <input id="MODcelular" type="text" v-model="viewpersona.celular" class="validate">
              <label for="MODcelular">Celular <span class="red-text">*</span></label>
            </div>

            <div class="input-field col s6">
              <input id="MODcorreo" type="email" v-model="viewpersona.correo" class="validate">
              <label for="MODcorreo">Correo Electronico</label>
            </div>

            <div class="input-field col s6">
              <input id="MODdireccion" type="text" v-model="viewpersona.direccion" class="validate">
              <label for="MODdireccion">Dirección <span class="red-text">*</span></label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="waves-effect waves-light btn teal lighten-1 darken-3 btn modal-close" @click="Modificar"><i class="material-icons left">save</i>Modificar</button>
          <button class="modal-close waves-effect waves-green btn blue-grey"><i class="material-icons left">close</i>Cancelar</button>
        </div>
      </div>
    <!--FIN MODAL MODIFICAR PERSONA-->


    <!--INICIO MODAL VISUALIZAR PERSONA-->
      <div id="mdlvercliente" class="modal">
        <div class="modal-content">
          <h4>{{ viewpersona.nombres+", "+viewpersona.appaterno+" "+viewpersona.apmaterno }}</h4>
          
            <label style="font-size:25px;">
              <i class="material-icons">assignment_ind</i>
              {{ viewpersona.cedula }}
            </label>

            <p style="font-size:18px;">
              <i class="material-icons left purple-text" v-if="viewpersona.genero=='F'">hdr_strong</i>
              <span v-if="viewpersona.genero=='F'">Femenino</span>

              <i class="material-icons left blue-text" v-if="viewpersona.genero=='M'">hdr_strong</i>
              <span v-if="viewpersona.genero=='M'">Masculino</span>
              
            </p>

            <p style="font-size:18px;">
              <i class="material-icons left">person_pin</i>
                <span  v-if="viewpersona.estado_civil=='S'">Soltero (a)</span>
                <span  v-if="viewpersona.estado_civil=='C'">Casado (a)</span>
                <span  v-if="viewpersona.estado_civil=='D'">Divorciado (a)</span>
                <span  v-if="viewpersona.estado_civil=='V'">Viudo (a)</span>
                <span  v-if="viewpersona.estado_civil=='UL'">Union Libre</span>
            </p>

            <p style="font-size:18px;"><i class="material-icons left">local_phone</i>     {{ viewpersona.celular }}</p>

            <p style="font-size:18px;"><i class="material-icons left">date_range</i>   {{ viewpersona.fecha_nacimiento }}</p>

            

            <p style="font-size:18px;"><i class="material-icons left">email</i> {{ viewpersona.correo }}</p>

             <p style="font-size:18px;"><i class="material-icons left">person_pin_circle</i>   {{ viewpersona.direccion }}</p>

             <button class="waves-effect waves-light btn teal lighten-1 pulse" v-if="viewpersona.estado=='A'"><i class="material-icons left">check_circle</i>Activo</button>

             <button class="waves-effect waves-light btn red pulse" v-if="viewpersona.estado=='I'"><i class="material-icons left">do_not_disturb_alt</i>INACTIVO</button>
        </div>
        <div class="modal-footer">
          
          <button class="modal-close waves-effect waves-green btn-flat"><i class="material-icons left">close</i>Salir</button>
        </div>
      </div>
    <!--FIN MODAL VISUALIZAR PERSONA--> 
  </div>


</template>
<style type="text/css">
 .pagination li.active {
    background-color: rgb(0,128,128); }

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


   .divsearch{
    text-align: center;
    padding-bottom: 3px;
    padding-left: 65px;
  }

  .divsearch>input{
    size: 150px;
  }

  .divoptions{
    text-align: right;
  }

  .content{
    margin:15px;
    margin-bottom: 25px;
    max-height: calc(65vh);
        overflow-y: scroll;
        font-size: 12px;
  }

  #tablecontent{
    font-size: 11px;
  }

</style>
<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data(){
      return{
              usuario: global.user,

              fillpersona:{'cedula':'','nombres':'','appaterno':'','apmaterno':'','celular':'','correo':'','direccion':'','estado':'','fecha_nacimiento':'','estado_civil':'','genero':'','tipo':'','titulo':false,'nombretitulo':''},
              btnregistrar:true,

              viewpersona:{'cedula':'','nombres':'','appaterno':'','apmaterno':'','celular':'','correo':'','direccion':'','estado':'','fecha_nacimiento':'','estado_civil':'','genero':'','tipo':true},
              personas:[],

              fillcliente:{'id':'','numero_documento':'','nombre':'','apellido':'','telefono':'','correo':'','direccion':'','idusuario':''},
              viewcliente:{'id':'','numero_documento':'','nombre':'','apellido':'','telefono':'','correo':'','direccion':''},
              clientes:[],
              observacion:'',
              fullPage:true,
              isLoading:false,

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

              var from=this.pagination.current_page-this.offset;//pendiente offset

              if(from<1) from=1;

              var to=from+(this.offset*2);//pendiente offset

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
              } ,
             ViewNovedad(){
                
             },
             DesactivarAll(idperson){
              
              var url='/desactivarallpersona';
                    axios.post(url,{
                      'idpersona':idperson
                    }
                    ).then(response=>{ 
                        M.toast({html: 'Persona Desactivado!','classes':'teal lighten-1'});
                        this.Obtener(this.page); 
                    }).catch(error=>{
                         M.toast({html: 'Ocurrio un Error!','classes':'danger'});
                    }); 
             },
             ActivarAll(idperson){
                var url='/activarallpersona';
                    axios.post(url,{
                      'idpersona':idperson
                    }
                    ).then(response=>{ 
                        M.toast({html: 'Persona Activado!','classes':'teal lighten-1'});
                        this.Obtener(this.page); 
                    }).catch(error=>{
                         M.toast({html: 'Ocurrio un Error!','classes':'danger'});
                    }); 
             },
             VerPersona(p){
              this.viewpersona=p;
             },
             ConsultarPersona(){
               var url='/consultarpersona';
                    axios.post(url,{
                      'cedula':this.fillpersona.cedula
                    }
                    ).then(response=>{ 
                      if(response.data.length>0){
                        var person=response.data[0];
                
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
                    
                        this.btnregistrar=false;
                      }else{
                        M.toast({html: 'Persona No Existe','classes':'teal lighten-1'});
                        this.btnregistrar=true;


                      }
                      
                    }).catch(error=>{
                         M.toast({html: 'Ocurrio un Error!','classes':'danger'});
                    }); 
             },
             NuevoPersona(){
              this.fillpersona.idusuario=this.usuario.id;
            
              var url='/nuevopersona';
                    axios.post(url,this.fillpersona
                    ).then(response=>{ 
                     
                        if(response.data=='denegado'){
                          M.toast({html: 'Ya Existe','classes':'orange'});
                          this.fillpersona.cedula='';
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
                         
                          M.toast({html: 'Registrado','classes':'green'});
                        }

                        this.Obtener(this.page); 
                        
                    }).catch(error=>{
                      console.log(error.response);
                         M.toast({html: 'Ocurrio un Error!','classes':'danger'});
                    }); 
             },
             VistaModificarcliente(p){
                this.viewpersona=p;
                document.querySelector("label[for='MODgenero']").classList.add('active');
                document.querySelector("label[for='MODnombre']").classList.add('active');
                document.querySelector("label[for='MODdireccion']").classList.add('active');
                document.querySelector("label[for='MODdireccion']").classList.add('active');
                document.querySelector("label[for='MODcorreo']").classList.add('active');
                document.querySelector("label[for='MODestadocivil']").classList.add('active');
                document.querySelector("label[for='MODcelular']").classList.add('active');
                document.querySelector("label[for='MODapellido1']").classList.add('active');
                document.querySelector("label[for='MODapellido2']").classList.add('active');
             },
             Modificar(){
              var url='/modificarpersona';
                    axios.post(url,this.viewpersona
                    ).then(response=>{ 
                      this.Obtener(this.page); 
                       M.toast({html: 'Persona Modificado','classes':'teal lighten-1'});
                    }).catch(error=>{
                         M.toast({html: 'Ocurrio un Error!','classes':'danger'});
                       
                    }); 
             },
             ViewDesactivar(c){
                $("label[for='observacion']").addClass('active');     
                this.observacion='';
                this.viewcliente=c;
             },
             Obtener(page){
              var url='/obtenerpersona?page='+page;
              axios.get(url,{
              },{ 
                  onUploadProgress: progressEvent => this.isLoading=true
                }).then(response=>{ 
                  this.isLoading=false;
                  this.personas=response.data.persons.data;
                  this.pagination=response.data.pagination;
                  M.toast({html: 'Persona Obtenido','classes':'teal lighten-1'});
                  
              }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error!','classes':'danger'});
              });   
             },
          
          },  
          mounted() {
            M.AutoInit();

            document.querySelector("label[for='estadocivil']").classList.add('active');
            document.querySelector("label[for='genero']").classList.add('active');
            this.Obtener(this.page);

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });


            
          }
        }
      </script>