var app = angular.module("Comprador",[]);

/** 
 * ################################################ 
 * ################# AUX FUNCS ####################
 * ################################################
**/

var makeCopy = function(from_obj, to_obj, attrs) {
	if (attrs !== undefined){
		for (var i = 0; i < attrs.length; i++)
			to_obj[attrs[i]] = from_obj[attrs[i]];
	}

	else if (to_obj !== undefined) {
		for (var key in from_obj)
			to_obj[key] = from_obj[key];
	}

	else {
		var new_obj = {}
		for (var key in from_obj)
			new_obj[key] = from_obj[key];
		return new_obj;
	}
};

var makeArrayCopy = function(from_array) {
	newarray = [];
	for (var i=0; i<from_array.length; i++)
		newarray[i] = from_array[i];
	return newarray;
};

var cleanObj = function(obj) {
	for (var key in obj)
		obj[key] = "";
};

var keyOfObject = function(obj, in_obj) {
	for (var i in in_obj)
		if(obj === in_obj[i] )
			return i;
};
var removeObj = function(obj, in_obj){
	var i = keyOfObject(obj,in_obj);
	in_obj.splice(i,1);
};
var getObjId = function(obj, in_array){
	for (var i = 0; i<in_array.length; i++)
		if (obj === in_array[i])
			return i;
	return -1;
};
var nameCheck = function(obj, obj_array, attrs){
	for(var i = 0; i<obj_array.length; i++)
		for (var j=0; j< attrs.length; j++)
			if (obj[attrs[j]] == obj_array[attrs[j]].nombre)
				return false;
	return true;
};

/** 
 * ################################################ 
 * ################## ANGULAR  ####################
 * ################################################
**/

//----------services------//
 app.service("sharedVars",function(){
	this.menuTab = {"value":0};
	this.getMenuTab = function(){
		return this.menuTab;
	};
	this.mainTab = {"value":6};
	this.getMainTab = function(){
		return this.mainTab;
	};
 });
 app.service("cotizarSolicitudService",function(){
	this.vars = {}; 
	this.setSolicitud = function(solicitud){
		this.vars.solicitud = solicitud;

	};	
 });
//-----------------------//
 //-------------------//
app.controller("menuTabController",function(sharedVars,cotizarSolicitudService){
	this.tab = sharedVars.getMenuTab();
	this.setTab = function(tab){
		this.tab["value"] = tab;
	};
	this.isTab = function(tab){
		return this.tab["value"] == tab;
	};
});

app.controller("mainTabController",function(sharedVars){
	this.tab = sharedVars.getMainTab();
	this.setTab = function(tab){
		this.tab["value"] = tab;
	};
	this.isTab = function(tab){
		return sharedVars.getMainTab()["value"] == tab;
	};
});

app.controller("mainController",["$http",function($http,sharedVars,cotizarSolicitudService){
	this.getSolicitudesPendientes = function(){
		var solicitudesPendientes = [];
		for (var i=0; i<solicitudes.length; i++){
			var solicitud = {};
			var estado = solicitudes[i].estado;
			if(estado == "pendiente" || estado == "parcialmente cotizada"){
				this.getProductosXSolicitud(solicitudes[i]);
				solicitudesPendientes.push(solicitudes[i]);
			}
		}
		return solicitudesPendientes;
	};
	this.getProductosXSolicitud = function(solicitud){
		solicitud.productoXSolicitud = [];
		for (var i=0; i<productoXSolicitud.length; i++){
			if(solicitud == productoXSolicitud[i].solicitud){
				solicitud.productoXSolicitud.push(productoXSolicitud[i]);
			}
		}
	};
	this.solicitudes = this.getSolicitudesPendientes();
	this.proveedores = proveedores;
	this.contactos = contactos;
	this.productos = productos;
	this.familiasProveedor = familiasProveedor;
	this.realizarCotizacion = {};
	this.realizarCotizacion.proveedores = [];
	// GET JSON DATA//
	$http({
		method: "GET",
		url: "/api/v1/proveedor",
		content_type: "application/json"
	}).success(function(data){
		this.proveedores = proveedores;
	}).error(function(data){
		// EMPTY
	});
	//--------------//
	this.crearProveedor = function() {
		var proveedor = {};
		makeCopy(this.crearProveedorForm,proveedor,proveedor_attrs);
		proveedor = {
			"razon": "futer",
			"sigla": "FT",
			"nit": "343940",
			"verificacion": "e0e9r",
			"lugar": "1",
			"logo": "",
			"cliente": "1",
			"calificacion": "",
			"cotizacion": "",
		};
		// validate proveedor
		if( true == true){   
			$http({
				method: "POST",
				url: "/api/v1/proveedor/",
				data: proveedor,
				content_type: "application/json"
			}).success(function(data){
				cleanObj(this.crearProveedorForm);
				this.proveedores.push(proveedor);	
			}).error(function(data){
				this.crearProveedorForm.error = data;
				console.log(data);
			});
			
		}
		
	};

	this.getProveedor = function() {
		if(this.actualizarProveedorForm.proveedor !== undefined) {
			var proveedor = this.actualizarProveedorForm.proveedor;
			makeCopy(proveedor,this.actualizarProveedorForm)
		}
	};

	this.actualizarProveedor = function(){
		if(this.actualizarProveedorForm.proveedor !== undefined) {
			var proveedor = this.actualizarProveedorForm.proveedor;
			makeCopy(this.actualizarProveedorForm,proveedor,proveedor_attrs);
			cleanObj(this.actualizarProveedorForm);
		}
	};

	this.crearContacto = function() {
		var contacto = makeCopy(this.crearContactoForm);
		this.contactos.push(contacto);
		cleanObj(this.crearContactoForm);
	};

	this.getContacto = function() {
		if(this.actualizarContactoForm.contacto !== undefined) {
			var contacto = this.actualizarContactoForm.contacto;
			this.actualizarContactoForm = makeCopy(contacto);
			this.actualizarContactoForm.contacto = contacto;
		}
	};

	this.actualizarContacto = function() {
		if(this.actualizarContactoForm.contacto !== undefined) {
			var contacto = this.actualizarContactoForm.contacto;
			makeCopy(this.actualizarContactoForm,contacto,contacto_attrs);
			cleanObj(this.actualizarContactoForm);
		}
	};

	this.insertarProveedorRealizarCotizacion = function(proveedor) {
		this.realizarCotizacion.proveedores.push(proveedor);
	};

	this.quitarProveedorRealizarCotizacion = function(proveedor) {
		var i = this.realizarCotizacion.proveedores.indexOf(proveedor);
		if (i != -1) this.realizarCotizacion.proveedores.splice(i,1);
	};

	this.cleanRealizarCotizacion = function() {
		cleanObj(this.realizarCotizacion);
		this.realizarCotizacion.proveedores = [];
	};

	this.cotizarSolicitud = function(solicitud) {
		cotizarSolicitudService.setSolicitud(solicitud);
	};

	this.quitarContactoRealizarCotizacionXSolicitud = function(cotizacion, contacto) {
		var contactos = cotizacion.contactos;
		var i = contactos.indexOf(contacto);
		contactos.splice(i,1);
	};

	this.realizarCotizacionRealizarCotizacionXSolicitud = function(cotizacion) {
		var cotizaciones = this.realizarCotizacionXSolicitud.cotizaciones;
		var i = keyOfObject(cotizacion,cotizaciones);
		cotizaciones.splice(i,1);
		var j = keyOfObject(cotizacion,this.realizarCotizacionXSolicitud.solicitud.productos)
		var producto = this.realizarCotizacionXSolicitud.solicitud.productos[j];
		producto.estado = "cotizado";
		if(cotizaciones.length == 0)
			sharedVars.getMainTab()["value"] = 5;
			var solicitud = this.realizarCotizacionXSolicitud.solicitud;
			removeObj(solicitud,this.solicitudes);
			solicitud.estado = "cotizada";
	};
	this.insertarContactoRealizarCotizacionXSolicitud = function(cotizacion){
		cotizacion.contactos.push(cotizacion.nuevoContacto);
		cotizacion.nuevoContacto = "";
	};
	
}]);
app.controller("cotizarSolicitudController",function(cotizarSolicitudService){
	this.vars = cotizarSolicitudService.vars;

	this.quitarContacto = function(cotizacion, contacto) {
		var contactos = cotizacion.contactos;
		var i = contactos.indexOf(contacto);
		contactos.splice(i,1);
	};

	this.realizarCotizacion = function(cotizacion) {
		var cotizaciones = this.cotizaciones;
		var i = keyOfObject(cotizacion,cotizaciones);
		cotizaciones.splice(i,1);
		var j = keyOfObject(cotizacion,this.realizarCotizacionXSolicitud.solicitud.productos)
		var producto = this.realizarCotizacionXSolicitud.solicitud.productos[j];
		producto.estado = "cotizado";
		if(cotizaciones.length == 0)
			sharedVars.getMainTab()["value"] = 5;
			var solicitud = this.realizarCotizacionXSolicitud.solicitud;
			removeObj(solicitud,this.solicitudes);
			solicitud.estado = "cotizada";
	};

});

app.controller("realizarCotizacionController",function() {
	this.proveedores = proveedores.slice(0);

	this.insertarProveedor = function() {
		var i = this.proveedores.indexOf(this.proveedor);
		if (i != -1) this.proveedores.splice(i,1);
	};

	this.quitarProveedor = function(proveedor) { this.proveedores.push(proveedor); };

	this.clean = function() {
		cleanObj(this);
		this.proveedores = proveedores.slice(0);
	};
});

/** 
 * ################################################ 
 * ################# TEST DATA ####################
 * ################################################
**/

var familiasProveedor = [
	"Farmacia",
	"Papeleria",
	"Repuestos Excavadoras",
	"Herramientas",
	"Maquinaria"
];

var unidades = [
	{"nombre":"kg"},
	{"nombre":"m"},
	{"nombre":"lb"},
	{"nombre":"cm"},
	{"nombre":"otra"}
];

var productos = [
	{
		"nombre": "Taladro",
		"unidad": unidades[0],
		"familiaProveedor": familiasProveedor[3]
	},
	{
		"nombre": "Martillo",
		"unidad": unidades[0],
		"familiaProveedor": familiasProveedor[3]
	},
	{
		"nombre": "Remolque",
		"unidad": unidades[1],
		"familiaProveedor": "Maquinaria"
	},
	{
		"nombre": "Excavadora",
		"unidad": unidades[2],
		"familiaProveedor": familiasProveedor[4]
	},
	{
		"nombre": "Cinta",
		"unidad": unidades[1],
		"familiaProveedor": familiasProveedor[1]
	}
];

var solicitudes = [
	{
		"lugar": "Casa | Avenida 15 #68 - 14",
		"proyecto": "Edificio",
		"fecha": "01-01-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Oficina | Carrera 23 #124 - 23",
		"proyecto": "Autopista",
		"fecha": "02-11-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Casa | Avenida 15 #68 - 14",
		"proyecto": "Autopista",
		"fecha": "02-14-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Bodega | Carrera 9  # 28 - 65",
		"proyecto": "Edificio",
		"fecha": "12-12-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Apartamento | Calle 166 #8H - 53",
		"proyecto": "Edificio",
		"fecha": "12-03-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Apartamento | Calle 166 #8H - 53",
		"proyecto": "Casa",
		"fecha": "09-10-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Oficina | Carrera 23 #124 - 23",
		"proyecto": "Casa",
		"fecha": "05-01-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Almacen | Avenida 11 #231 - 44",
		"proyecto": "Hangar",
		"fecha": "05-05-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Almacen | Avenida 11 #231 - 44",
		"proyecto": "Hangar",
		"fecha": "11-04-2015",
		"estado" : "pendiente"
	},
	{
		"lugar": "Almacen | Avenida 11 #231 - 44",
		"proyecto": "Hangar",
		"fecha": "12-07-2015",
		"estado" : "pendiente"
	}
];
var productoXSolicitud = [
	{
		"solicitud":solicitudes[0],
		"producto":productos[0],
		"cantidad":12,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[0],
		"producto":productos[1],
		"cantidad":1,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[1],
		"producto":productos[2],
		"cantidad":2,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[1],
		"producto":productos[3],
		"cantidad":4,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[2],
		"producto":productos[4],
		"cantidad":6,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[3],
		"producto":productos[0],
		"cantidad":45,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[4],
		"producto":productos[1],
		"cantidad":9,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[5],
		"producto":productos[2],
		"cantidad":12,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[6],
		"producto":productos[3],
		"cantidad":11,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[6],
		"producto":productos[4],
		"cantidad":43,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[7],
		"producto":productos[1],
		"cantidad":67,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[7],
		"producto":productos[0],
		"cantidad":91,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[8],
		"producto":productos[2],
		"cantidad":10,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[9],
		"producto":productos[3],
		"cantidad":39,
		"estado":"pediente"
	},
	{
		"solicitud":solicitudes[9],
		"producto":productos[4],
		"cantidad":34,
		"estado":"pediente"
	}
];

var proveedores = [
	{
		"razon_social": "cementos mx",
		"sigla": "cmx",
		"nit": "ADF55866",
		"numero_verificacion": "3403055",
		"lugar": "Casa | Avenida 15 #68 - 14",
		"logo": ""
	},
	{
		"razon_social": "tornimax",
		"sigla": "tnx",
		"nit": "ASD234534",
		"numero_verificacion": "3394955",
		"lugar": "Apartamento | Avenida 15 #38 - 14",
		"logo": ""
	},
	{
		"razon_social": "duraplex",
		"sigla": "dpx",
		"nit": "SDF4495968",
		"numero_verificacion": "32049099",
		"lugar": "Casa | Calle 15 #68 - 14",
		"logo": ""
	},
	{
		"razon_social": "electrofin",
		"sigla": "elf",
		"nit": "NUKI46756",
		"numero_verificacion": "398348493",
		"lugar": "Casa | Calle 167 #76 - 23",
		"logo": ""
	}
];

var proveedor_attrs = [
	"razon_social",
	"sigla",
	"nit",
	"numero_verificacion",
	"lugar",
	"logo"
];

var contactos = [
	{
		"nombre": "Laura",
		"apellido": "Perez",
		"proveedor": proveedores[0],
		"familiaProveedor": familiasProveedor[1],
		"extension": "1",
		"telefono_fijo": "4556765",
		"celular": "3143454565",
		"correo": "LauP@gmail.com",
		"cargo": "Gerente",
		"perfil": "Alto"
	},
	{
		"nombre": "Maria",
		"apellido": "Ruelas",
		"proveedor": proveedores[1],
		"familiaProveedor": familiasProveedor[3],
		"extension": "23",
		"telefono_fijo": "3423456",
		"celular": "312445667",
		"correo": "Mruelas@hotmail.com",
		"cargo": "Empleado",
		"perfil": "Bajo"
	},
	{
		"nombre": "Sandra",
		"apellido": "Sanchez",
		"proveedor": proveedores[2],
		"familiaProveedor": familiasProveedor[3],
		"extension": "32",
		"telefono_fijo": "9896345",
		"celular": "321559588",
		"correo": "Sanchez321@yahoo.com",
		"cargo": "Contador",
		"perfil": "Medio"
	},
	{
		"nombre": "Juan",
		"apellido": "Velazco",
		"proveedor": proveedores[3],
		"familiaProveedor": familiasProveedor[1],
		"extension": "22",
		"telefono_fijo": "1234345",
		"celular": "323459566",
		"correo": "Juanchito60@hotmail.com",
		"cargo": "Abogado",
		"perfil": "Alto"
	},
	{
		"nombre": "Manuel",
		"apellido": "Vivas",
		"proveedor": proveedores[0],
		"familiaProveedor": familiasProveedor[4],
		"extension": "11",
		"telefono_fijo": "2332345",
		"celular": "323049588",
		"correo": "vivisimo@gour.edu.co",
		"cargo": "Ingeniero",
		"perfil": "Super Bajo"},
];

var contacto_attrs = [
	"familiaProveedor",
	"proveedor",
	"nombre",
	"apellido",
	"extension",
	"telefono_fijo",
	"celular",
	"correo",
	"cargo",
	"perfil"
];
var proveedor_attrs = [
	"razon",
	"sigla",
	"nit",
	"verificacion",
	"lugar",
	"logo",
	"cliente",
	"calificacion",
	"cotizacion",
	"contactos"
];


