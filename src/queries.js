export var queryOperaciones = `SELECT * FROM roles WHERE rl_codigo LIKE '1.2.%' AND rl_codigo NOT LIKE '1.2.6%' 
AND rl_codigo NOT LIKE '1.2.17%'
AND rl_codigo NOT LIKE '1.2.11%' AND rl_codigo NOT LIKE '1.2.12%' AND rl_codigo NOT LIKE '1.2.13%' AND 
rl_codigo NOT LIKE '1.2.14%' AND rl_codigo NOT LIKE '1.2.15%' AND rl_codigo NOT LIKE '1.2.19%' 
AND rl_codigo NOT LIKE '1.2.2.%' AND rl_codigo NOT LIKE '1.2.1.%' AND rl_codigo NOT LIKE '1.2.1' 
AND rl_codigo NOT LIKE '1.2.2' AND rl_codigo NOT LIKE '1.2.20%' AND rl_codigo NOT LIKE '1.2.22%' 
AND rl_codigo NOT LIKE '1.2.3%' AND rl_codigo NOT LIKE '1.2.4%' AND rl_codigo NOT LIKE '1.2.5%' 
AND rl_codigo NOT LIKE '1.2.7%'`

export var queryMora = `SELECT * FROM roles WHERE rl_codigo LIKE '1.4.%' AND rl_codigo NOT LIKE '1.4.1.%' 
AND rl_codigo NOT LIKE '1.4.13%' AND rl_codigo NOT LIKE '1.4.9%' AND rl_codigo NOT LIKE '1.4.1'  
AND rl_codigo NOT LIKE '1.4.10' AND rl_codigo NOT LIKE '1.4.10.%'`

export var queryReportes = `SELECT * FROM roles WHERE rl_codigo LIKE '1.10.%' AND rl_codigo NOT LIKE '1.10.1%'
AND rl_codigo NOT LIKE '1.10.2%' AND rl_codigo NOT LIKE '1.10.3%' AND rl_codigo NOT LIKE '1.10.4%'
AND rl_codigo NOT LIKE '1.10.5%' AND rl_codigo NOT LIKE '1.10.6%' AND rl_codigo NOT LIKE '1.10.7%'
AND rl_codigo NOT LIKE '1.10.8%';`

export var queryEstructura = 'SELECT gerentes.`Activo` AS `ActivoGerentes`, sucursales.`Inactivo` AS `InactivoSucursales`, teamleader.`Inactivo` AS `InactivoTL`, vendedores.`Inactivo` AS `InactivoVendedores`, gerentes.`Codigo` AS `CodigoGerente`, gerentes.`Nombre` AS `NombreGerente`, sucursales.`Codigo` AS `CodigoSupervisor`, sucursales.`Nombre` AS `NombreSupervisor`, teamleader.`Codigo` AS `CodigoTL`, teamleader.`Nombre` AS `NombreTL`, vendedores.`Codigo` AS `CodigoVendedor`, vendedores.`Nombre` AS `NombreVendedor` FROM gerentes LEFT JOIN sucursales ON gerentes.`Codigo` = sucursales.`Gerente` LEFT JOIN teamleader ON sucursales.`Codigo` = teamleader.`Sucursal` LEFT JOIN vendedores ON teamleader.`Codigo` = vendedores.`TeamLeader`'

export var queryListasPrecios = 'SELECT listasprecios.`Codigo`,listasprecios.`Descripcion`,modelos.`Nombre`, modelos.`Codigo` AS `CodigoModelo`, precios.`Precio`, listasprecios.`VigenciaDesde`, listasprecios.`VigenciaHasta` FROM listasprecios LEFT JOIN precios ON precios.`Codigo` = listasprecios.`Codigo` LEFT JOIN modelos ON precios.`CodigoModelo` = modelos.`Codigo`'

export var queryModelosOnLista = 'SELECT modelos.Nombre, modelos.Codigo AS CodigoModelo, precios.Precio FROM listasprecios LEFT JOIN precios ON precios.Codigo = listasprecios.Codigo LEFT JOIN modelos ON modelos.Codigo = precios.CodigoModelo AND modelos.Marca = precios.Marca WHERE listasprecios.Codigo = ? AND listasprecios.Marca = ?'

export var queryGetTarjetasAltaPre = `SELECT pre_formaspago.Codigo, pre_formaspago.Nombre, pre_formaspago.SolicitaCtaBancaria, pre_formaspago.SolicitaNroCheque, 
pre_formaspago.CuentaContable, pre_formaspago.UsarEnMesaPlanesCompra, pre_formaspago.UsarEnMesaPlanesVta, pre_formaspago.UsarEnCompraProv, 
pre_formaspago.UsarEnMesaPlanesCostos, 
(CASE pre_formaspago.CuentaContable WHEN '' THEN '' ELSE c_plancuentas.CuentaSecundaria END) AS CtaSecundaria, pre_formaspago.C2, pre_formaspago.CtaDefCompraMP_C2, pre_formaspago.UsarEnHaberesNetosPagoVoucher, pre_formaspago.EsTarjeta, pre_formaspago.EsEfvo, 
pre_formaspago.UsarEnPreSolicitudes, pre_formaspago.SolicitaPreSolicitud, pre_formaspago.UsarEnCuotasRecuperoCobro, 
pre_formaspago.UsarEnCuotasRecuperoPago, pre_formaspago.EsGanancia, pre_formaspago.UsarEnMoraTecnicaCobro, 
pre_formaspago.UsarEnCobranzaFacturasGiama, pre_formaspago.BajaACuotaTerminal
FROM pre_formaspago
LEFT JOIN c_plancuentas ON c_plancuentas.Codigo = pre_formaspago.CuentaContable
`