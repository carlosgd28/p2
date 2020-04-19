require('./bootstrap');

import Vue from 'vue';
import Router from 'vue-router';

//academia
import PersonaAdminComp from './components/administrador/PersonaComponent.vue'
import UserAdminComp from './components/administrador/UsuarioComponent.vue'
import AuditoriaAdminComp from './components/administrador/AuditoriaComponent.vue'
import EstudianteAdminComp from './components/administrador/EstudianteComponent.vue'
import PromocionAdminComp from './components/administrador/PromocionComponent.vue'
import CicloAcadAdminComp from './components/administrador/CicloAcademicoComponent.vue'
import DocenteAdminComp from './components/administrador/DocenteComponent.vue'
import MatriculaAdminComp from './components/administrador/MatriculaComponent.vue'

import AsigCursoAdminComp from './components/administrador/AsignarCursoComponent.vue'
import EvaluarEstudiantedminComp from './components/administrador/EvaluarEstudianteComponent.vue'


//JEFE DEPARTAMENTO INICIO
import AsigDocenteComp from './components/JefeDepartamento/AsignarDocenteComponent.vue'

//JEFE DEPARTAMENTO FIN

//DOCENTE INICIO
import AsignaturasComp from './components/Docente/AsignaturasComponent.vue'
import ContenidoAsignaturasComp from './components/Docente/ContenidosComponent.vue'
import MatriculadosDocComp from './components/Docente/MatriculadosDocenteComponent.vue'


//DOCENTE FIN


//MALLA CURRICULAR
import MallaCurComp from './components/JefeDepartamento/MallaCurricularComponent.vue'
import ModuloComp from './components/JefeDepartamento/ModuloComponent.vue'
import CursosCargoComp from './components/administrador/CursosCursandoComponent.vue'
import AreaConocimientoComp from './components/JefeDepartamento/AreaConocimientoComponent.vue'
import ContenidoComp from './components/JefeDepartamento/ContenidoComponent.vue'
import ModuloMatriculaComp from './components/JefeDepartamento/ModuloMatriculaComponent.vue'

Vue.use(Router);
Vue.config.productionTip = false;
let router=new Router({
  routes:[
  //Docente
    {name:'asiganturascargo', path: '/asiganturascargo', component: AsignaturasComp},
    {name:'contenidosasignatura/:idarea/:iddocentearea', path: '/contenidosasignatura/:idarea/:iddocentearea', component: ContenidoAsignaturasComp,props:true},
    {name:'especialistasmatriculados/:idarea/:iddocentearea', path: '/especialistasmatriculados/:idarea/:iddocentearea', component: MatriculadosDocComp,props:true},
 //MALLA CURRICULAR
    {name:'mallacurricular', path: '/mallacurricular', component: MallaCurComp},
    {name:'matricular/:idciclo', path:'/matricular/:idciclo', component: MatriculaAdminComp,props:true},
    {name:'modulos', path:'/modulos', component:ModuloComp},
    {name:'asignaturas/:idciclo/:idmatricula/:idmodulo', path:'/asignaturas/:idciclo/:idmatricula/:idmodulo', component:CursosCargoComp,props:true},
    {name:'areaconocimiento/:idmodulo', path:'/areaconocimiento/:idmodulo', component: AreaConocimientoComp,props:true},
    {name:'contenidos/:idmodulo/:idarea', path:'/contenidos/:idmodulo/:idarea', component: ContenidoComp,props:true},
    {name:'modulomatricula/:idciclo/:idmatricula', path:'/modulomatricula/:idciclo/:idmatricula', component: ModuloMatriculaComp,props:true},

    
  //ACADEMIA

    {name:'persona', path: '/persona', component: PersonaAdminComp},
    {name:'usuarios', path: '/usuarios', component: UserAdminComp},
    {name:'auditoria', path: '/auditoria', component: AuditoriaAdminComp},
    {name:'docentes', path: '/docentes', component: DocenteAdminComp},
    {name:'estudiantes', path: '/estudiantes', component: EstudianteAdminComp},
    {name:'promociones', path: '/promociones', component: PromocionAdminComp},
    {name:'cicloacademico/:idpromocion', path: '/cicloacademico/:idpromocion', component: CicloAcadAdminComp,props:true},
    {name:'asignarcurso/:idpromocion/:idciclo', path:'/asignarcurso/:idpromocion/:idciclo', component: AsigCursoAdminComp,props:true},
    {name:'evaluacion/:idpromocion/:idciclo/:idmatricula/:idasignatura', path:'/evaluacion/:idpromocion/:idciclo/:idmatricula/:idasignatura', component: EvaluarEstudiantedminComp,props:true},

  //JEFE DEPARTAMENTO
    {name:'asignardocente/:idpromocion', path: '/asignardocente/:idpromocion', component: AsigDocenteComp,props:true},


  ],
  mode:'history'
});

const app = new Vue({
    el: '#app',
    router:router,
    methods:{
      logout(){
        document.getElementById('logout-form').submit();
      }
    }
});