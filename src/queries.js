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