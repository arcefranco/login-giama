import { Sequelize, DataTypes } from "sequelize";

export const pa7_cgConnection = new Sequelize(
  "pa7_cg",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);
export const pa7_elyseesConnection = new Sequelize(
  "pa7_elysees",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

export const pa7_autConnection = new Sequelize(
  "pa7_aut",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

export const pa7_alizzeConnection = new Sequelize(
  "pa7_alizze",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

export const pa7_chConnection = new Sequelize(
  "pa7_ch",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

export const pa7_detConnection = new Sequelize(
  "pa7_det",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

export const pa7_gfConnection = new Sequelize(
  "pa7_gf",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

export const pa7_gfLuxcarConnection = new Sequelize(
  "pa7_gf_luxcar",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

////MODELS PA7//////

////////GERENTE
const Gerente = pa7_cgConnection.define(
  "gerentes",
  {
    Codigo: {
      type: DataTypes.STRING,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    UsuarioAltaRegistro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inUpdate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Gerente.removeAttribute("id");

////////SUPERVISOR
const Supervisor = pa7_cgConnection.define(
  "sucursales",
  {
    Codigo: {
      type: DataTypes.STRING,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gerente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EsMiniEmprendedor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ValorPromedioMovil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Inactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Zona: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UsuarioAltaRegistro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inUpdate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Supervisor.removeAttribute("id");

/////////TEAM LEADER
const TeamLeader = pa7_cgConnection.define(
  "teamleader",
  {
    Codigo: {
      type: DataTypes.STRING,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    UsuarioAltaRegistro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
TeamLeader.removeAttribute("id");

//////VENDEDORES
const Vendedores = pa7_cgConnection.define(
  "vendedores",
  {
    Codigo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Vendedores.removeAttribute("id");

/* export const pa7gfConnection = new Sequelize('pa7_gf_test_2', process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT    
}) */

//MODELOS
const Modelos = pa7_cgConnection.define(
  "modelos",
  {
    Codigo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Modelos.removeAttribute("id");

/* ////////GERENTE
const GerenteGF = pa7gfConnection.define('gerentes', {
    Codigo: {
        type:DataTypes.STRING,
    },
    Nombre: {
       type:DataTypes.STRING,
       allowNull:false
   },
   Activo: {
       type:DataTypes.BOOLEAN,
       allowNull:false
   },
   UsuarioAltaRegistro: {
    type:DataTypes.STRING,
       allowNull:false
   },
   inUpdate: {
    type:DataTypes.STRING,
       allowNull:true
   }
},{
freezeTableName:true,
timestamps:false,
}) 
GerenteGF.removeAttribute('id')

////////SUPERVISOR
const  SupervisorGF = pa7gfConnection.define('sucursales', {
    Codigo: {
        type:DataTypes.STRING,
    },
    Nombre: {
       type:DataTypes.STRING,
       allowNull:false
   },
   Email: {
    type:DataTypes.STRING,
    allowNull:false
    },
    Gerente: {
        type:DataTypes.STRING,
        allowNull:false
        },
    EsMiniEmprendedor: {
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    ValorPromedioMovil: {
        type:DataTypes.STRING,
        allowNull:false
        },
   Inactivo: {
       type:DataTypes.BOOLEAN,
       allowNull:false
   },
   Zona: {
    type:DataTypes.STRING,
    allowNull:false
    },
    UsuarioAltaRegistro: {
        type:DataTypes.STRING,
           allowNull:false
       },
    inUpdate: {
    type:DataTypes.STRING,
        allowNull:true
    }

},{
freezeTableName:true,
timestamps:false,
})
SupervisorGF.removeAttribute('id') 


/////////TEAM LEADER
const TeamLeaderGF = pa7gfConnection.define('teamleader', {
    Codigo: {
        type:DataTypes.STRING,
    },
    Nombre: {
       type:DataTypes.STRING,
       allowNull:false
   },
   Activo: {
       type:DataTypes.BOOLEAN,
       allowNull:false
   },
   UsuarioAltaRegistro: {
    type:DataTypes.STRING,
       allowNull:false
   }
},{
freezeTableName:true,
timestamps:false,
}) 
TeamLeaderGF.removeAttribute('id')  

//////VENDEDORES
const VendedoresGF = pa7gfConnection.define('vendedores', {
    Codigo: {
        type:DataTypes.STRING,
    },
},{
freezeTableName:true,
timestamps:false,
}) 
VendedoresGF.removeAttribute('id')

//MODELOS
const ModelosGF = pa7gfConnection.define('modelos', {
    Codigo: {
        type:DataTypes.STRING,
    },
},{
freezeTableName:true,
timestamps:false,
}) 
ModelosGF.removeAttribute('id') 
 */
pa7_cgConnection.authenticate();
/* pa7gfConnection.authenticate() */
