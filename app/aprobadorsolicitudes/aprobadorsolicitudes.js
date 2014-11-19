var app = angular.module("AprobadorDeSolicitudes",[]);

var makeArrayCopy = function(from_array) {
	newarray = [];
	for (var i=0; i<from_array.length; i++)
		newarray[i] = from_array[i];
	return newarray;
};

app.controller("tabController", function(){
	this.tab = 1;
	this.setTab = function(tab){
		this.tab = tab;
	};
	this.isTab = function(tab){
		return this.tab == tab;
	};
});

app.controller("mainController", function(){
	this.solicitudes = makeArrayCopy(solicitudes);
	this.aprobarSolicitud = function(solicitud){
		var i =this.solicitudes.indexOf(solicitud);
		this.solicitudes.splice(i,1);
	};
	this.rechazarSolicitud = function(solicitud){
		if(solicitud.estado == "en rechazo"){
			var i =this.solicitudes.indexOf(solicitud);
			this.solicitudes.splice(i,1);
			solicitud.estado = "rechazado";
		}
		else{
			solicitud.estado = "en rechazo";
		}
	};
	this.preguntarSolicitud = function(solicitud){
		if(solicitud.estado == "en pregunta"){
			var i =this.solicitudes.indexOf(solicitud);
			this.solicitudes.splice(i,1);
			solicitud.estado = "preguntada";
		}
		else{
			solicitud.estado = "en pregunta";
		}
	};
	this.aprobarSolicitud = function(solicitud){
		var i =this.solicitudes.indexOf(solicitud);
			this.solicitudes.splice(i,1);
			solicitud.estado = "aprobada";
	};
});
app.controller("historialTabController",function(){
	this.tab = 0;
	this.setTab = function(tab){
		this.tab = tab;
	};
	this.isTab = function(tab){
		return this.tab == tab;
	};
});
app.controller("historialController",function(){
	this.proyectos = proyectos;
	this.familiasProveedor = familiasProveedor;
	this.centroDeCostos = centroDeCostos;
	this.equipos = equipos;
	this.productos = productos;
	this.setGraphics = function(type){
		this.sumYear = 0;
		this.sumMonth = 0;
		this.sumPendientes = 0;
		if(type == "general"){
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month != currentDate.month)
					this.sumYear = this.sumYear + compras[i].precio;
			}
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month == currentDate.month)
					this.sumMonth = this.sumMonth + compras[i].precio;
			}
			for (var i = 0; i<solicitudes.length; i++){
				if(solicitudes[i].estado == "pendiente"){
					var productos = solicitudes[i].productos;
					for(var j = 0; j<productos.length; j++)
						this.sumPendientes = this.sumPendientes + productos[j].precioPromedio;
				}
			}
		}
		else if(type == "proyecto" && this.proyecto != undefined){
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month != currentDate.month && compras[i].proyecto === this.proyecto)
					this.sumYear = this.sumYear + compras[i].precio;
			}
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month == currentDate.month && compras[i].proyecto === this.proyecto)
					this.sumMonth = this.sumMonth + compras[i].precio;
			}
			for (var i = 0; i<solicitudes.length; i++){
				if(solicitudes[i].estado == "pendiente" && solicitudes[i].proyecto === this.proyecto){
					var productos = solicitudes[i].productos;
					for(var j = 0; j<productos.length; j++)
						this.sumPendientes = this.sumPendientes + productos[j].precioPromedio;
				}
			}
		}
		else if(type == "familiaProveedor" && this.familiaProveedor != undefined){
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month != currentDate.month && compras[i].producto.familiaProveedor === this.familiaProveedor)
					this.sumYear = this.sumYear + compras[i].precio;
			}
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month == currentDate.month && compras[i].producto.familiaProveedor === this.familiaProveedor)
					this.sumMonth = this.sumMonth + compras[i].precio;
			}
			for (var i = 0; i<solicitudes.length; i++){
				if(solicitudes[i].estado == "pendiente" ){
					var productos = solicitudes[i].productos;
					for(var j = 0; j<productos.length; j++)
						if(productos[j].familiaProveedor === this.familiaProveedor)
							this.sumPendientes = this.sumPendientes + productos[j].precioPromedio;
				}
			}
		}
		else if(type == "centroDeCostos" && this.centroDeCosto != undefined){
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month != currentDate.month && compras[i].centroDeCosto === this.centroDeCosto)
					this.sumYear = this.sumYear + compras[i].precio;
			}
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month == currentDate.month && compras[i].centroDeCosto === this.centroDeCosto)
					this.sumMonth = this.sumMonth + compras[i].precio;
			}
			for (var i = 0; i<solicitudes.length; i++){
				if(solicitudes[i].estado == "pendiente" && solicitudes[i].centroDeCosto === this.centroDeCosto){
					var productos = solicitudes[i].productos;
					for(var j = 0; j<productos.length; j++)
						this.sumPendientes = this.sumPendientes + productos[j].precioPromedio;
				}
			}
		}
		else if(type == "equipo" && this.equipo != undefined){
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month != currentDate.month && compras[i].equipo === this.equipo)
					this.sumYear = this.sumYear + compras[i].precio;
			}
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month == currentDate.month && compras[i].equipo === this.equipo)
					this.sumMonth = this.sumMonth + compras[i].precio;
			}
			for (var i = 0; i<solicitudes.length; i++){
				if(solicitudes[i].estado == "pendiente" && solicitudes[i].equipo === this.equipo){
					var productos = solicitudes[i].productos;
					for(var j = 0; j<productos.length; j++)
						this.sumPendientes = this.sumPendientes + productos[j].precioPromedio;
				}
			}
		}
		else if(type == "producto" && this.producto != undefined){
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month != currentDate.month && compras[i].producto === this.producto)
					this.sumYear = this.sumYear + compras[i].precio;
			}
			for (var i = 0; i<compras.length; i++){
				if(compras[i].fecha.year == currentDate.year && compras[i].fecha.month == currentDate.month && compras[i].producto === this.producto)
					this.sumMonth = this.sumMonth + compras[i].precio;
			}
			for (var i = 0; i<solicitudes.length; i++){
				if(solicitudes[i].estado == "pendiente" ){
					var productos = solicitudes[i].productos;
					for(var j = 0; j<productos.length; j++)
						if(productos[j] == this.producto)
						this.sumPendientes = this.sumPendientes + productos[j].precioPromedio;
				}
			}
		}
	};
});
var currentDate = {
	"month":12,
	"day":12,
	"year":2014,
}
var proyectos = [
			{
				"nombre": "Edificio"
			},
			{
				"nombre": "Autopista"
			},
			{
				"nombre": "Carretera"
			},
			{
				"nombre": "Bodega"
			}
];
var familiasProveedor = [
	{"nombre" : "Farmacia"},
	{"nombre" : "Papeleria"},
	{"nombre" : "Repuestos Excavadoras"},
	{"nombre" : "Herramientas"},
	{"nombre" : "Maquinaria"}
];

var unidades = [
	"kg",
	"m",
	"lb",
	"cm",
	"otra"
];

var productos = [
	{
		"nombre": "Taladro",
		"unidad": [unidades[0]],
		"familiaProveedor": familiasProveedor[3],
		"precioPromedio": 20000
	},
	{
		"nombre": "Martillo",
		"unidad": [unidades[0]],
		"familiaProveedor": familiasProveedor[3],
		"precioPromedio": 21000
	},
	{
		"nombre": "Remolque",
		"unidad": [unidades[1]],
		"familiaProveedor": familiasProveedor[4],
		"precioPromedio": 56000

	},
	{
		"nombre": "Excavadora",
		"unidad": [unidades[2]],
		"familiaProveedor": familiasProveedor[4],
		"precioPromedio": 67000
	},
	{
		"nombre": "Cinta",
		"unidad": [unidades[1]],
		"familiaProveedor": familiasProveedor[1],
		"precioPromedio": 56000
	}
];

var solicitudes = [
	{
		"lugar": "Casa | Avenida 15 #68 - 14",
		"proyecto": proyectos[0],
		"fecha": "01-01-2015",
		"productos": [
			productos[0],
			productos[4],
			productos[3]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Oficina | Carrera 23 #124 - 23",
		"proyecto": productos[1],
		"fecha": "02-11-2015",
		"productos": [
			productos[2],
			productos[1]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Casa | Avenida 15 #68 - 14",
		"proyecto": productos[1],
		"fecha": "02-14-2015",
		"productos": [
			productos[1],
			productos[3]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Bodega | Carrera 9  # 28 - 65",
		"proyecto": proyectos[0],
		"fecha": "12-12-2015",
		"productos": [
			productos[4],
			productos[3]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Apartamento | Calle 166 #8H - 53",
		"proyecto": proyectos[0],
		"fecha": "12-03-2015",
		"productos": [
			productos[0],
			productos[4]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Apartamento | Calle 166 #8H - 53",
		"proyecto": proyectos[2],
		"fecha": "09-10-2015",
		"productos": [
			productos[0],
			productos[2]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Oficina | Carrera 23 #124 - 23",
		"proyecto": proyectos[2],
		"fecha": "05-01-2015",
		"productos": [
			productos[4],
			productos[2]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Almacen | Avenida 11 #231 - 44",
		"proyecto": proyectos[3],
		"fecha": "05-05-2015",
		"productos": [
			productos[2],
			productos[1]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Almacen | Avenida 11 #231 - 44",
		"proyecto": proyectos[3],
		"fecha": "11-04-2015",
		"productos": [
			productos[3],
			productos[1]
		],
		"estado" : "pendiente"
	},
	{
		"lugar": "Almacen | Avenida 11 #231 - 44",
		"proyecto": proyectos[3],
		"fecha": "12-07-2015",
		"productos": [
			productos[2],
			productos[1]
		],
		"estado" : "pendiente"
	}
];

var centroDeCostos = [
			{
				"nombre": "Centro de papeleria"
			},
			{
				"nombre": "Centro de ferreteria"
			},
			{
				"nombre": "Centro de farmacia"
			}
];
var equipos = [
			{
				"nombre": "Centro de papeleria"
			},
			{
				"nombre": "Centro de ferreteria"
			},
			{
				"nombre": "Centro de farmacia"
			}
];
var compras = [
	{
		"producto": productos[0],
		"precio": 300000,
		"fecha": {
			"month": 01,
			"year": 2014,
			"day": 01
		},
		"proyecto": proyectos[0]
	},
	{
		"producto": productos[1],
		"precio": 450000,
		"fecha": {
			"month": 12,
			"year": 2014,
			"day": 03
		},
		"proyecto": proyectos[0]
	},
	{
		"producto": productos[0],
		"precio": 3670000,
		"fecha": {
			"month": 12,
			"year": 2013,
			"day": 03
		},
		"proyecto": proyectos[0]
	},
	{
		"producto": productos[1],
		"precio": 3000,
		"fecha": {
			"month": 05,
			"year": 2014,
			"day": 12
		},
		"proyecto": proyectos[1]
	},
	{
		"producto": productos[0],
		"precio": 890000,
		"fecha": {
			"month": 06,
			"year": 2011,
			"day": 02
		},
		"proyecto": proyectos[1]
	},
	{
		"producto": productos[0],
		"precio": 30000,
		"fecha": {
			"month": 05,
			"year": 2014,
			"day": 31
		},
		"proyecto": proyectos[3]
	},
	{
		"producto": productos[0],
		"precio": 980000,
		"fecha": {
			"month": 08,
			"year": 2013,
			"day": 31
		},
		"centroDeCosto": centroDeCostos[2]
	},
	{
		"producto": productos[0],
		"precio": 230000,
		"fecha": {
			"month": 02,
			"year": 2014,
			"day": 14
		},
		"centroDeCosto": centroDeCostos[1]
	},
	{
		"producto": productos[0],
		"precio": 210000,
		"fecha": {
			"month": 06,
			"year": 2014,
			"day": 12
		},
		"centroDeCosto": centroDeCostos[0]
	},
	{
		"producto": productos[0],
		"precio": 56000,
		"fecha": {
			"month": 12,
			"year": 2014,
			"day": 31
		},
		"centroDeCosto": centroDeCostos[1]
	},
	{
		"producto": productos[0],
		"precio": 60000,
		"fecha": {
			"month": 05,
			"year": 2014,
			"day": 31
		},
		"equipo": equipos[0]
	},
	{
		"producto": productos[0],
		"precio": 760000,
		"fecha": {
			"month": 05,
			"year": 2014,
			"day": 31
		},
		"equipo": equipos[2]
	},
	{
		"producto": productos[0],
		"precio": 50000,
		"fecha": {
			"month": 05,
			"year": 2014,
			"day": 31
		},
		"equipo": equipos[1]
	},
	{
		"producto": productos[0],
		"precio": 23000,
		"fecha": {
			"month": 05,
			"year": 2014,
			"day": 31
		},
		"equipo": equipos[0]
	}
];




