var app = angular.module("admingeneral",[]);

var clean = function(obj, attrs){
	for(var i =0; i<attrs.length; i++)
		obj[attrs[i]]= "";
};


app.controller("tabController",function(){
	this.tab = 1;
	this.setTab = function(tab){
		this.tab = tab;
	};
	this.isTab = function(tab){
		return this.tab == tab;
	};

});
app.controller("crearUsuarioController", ["$http",function($http){
	this.usuario = {};
	this.tipos = tipos_usuario;

	var controller = this;
	controller.clientes = [];

	$http({
		method: "GET",
		url: "/api/v1/cliente/",
		content_type: "application/json"
	})
	.success(function(data) {
		controller.clientes = data.objects;
	})
	.error(function() {
		// EMPTY
	});
	
	this.crearUsuario = function(){
		this.usuario.tipo = this.tipo.id;
		this.usuario.activo = 0;
		if (this.usuario.cliente)
			this.usuario.cliente = "/api/v1/cliente/"+this.cliente.id+"/";
		//validate contacto
		if (this.usuario){
			$http({
				method: "POST",
				url: "/api/v1/usuario/",
				data: controller.usuario,
				content_type: "application/json"
			})
			.success(function(data){
				alert("success :D");
				clean(controller.usuario,usuario_attrs);
				clean(controller.usuario.contacto,contacto_attrs);
				controller.password = "";
				controller.cliente = "";
				controller.tipo = "";
			})
			.error(function(data){
				alert("Ha ocurrido un error");
				console.log(data);
			});
		}
	};	
}]);

app.controller("actualizarUsuarioController", ["$http",function($http){
	var controller = this;
	controller.usuarios = [];
	$http({
		method: "GET",
		url: "/api/v1/usuario/",
		content_type: "application/json"
	}).success(function(data){
		controller.usuarios = data.objects;
	}).error(function(){

	});
	this.actualizarUsuario = function(){
		this.usuario.cliente = null;
		$http({
			method: "PUT",
			content_type: "application/json",
			url: "/api/v1/usuario/"+controller.usuario.id+"/",
			data: controller.usuario
		}).success(function(data){
			alert("super success");

		}).error(function(data){
			alert("error");
			console.log(data);
		});
	};

}]);
var tipos_usuario= [
		{"id" : "1","nombre" :"administrador_general"},
		{"id" : "2","nombre" :"administrador_cliente"},
		{"id" : "3","nombre" :"solicitante"},
		{"id" : "4","nombre" :"codificador"},
		{"id" : "5","nombre" :"aprobador_solicitudes"},
		{"id" : "6","nombre" :"comprador"},
		{"id" : "7","nombre" :"aprobador_compra"},
		{"id" : "8","nombre" :"almacenista"}
	];
var usuario_attrs = [
	"nombre",
	"password",
	"cliente",
	"tipo"
];
var contacto_attrs = [
	"nombre",
	"apellido",
	"telefono",
	"extension",
	"celular",
	"email",
	"cargo",
	"perfil"
]