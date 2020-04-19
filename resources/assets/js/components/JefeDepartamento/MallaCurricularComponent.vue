<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
            <a href="" class="breadcrumb">Mallas Curriculares</a>
        </div>
        <div class="col s12 l12 m12">
         
          <button class="waves-effect waves-light btn teal lighten-1   modal-trigger"  data-target="mdlnuevohijo"> Nuevo</button>

          <button class="waves-effect waves-light btn blue-grey lighten-1" @click="ObtenerMalla"> Recargar</button>
        </div>  


             
    
      <div class="col s12 container">
        <div >
          <table  v-for="m in malla" style="margin-bottom:20px;margin-top:20px;"> 
            <caption class="modal-trigger"  @click="ViewMalla(m.id,m.nombre_malla)" data-target="mdlmalla"  >{{ m.nombre_malla }} </caption>
            <strong><span class="badge new modal-trigger"  data-badge-caption="" data-target="mdlnuevocomp1" @click="ViewNewComponente1(m.id,m.nombre_malla)"><i class="material-icons left" ></i>Más</span></strong>
          
            <tr v-for="per in m.periodo"> 
              <th rowspan="m.periodo!=null" > 
                <label>
                  <strong  class="modal-trigger"  @click="ViewPeriodo(m.nombre_malla,per.id,per.nombre,per.porcentaje)" data-target="mdlmodificarcomp1">{{ per.nombre }}</strong>

                </label>
                
                <br>
                <span class="badge new  blue-grey lighten-2 sm" data-badge-caption="">% {{ per.porcentaje }}</span>
                <br>

                <strong><span class="badge new modal-trigger"  data-badge-caption="" data-target="mdlnuevocomp2" @click="ViewComponente2(per.id,per.nombre)"><i class="material-icons left" ></i>Más Componente</span></strong>

              </th>
              <div v-for="n1 in per.nivel1">
               <strong class="modal-trigger"  @click="ViewModificarComp2(n1.nombre_n1,n1.id,n1.porcentaje_n1)" data-target="mdlmodificarcomp2">{{ n1.nombre_n1 }}</strong>
               <br>
                 <span class="badge new  blue-grey lighten-2 sm" data-badge-caption="">% {{ n1.porcentaje_n1 }}</span>

                <strong v-if="n1.modulo==1"><span class="badge new modal-trigger"  data-badge-caption="" data-target="mdlnuevocomp3" @click="ViewComponente3(n1.id,n1.nombre_n1)">Más</span></strong>

                 <router-link :to="'/modulos/'+n1.id"    v-if="n1.modulo==1"   ><span class="badge new blue" data-badge-caption="">Modulos</span> </router-link>


                
     
                <ol v-if="n1.nivel2 != null">
                  <strong v-if="n1.nivel2.length>0" >Evaluacion Modular</strong>
                  <li v-for="n2 in n1.nivel2" v-if="n1.nivel2.length>0">
                    <strong  class="modal-trigger" data-target="mdlmodificarcomp3" @click="ViewModificarComponente3(n2.id,n2.nombre_n2,n2.porcentaje_n2)">{{ n2.nombre_n2 }}</strong>
                    <br>
                    <span class="badge new  blue-grey lighten-2 sm" data-badge-caption="">% {{ n2.porcentaje_n2 }}</span>
                  </li>
                </ol>
              </div>
            </tr> 
          </table>
        </div>


      </div>
    </div>


     

     <!--INICIO MODAL NUEVO HIJO-->
      <div id="mdlnuevohijo" class="modal">
        <div class="modal-content">
          <div><h5>Nuevo Malla Curricular</h5></div>
       
          <div> 
            <div class="input-field col s3">
              <input id="nombremalla" type="text" class="validate" v-model="fillmalla.nombre"/>
              <label for="nombremalla">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

          </div>

        </div>

        <div class="modal-footer">
          <button class="modal-close waves-effect waves-green btn  teal lighten-1" v-if="fillmalla.nombre!=''" @click="RegistrarMalla">Guardar</button>
          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>
        </div>
      </div>
    <!--FIN MODAL NUEVO PADRE-->


    <!--INICIO MODAL MODIFICAR MALLA-->
      <div id="mdlmalla" class="modal">
        <div class="modal-content">
          <div><h5>Modificar Nombre Malla Curricular</h5></div>

          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" id="mallanombre" v-model="fillmalla.nombre" class="validate"/>
              <label class="active" for="mallanombre">Nombre Malla Curricular<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="ModificarMalla" v-if="fillmalla.nombre!=''"> Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL MODIFICAR MALLA-->


    <!--INICIO MODAL NUEVO COMPOENTE 1-->
      <div id="mdlnuevocomp1" class="modal">
        <div class="modal-content">
          <div><h5>Nuevo Componente 1</h5></div>

          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" id="mallacompnombre" v-model="fillcomponente1.nombremalla" class="validate" disabled />
              <label class="active" for="mallacompnombre">Nombre Malla Curricular<span class="red-text">*</span></label>
            </div>


            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp1nombre" v-model="fillcomponente1.nombre" class="validate"/>
              <label class="active" for="comp1nombre">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input  type="number" id="comp1porcentaje" v-model="fillcomponente1.porcentaje" class="validate"/>
              <label class="active" for="comp1porcentaje">Porcentaje %<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="RegistrarComponente1" v-if="fillcomponente1.nombre!='' && fillcomponente1.porcentaje>0"> Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO COMPONENTE1-->

    <!--INICIO MODAL MODIFICAR COMPOENTE 1-->
      <div id="mdlmodificarcomp1" class="modal">
        <div class="modal-content">
          <div><h5>Modificar Componente 1</h5></div>

          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" id="mallacompnombre_mod" v-model="fillcomponente1.nombremalla" class="validate" disabled />
              <label class="active" for="mallacompnombre_mod">Nombre Malla Curricular<span class="red-text">*</span></label>
            </div>


            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp1nombre_mod" v-model="fillcomponente1.nombre" class="validate"/>
              <label class="active" for="comp1nombre_mod">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input  type="number" id="comp1porcentaje_mod" v-model="fillcomponente1.porcentaje" class="validate"/>
              <label class="active" for="comp1porcentaje_mod">Porcentaje %<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="ModificarComponente1" v-if="fillcomponente1.nombre!='' && fillcomponente1.porcentaje>0"> Modificar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL MODIFICAR COMPONENTE1-->


<!--INICIO MODAL NUEVO COMPOENTE 2-->
      <div id="mdlnuevocomp2" class="modal">
        <div class="modal-content">
          <div><h5>Nuevo Componente 2</h5></div>

          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp2nombrecomp1_mod" v-model="fillcomponente2.nombreperiodo" class="validate" disabled />
              <label class="active" for="comp2nombrecomp1_mod">Nombre Componente 2<span class="red-text">*</span></label>
            </div>


            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp2nombre_mod" v-model="fillcomponente2.nombre" class="validate"/>
              <label class="active" for="comp2nombre_mod">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l6 m12">
              <input  type="number" id="comp2porcentaje_mod" v-model="fillcomponente2.porcentaje" class="validate"/>
              <label class="active" for="comp2porcentaje_mod">Porcentaje %<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l6 m12">
              <input  type="checkbox" id="comp2modulo_mod" v-model="fillcomponente2.modulo"/>
              <label class="active" for="comp2modulo_mod">Rgistro de modulo<span class="red-text">*</span></label>
            </div>

          </div>
        </div>
       

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="NuevoComponente2" v-if="fillcomponente2.nombre!='' && fillcomponente2.porcentaje>0"> Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO COMPONENTE2-->


    <!--INICIO MODAL MODIFICAR COMPOENTE 2-->
      <div id="mdlmodificarcomp2" class="modal">
        <div class="modal-content">
          <div><h5>Modificar Componente 2</h5></div>

          <div class="row">
          
            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp2nombre_mod2" v-model="fillcomponente2.nombre" class="validate"/>
              <label class="active" for="comp2nombre_mod2">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input  type="number" id="comp2porcentaje_mod2" v-model="fillcomponente2.porcentaje" class="validate"/>
              <label class="active" for="comp2porcentaje_mod2">Porcentaje %<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="ModificarComponente2" v-if="fillcomponente2.nombre!='' && fillcomponente2.porcentaje>0"> Modificar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL MODIFICAR COMPONENTE2-->


    <!--INICIO MODAL NUEVO COMPOENTE 3-->
      <div id="mdlnuevocomp3" class="modal">
        <div class="modal-content">
          <div><h5>Nuevo Componente 3</h5></div>

          <div class="row">
            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp3nombren1" v-model="fillcomponente3.nombren1" class="validate" disabled/>
              <label class="active" for="comp3nombren1">Nombre Componente 1<span class="red-text">*</span></label>
            </div>

            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp3nombre" v-model="fillcomponente3.nombre" class="validate"/>
              <label class="active" for="comp3nombre">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input  type="number" id="comp3porcentaje" v-model="fillcomponente3.porcentaje" class="validate"/>
              <label class="active" for="comp3porcentaje">Porcentaje %<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="NuevoComponente3" v-if="fillcomponente3.nombre!='' && fillcomponente3.porcentaje>0"> Registrar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO COMPONENTE 3-->

     <!--INICIO MODAL MODIFICAR COMPOENTE 3-->
      <div id="mdlmodificarcomp3" class="modal">
        <div class="modal-content">
          <div><h5>Modificar Componente 3</h5></div>

          <div class="row">
           

            <div class="input-field col s12 l12 m12">
              <input  type="text" id="comp3nombre_mod" v-model="fillcomponente3.nombre" class="validate"/>
              <label class="active" for="comp3nombre_mod">Nombre / Denominación<span class="red-text">*</span></label>
            </div>

             <div class="input-field col s12 l12 m12">
              <input  type="number" id="comp3porcentaje_mod" v-model="fillcomponente3.porcentaje" class="validate"/>
              <label class="active" for="comp3porcentaje_mod">Porcentaje %<span class="red-text">*</span></label>
            </div>
          </div>
        </div>

        <div class="modal-footer">

          <button class="modal-close waves-effect waves-green btn  teal lighten-1"  @click="ModificarComponente3" v-if="fillcomponente3.nombre!='' && fillcomponente3.porcentaje>0"> Modificar</button>

          <button class="modal-close waves-effect waves-green btn-flat">Salir</button>

        </div>
      </div>
    <!--FIN MODAL MODIFICAR COMPONENTE 3-->


  </div>


</template>
<style type="text/css">


table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #eee;
}
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
            idpromo:String
     },
    data(){
      return{
              usuario: global.user,
              fullPage:true,
              isLoading:false,

              malla:[],

              fillmalla:{'id':'','nombre':''},
              fillcomponente:{'id':'','nombre':'','porcentaje':'','idmalla':'','nombremalla':''},
              fillcomponente1:{'id':'','nombre':'','porcentaje':'','idmalla':'','nombremalla':''},
              fillcomponente2:{'id':'','nombre':'','porcentaje':'','idperiodo':'','nombreperiodo':'','modulo':0},
              fillcomponente3:{'id':'','nombre':'','porcentaje':'','idn1':'','nombren1':''},

              fillmalla:{'id':'','nombre':''},
              }
            },
            components: {
             Loading
            },
            methods:{
            moment: function() { 
              return moment(); 
            },
            ModificarComponente3(){
               var url='/modificarnivel2';
                
                axios.post(url,this.fillcomponente3
                ).then(response=>{ 
                  this.fillcomponente3.nombre='';
                  this.fillcomponente3.porcentaje='';
                  this.fillcomponente3.idn1='';
                  this.fillcomponente3.nombren1='';
                  this.ObtenerMalla();
                  M.toast({html: 'Componente Modificado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            ViewModificarComponente3(id,nombre,porcentaje){
              this.fillcomponente3.id='';
              this.fillcomponente3.nombre='';
              this.fillcomponente3.porcentaje='';
              this.fillcomponente3.idn1='';
              this.fillcomponente3.nombren1='';


              this.fillcomponente3.id=id;
              this.fillcomponente3.nombre=nombre;
              this.fillcomponente3.porcentaje=porcentaje;
              document.querySelector("label[for='comp3nombre_mod']").classList.add('active');
              document.querySelector("label[for='comp3porcentaje_mod']").classList.add('active');
            },
            NuevoComponente3(){
               var url='/registrarnivel2';

                axios.post(url,this.fillcomponente3
                ).then(response=>{ 
                  this.fillcomponente3.nombre='';
                  this.fillcomponente3.porcentaje='';
                  this.fillcomponente3.idn1='';
                  this.fillcomponente3.nombren1='';
                  this.ObtenerMalla();
                  M.toast({html: 'Componente Registrado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },

             ViewComponente3(idn1,nombre_n1){
                this.fillcomponente3.idn1='';
                this.fillcomponente3.nombren1='';
                this.fillcomponente3.nombre='';
                this.fillcomponente3.porcentaje='';
                this.fillcomponente3.idn1=idn1;
                this.fillcomponente3.nombren1=nombre_n1;
                document.querySelector("label[for='comp3nombren1']").classList.add('active');
            },

            ModificarComponente2(){
                var url='/modificarnivel1';
                
                axios.post(url,this.fillcomponente2
                ).then(response=>{ 
                  this.fillcomponente2.nombre='';
                  this.fillcomponente2.porcentaje='';
                  this.fillcomponente2.idperiodo='';
                  this.fillcomponente2.nombreperiodo='';
                  this.ObtenerMalla();
                  M.toast({html: 'Componente Modificado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            NuevoComponente2(){
               var url='/registrarnivel1';
                
                axios.post(url,this.fillcomponente2
                ).then(response=>{ 
                  this.fillcomponente2.nombre='';
                  this.fillcomponente2.porcentaje='';
                  this.fillcomponente2.idperiodo='';
                  this.fillcomponente2.nombreperiodo='';
                  this.ObtenerMalla();
                  M.toast({html: 'Componente Registrado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
            ViewModificarComp2(nombren1,idn1,porcentaje){
              this.fillcomponente2.id=idn1;
              this.fillcomponente2.nombre=nombren1;
              this.fillcomponente2.porcentaje=porcentaje;
              document.querySelector("label[for='comp2nombre_mod2']").classList.add('active');
              document.querySelector("label[for='comp2porcentaje_mod2']").classList.add('active');

            },
            ViewComponente2(idperiodo,nombre_periodo){
              this.fillcomponente2.idperiodo='';
              this.fillcomponente2.nombreperiodo='';
              this.fillcomponente2.id='';
              this.fillcomponente2.nombre='';
              this.fillcomponente2.porcentaje='';

              this.fillcomponente2.idperiodo=idperiodo;
              this.fillcomponente2.nombreperiodo=nombre_periodo;
              document.querySelector("label[for='comp2nombrecomp1_mod']").classList.add('active');
            },
            ModificarComponente1(){
               var url='/modificarcomp1';
                
                axios.post(url,this.fillcomponente1
                ).then(response=>{ 
                  this.fillcomponente1.nombre='';
                  this.fillcomponente1.porcentaje='';
                  this.fillcomponente1.idmalla='';
                  this.fillcomponente1.nombremalla='';
                  this.ObtenerMalla();
                  M.toast({html: 'Componente Registrado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                });  
            },
            RegistrarComponente1(){
              var url='/registrarcomp1';
                
                axios.post(url,this.fillcomponente1
                ).then(response=>{ 
                  this.fillcomponente1.nombre='';
                  this.fillcomponente1.porcentaje='';
                  this.fillcomponente1.idmalla='';
                  this.fillcomponente1.nombremalla='';
                  this.ObtenerMalla();
                  M.toast({html: 'Componente Registrado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },  
            ViewNewComponente1(id,nombre){
              this.fillcomponente1.id='';
              this.fillcomponente1.nombremalla='';
              this.fillcomponente1.nombre='';
              this.fillcomponente1.porcentaje='';

              this.fillcomponente1.idmalla=id;
              this.fillcomponente1.nombremalla=nombre;
              document.querySelector("label[for='mallacompnombre']").classList.add('active');
              document.querySelector("label[for='comp1nombre']").classList.add('active');
              document.querySelector("label[for='comp1porcentaje_mod']").classList.add('active');
            },
              ViewMalla(id,nombre){
              this.fillmalla.id=id;
              this.fillmalla.nombre=nombre;
              
              document.querySelector("label[for='mallanombre']").classList.add('active');
            },
            ViewPeriodo(nombremalla,id,nombre,porcentaje){
              this.fillcomponente1.nombremalla=nombremalla;
              this.fillcomponente1.id=id;
              this.fillcomponente1.nombre=nombre;
              this.fillcomponente1.porcentaje=porcentaje;

              document.querySelector("label[for='mallacompnombre_mod']").classList.add('active');
              document.querySelector("label[for='comp1nombre_mod']").classList.add('active');
              document.querySelector("label[for='comp1porcentaje_mod']").classList.add('active');
            },

            RegistrarMalla(){ 
                var url='/registrarmalla';
                
                axios.post(url,this.fillmalla
                ).then(response=>{ 
                  M.toast({html: 'Malla Registrado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },

            ModificarMalla(){
              var url='/modificarmalla';
                
                axios.post(url,this.fillmalla
                ).then(response=>{ 
                  this.ObtenerMalla();
                  M.toast({html: 'Malla Modificado!','classes':'green'});
                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});
                }); 
            },
           
            ObtenerMalla(){
               var url='/getmalla';
                    axios.post(url,
                ).then(response=>{ 
                  this.malla=response.data;
                  console.log(this.malla);
                  M.toast({html: 'Mallas obtenidos!','classes':'green'});

                   document.addEventListener('DOMContentLoaded', function() {
                    var elems = document.querySelectorAll('.dropdown-trigger');
                    var instances = M.Dropdown.init(elems,{});
                  });

                }).catch(error=>{
                  M.toast({html: 'Ocurrio un Error','classes':'red'});

                  console.log(error.response);
                }); 
            },
          
            ScritpActive(){
             
              document.querySelector("label[for='nombrehMOD']").classList.add('active');
              document.querySelector("label[for='siglahMOD']").classList.add('active');

            },
          
          },  
          mounted() {
         

            this.ObtenerMalla();
            console.log(this.mallas);

               M.AutoInit();
            
            
          },computed: {
        
          }
        }
      </script>