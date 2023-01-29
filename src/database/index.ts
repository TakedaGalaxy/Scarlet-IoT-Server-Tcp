import * as dotenv from 'dotenv';
dotenv.config();
import * as mysql2 from 'mysql2/promise';
import ModelDadosRecebidos from './models/dados-recebidos';
import ModelDispositivosCriados from './models/dispositivos-criados';
import ModelModelos, { TypeModelosRes } from './models/modelos';
import ModelPrerifericos from './models/perifericos';
import ModelRelacaoModeloPeriferico from './models/relacao-modelo-periferico';

class BandoDeDados {

  bancoRef: mysql2.Connection | undefined

  host: string;
  user: string;
  password: string;
  database: string;


  constructor(
    host: string = "127.0.0.1",
    user: string = "root",
    password: string = "",
    database: string = "") {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
  }

  async iniciar() {
    this.bancoRef = await mysql2.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });
    console.log("Banco de dados iniciado !")
  }

  getModelos = async () => new ModelModelos(this.bancoRef).getDado();
  
  getPerifericos = async () => new ModelPrerifericos(this.bancoRef).getDado();

  getDispositivosCriados = async () => new ModelDispositivosCriados(this.bancoRef).getDado();

  getRelacaoModeloPeriferico = async () => new ModelRelacaoModeloPeriferico(this.bancoRef).getDado();

  getDadoRecebidos = async () => new ModelDadosRecebidos(this.bancoRef).getDado();

}

const bandoDeDados = new BandoDeDados(
  process.env.DB_HOST,
  process.env.DB_USUARIO,
  process.env.DB_SENHA,
  process.env.DB_NOME
);

export default bandoDeDados;