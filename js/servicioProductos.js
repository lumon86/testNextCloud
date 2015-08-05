var app = angular.module("muestraJson",[]);

app.service("servicioProductos", function ($http, $q) 
{

	var deferred = $q.defer();
	$http.get('http://api-ecommerce-aws.next-cloud.mx/v1.0/bekko.next-cloud.mx/products').then(function (data){
		deferred.resolve(data);
	});

	this.getProductos = function(){
		return deferred.promise;
	}

})

app.service("servicioDescripciones", function ($http, $q) 
{

	var deferred = $q.defer();
	$http.get('http://api-ecommerce-aws.next-cloud.mx/v1.0/demo.next-cloud.mx/products').then(function (data){
		deferred.resolve(data);
	});

	this.getDescripciones = function(){
		return deferred.promise;
	}
})

.controller("muestraJsonCtr", function ($scope, servicioProductos, servicioDescripciones)
{
	
	var promise = servicioProductos.getProductos();
	var promise1 = servicioDescripciones.getDescripciones();
	var boton = this;
	$scope.productos = 0;
	$scope.descripciones = 0;
	$scope.arregloProductos=[];
	$scope.claseBoton="secondary";
	$scope.totalArreglo = 0;


	promise.then(function (data)
	{
		$scope.productos = data.data;
	})

	promise1.then(function (data)
	{
		$scope.descricpiones = data.data;
	})
	

	$scope.agregarAlCarrito = function(sku, seleccion){
		
			
		console.log("sku "+sku+" seleccion |"+seleccion+"|");

		if(seleccion!==true){
			console.log("entro");
			$scope.arregloProductos.push(sku);
		}
		else{
			var posicion = $scope.arregloProductos.indexOf(sku);
			console.log("posicion "+posicion);
			console.log("Arreglo antes de borrar "+$scope.arregloProductos);
			
			$scope.arregloProductos.splice(posicion,1);
			console.log("Arreglo DESPUES de borrar "+$scope.arregloProductos);
			
		}
		console.log("totalArreglo "+$scope.totalArreglo);
		$scope.totalArreglo = $scope.arregloProductos.length;

    };


});
