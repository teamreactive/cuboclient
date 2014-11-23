angular.module("crearlugar", ["crud"])
.controller("CrearLugarController", ["$scope", "$http", "service", function($scope, $http, service) {
	var url = "/api/v1/lugar/";
	$scope.secciones = secciones;
	$scope.ans = {};
	$scope.buttonaddcontacto = true;
	$scope.contactostatus = 0;
	$scope.lugar = {};
	$scope.lugar.contactos = [];
	$scope.contactos = [];
	$scope.contacto = {};

	$scope.getcontactos = function(){
			service.read("/api/v1/contacto/",function(status, data){
			if(status){
				$scope.contactos = data;
			} else{
				$scope.ans.msgcontacto = "Hubo un error cargando los contactos";
			}
		});
	};
	$scope.getcontactos();
	
	$scope.iscontactostatus = function(num){
		return $scope.contactostatus == num;
	};
	$scope.setcontactostatus = function(num){
		$scope.contactostatus = num;
	};
	
	$scope.addcontacto = function(){
		$scope.lugar.contactos.push($scope.contacto);
		deleteobj($scope.contactos,$scope.contacto);
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
var deleteobj = function(array, obj){
	var i = array.indexOf(obj);
	array.splice(i,1);
};
