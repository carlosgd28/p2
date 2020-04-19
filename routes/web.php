<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::auth();

Route::get('/', function () {
    return view('welcome');
});
Route::get('/prueba', function () {
    return view('prueba');
});


Route::get('/sistema', 'HomeController@index');

//----INICIO ACADEMIA------///

	//----------------año academico-------------
	Route::post('/nuevopromocion', 'CicloAcademicoController@Nuevo');
	Route::get('/getpromociones', 'CicloAcademicoController@Get');
	Route::post('/getaniacademico', 'CicloAcademicoController@GetById');
	//----------------fin año academico----------



	//-----------INICIO PERSONA------------
	Route::get('/obtenerpersona', 'PersonaController@Obtener');
	Route::post('/nuevopersona', 'PersonaController@Nuevo');
	Route::post('/modificarpersona', 'PersonaController@Modificar');
	Route::post('/buscarpersona', 'PersonaController@Buscar');
	Route::post('/consultarpersona', 'PersonaController@Consultar');
	Route::post('/desactivarallpersona', 'PersonaController@Desactivar');
	Route::post('/activarallpersona', 'PersonaController@Activar');
	//-----------FIN PERSONA................z



	//-----------INICIO MATERIA CICLO ACADEMICO
	Route::post('/asignardocentecurso', 'MateriaCAController@Nuevo');
	Route::get('/getcursosasignadoscargo', 'MateriaCAController@GetCursando');
	Route::post('/getdatosasignatura', 'MateriaCAController@GetDatosAsignatura');
	Route::get('/actanotaspdf/{id}/{idciclo}', 'MateriaCAController@GenerarActaPdf');
	//------------FIN  MATERIA CICLO ACADEMICO


	//-----------INICIO MATERIA HORARIO
	Route::post('/registrarhorario', 'HorarioController@Nuevo');
	//------------FIN  MATERIA HORARIO


	//-----------INICIO MATRICULA
	Route::post('/nuevomatricula', 'MatriculaController@Nuevo');//si
	Route::post('/getevaluacionmatricula', 'MatriculaController@GetEvaluacion');//si
	Route::post('/registrarnotamatricula', 'MatriculaController@RegistrarEvaluacion');//si
	Route::post('/registrarnotamodulo', 'MatriculaController@RegistrarNotaModulo');//si
	Route::post('/getmateriacursando', 'MatriculaController@GetMateria');//si
	Route::post('/registrarnotaasignatura', 'MatriculaController@RegistrarNotaMateria');//si
	Route::get('/getmatricula', 'MatriculaController@Get');//si
	Route::post('/getmodulosmatricula', 'MatriculaController@GetModulos');
	Route::post('/getdatosestudiantematricula', 'MatriculaController@GetDatosEstudiante');
	Route::post('/getespecialistasmatriculados', 'MatriculaController@GetMatriculadosMateria');//si

	
	//------------FIN  MATRICULA

	//---------------INICIO MODULO ------
	Route::post('/nuevomodulo', 'ModuloController@Nuevo');//si
	Route::post('/getmodulos', 'ModuloController@GetAll');//si
	Route::post('/modificarmodulo', 'ModuloController@Modificar');//si
	Route::post('/activarmodulo', 'ModuloController@Activar');//si
	Route::post('/desactivarmodulo', 'ModuloController@Inactivar');//si
	//-----------------FIN MODULO -------


	//---------------INICIO AREA CONOCIMIENTO ------
	
	Route::post('/getareasconocimiento', 'AreaConocimientoController@GetByModulo');//si
	Route::post('/getareasconocimientobymodulo', 'AreaConocimientoController@GetByModuloArea');//si

	Route::post('/getareasconocimientobyanio', 'AreaConocimientoController@GetByModuloByAnio');//si
	Route::post('/nuevoarea', 'AreaConocimientoController@Nuevo');//si
	Route::post('/modificararea', 'AreaConocimientoController@Modificar');//si
	Route::post('/activararea', 'AreaConocimientoController@Activar');//si
	Route::post('/desactivararea', 'AreaConocimientoController@Inactivar');//si
	Route::post('/getdocentebyarea', 'AreaConocimientoController@GetDocentes');//si
	Route::post('/asignardocentearea', 'AreaConocimientoController@AsignarDocenteArea');//si
	Route::post('/descartardocenteanio', 'AreaConocimientoController@DescartarDocente');//si
	Route::post('/descartarhorarioanio', 'AreaConocimientoController@DescartarHorario');//si
	Route::post('/getasignaturadocente', 'AreaConocimientoController@GetAsignaturaDocente');//si
	Route::post('/getcontenidobyidarea', 'AreaConocimientoController@GetContenidoByArea');//si
	Route::post('/habilitarcontenido', 'AreaConocimientoController@HabilitarContenido');//si
	Route::post('/habilitarevaluacion', 'AreaConocimientoController@HabilitarEvaluacion');//si
	Route::post('/getcontenidoevaluacion', 'AreaConocimientoController@GetContenidoEvaluacion');//si
	Route::post('/registrarevaluacionespecialista', 'AreaConocimientoController@RegistrarEvaluacion');//si
	Route::post('/searchmatriculadosdocente', 'AreaConocimientoController@SearchMatriculadosDocente');//si
	Route::post('/registrarnotaaca', 'AreaConocimientoController@RegistrarNotaAca');//si
	Route::post('/registrarexamenfinal', 'AreaConocimientoController@RegistrarExamenFinal');//si

	
	Route::post('/gethorarioasignatura', 'AreaConocimientoController@GetHorario');//si
	Route::post('/descartarcontenidoareaconocimiento', 'AreaConocimientoController@DescartarContenido');//si
	Route::post('/descartarevaluacion', 'AreaConocimientoController@DescartarEvaluacion');//si
	Route::post('/culminarcursoasignado', 'AreaConocimientoController@ArchivarContenidoAsignado');//si
	Route::post('/activarcursoasignado', 'AreaConocimientoController@ActivarContenidoAsignado');//si


	Route::get('/actanotaspdf/{iddocentearea}', 'AreaConocimientoController@ActaNotaPdf');//si
	Route::get('/seguimientomodulo/{idpromocion}/{idmodulo}', 'AreaConocimientoController@SeguimientoPdf');//si
	Route::get('/actanotasexamfinal/{idpromocion}/{idmodulo}', 'AreaConocimientoController@ActaExamenFinalPdf');//si
	Route::get('/actanotasacapdf/{idpromocion}/{idmodulo}', 'AreaConocimientoController@ActaAcaPdf');//si
	Route::get('/descargarexcel/{idpromocion}', 'AreaConocimientoController@CuadroGeneralPdf');//si
	//-----------------FIN AREA CONOCIMIENTO  -------

	
	//---------------INICIO CONTENIDO ------
	Route::post('/getcontenido', 'ContenidoController@GetByArea');//si
	Route::post('/nuevocontenido', 'ContenidoController@Nuevo');//si
	Route::post('/modificarcontenido', 'ContenidoController@Modificar');//si
	Route::post('/activarcontenido', 'ContenidoController@Activar');//si
	Route::post('/desactivarcontenido', 'ContenidoController@Inactivar');//si

	//-----------------FIN CONTENIDO-------




	//-----------INICIO EVALUACION
	Route::post('/getevaluacion', 'EvaluacionController@Get');
	Route::post('/registrarevaluacion', 'EvaluacionController@Nuevo');

	//------------FIN  EVALUACION


	




	//-----------INICIO AUDITORIA
	Route::post('/getauditoria', 'AuditoriaController@Get');
	Route::post('/getauditoriabydate', 'AuditoriaController@GetByDate');
	//------------FIN AUDITORIA



	//----------------INICIO USUARIO
	Route::post('/getusuarios', 'PersonaController@GetUser');
	//----------------FIN USUARIO

//----FIN ACADEMIA------///

Route::get('/{vue_capture?}', function () {
   return view('home');
 })->where('vue_capture', '[\/\w\.-]*');	


Auth::routes();


