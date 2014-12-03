angular.module("routes", [])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/admingeneral', {
		templateUrl: 'admingeneral/admingeneral.html'
	});
}])


    <li><a href="#/almacenista">almacenista</a></li>
    <li><a href="#/aprobadorcompras">aprobadorcompras</a></li>
    <li><a href="#/aprobadorsolicitudes">aprobadorsolicitudes</a></li>
    <li><a href="#/codificador">codificador</a></li>
    <li><a href="#/comprador">comprador</a></li>
    <li><a href="#/login">login</a></li>
    <li><a href="#/recepcionista">recepcionista</a></li>
    <li><a href="#/solicitante">solicitante</a></li>