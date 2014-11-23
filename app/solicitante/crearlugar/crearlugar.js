angular.module("crearlugar", ["crud"])
.controller("CrearLugarController", ["$scope", "$http", "service", function($scope, $http, service) {
<<<<<<< HEAD
	
||||||| merged common ancestors

=======
	var url = "api/v1/lugar/";
	$scope.secciones = secciones;
	$scope.ans = {};
	$scope.buttonaddcontacto = true;
	$scope.contactostatus = 0;
	$scope.lugar = {};
	$scope.lugar.contactos = [];
	$scope.iscontactostatus = function(num){
		return $scope.contactostatus == num;
	};
	$scope.setcontactostatus = function(num){
		$scope.contactostatus = num;
	};
	$scope.getcontactos = function(){
		service.read("api/avi/contacto",function(status, data){
			if(status){
				$scope.contactos = data.objects;
			} else{
				$scope.ans.msgcontacto = "Hubo un error cargando los contactos";
			}
		});
	};
	$scope.addcontacto = function(){
		$scope.lugar.contactos.push($scope.contacto);
		$scope.contacto = {};
		$scope.setcontactostatus(0);
	};
	$scope.crear = function(){
		$scope.lugar.seccion = $scope.seccion.id;
		$scope.ans.msg = "Espere un momento porfavor...";
		service.create(url, $scope.lugar, function(status,data){
			if(status){
				$scope.ans.msg = "lugar creado exitosamente";
			} else 
				$scope.ans.msg = "ha ocurrido un error porfavor intentelo de nuevo";
		});
	};
>>>>>>> 3455854b480b9fbf7e0edfc631c6b2db7b338bc3
}])
.directive("crearlugar", function() {
	return {
		templateUrl: "crearlugar/crearlugar.html"
	};
});
var secciones = [
	{"id":"1","nombre":"avenida"},
	{"id":"2","nombre":"calle"},
	{"id":"3","nombre":"carrera"},
	{"id":"4","nombre":"diagonal"},
	{"id":"5","nombre":"transversal"}
];
