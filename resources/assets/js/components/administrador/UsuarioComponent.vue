<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="false" color="#008080" :is-full-page="fullPage"></loading>
    </div>

      <div class="row">
        <div class="col s12" style="padding:5px;">
          <strong>Usuarios</strong>
        </div>
        <div class="col s6">
         
          <button class="waves-effect waves-light btn indigo" @click="Get"><i class="material-icons left">sync</i> Recargar</button>
        </div>

        <div class="row">
          <form class="col s6">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">search</i>
                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                <label for="icon_prefix2">Nombre</label>
              </div>
            </div>
          </form>
        </div>
       
    
      <div class="col s12 container">
       
        <table>
          <thead>
            <th>NAME USER</th>
            <th>ROL</th>
            <th>ACCESO</th>
            <th>CODIGO ACCESO</th>

            <th>REGISTRADO</th>
            <th>PERSONA</th>

            <th></th>
          </thead>
          <tbody>
            <tr v-for="user in usuarios">
              <td><em>{{ user.name }}</em></td>
             
              <td>
                <label v-if="user.rol=='1'">Administrador</label>
                <label v-if="user.rol=='2'">Docente</label>
                <label v-if="user.rol=='3'">Secretaria</label>
                <label v-if="user.rol=='4'">Estudiante</label>

             
              </td>

              <td>
               <span class="badge green white-text" v-if="user.estadousuario=='A'">Permitido</span>
                <span class="badge red white-text" v-if="user.estadousuario=='I'">Restringido</span>

              </td>
              <td>
                {{ user.codigo }}
              </td>
              <td>{{ user.fecha_registro }}</td>
              
             
              <td>
                <strong>
                   {{ user.nombres+' ,'+user.appaterno+' '+user.apmaterno }}
                </strong>
               <br>
               <label><i class="material-icons" style="font-size:12px;">perm_contact_calendar</i>{{ user.cedula }}</label>
               <br>
               <label><i class="material-icons" style="font-size:12px;">place</i>{{ user.direccion }}</label>

               <br>
               <label><i class="material-icons" style="font-size:12px;">local_phone</i>{{ user.celular }}</label>

              </td>

              <td>
                <a class="btn  btn-small waves-effect waves-light orange  accent-3"  @click="Activar(user.id)" v-if="user.estadousuario=='A'"><i class="material-icons" data-position="bottom" data-tooltip="Ver">lock</i> Desactivar</a>

                <a class="btn  btn-small waves-effect waves-light green accent-3"  @click="Desactivar(user.id)" v-if="user.estadousuario=='I'"><i class="material-icons" data-position="bottom" data-tooltip="Ver">lock_open</i> Activar</a>

              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!--INICIO MODAL NUEVO PERSONA-->
      <div id="mdlnuevopersona" class="modal">
        <div class="modal-content">
          <p><strong>REGISTRO DE USUARIO</strong></p>
          <div class="row">
            formulario
          </div>
        </div>

        <div class="modal-footer">
         
          <button class="modal-close waves-effect waves-green btn blue-grey"><i class="material-icons left">close</i>Cancelar</button>

        </div>
      </div>
    <!--FIN MODAL NUEVO CLIENTE-->
  </div>


</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data(){
      return{
              usuario: global.user,
              usuarios:[],
              fullPage:true,
              isLoading:false,

           
              }
            },
            components: {
            
              Loading
           

            },
            methods:{

            moment: function() { 
              return moment(); 
              },
            Activar(iduser){

            },
            Desactivar(iduser){

            },
            Get(){
               var url='/getusuarios';
                    axios.post(url,
                    ).then(response=>{ 
                        M.toast({html: 'Usuarios Obtenidos','classes':'blue'});
                        this.usuarios=response.data; 
                    }).catch(error=>{
                        M.toast({html: 'Ocurrio un Error','classes':'red'});
                        console.log(error.response);
                    }); 
            }
          },  
          mounted() {
            M.AutoInit();

            document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.tooltipped');
              var instances = M.Tooltip.init(elems);
            });
            this.Get();
          },computed: {
       
          }
        }
      </script>