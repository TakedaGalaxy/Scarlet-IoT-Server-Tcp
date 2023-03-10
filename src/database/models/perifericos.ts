import * as mysql2 from "mysql2/promise";
import { erroDB, sucessoCriarTabelaDB, sucessoDeletarTabelaDB, sucessoRelacaoTabelaDB } from "../funcoes-auxiliares";
import ModelInterface from "./interface";

export default class ModelPerifericos implements ModelInterface<TypePerifericosRes>{

  bancoRef: mysql2.Connection | undefined;

  constructor(bancoRef?: mysql2.Connection) {
    this.bancoRef = bancoRef;
  }

  async getDado() {
    const [rows] = await this.bancoRef?.query('SELECT * FROM `perifericos`') ?? [];
    return rows as TypePerifericosRes;
  }

  async criarTabela() {
    try {
      await this.bancoRef?.query(
        'CREATE TABLE `perifericos` (\n' +
        '`id` varchar(255) PRIMARY KEY,\n' +
        '`decricao` text,\n' +
        '`tipo_dado` varchar(255),\n' +
        '`controlavel` boolean)'
      );

      return sucessoCriarTabelaDB("perifericos");
    } catch (erro) { return erroDB(erro); }
  };

  async deletarTabela() {
    try {
      await this.bancoRef?.query('DROP TABLE `perifericos`');

      return sucessoDeletarTabelaDB('perifericos');
    } catch (erro) { return erroDB(erro); }
  }

  async criarReferencias() {
    try {
      await this.bancoRef?.query('ALTER TABLE `perifericos` ADD FOREIGN KEY (`tipo_dado`) REFERENCES `tiposDados` (`id`)');

      return sucessoRelacaoTabelaDB("perifericos");
    } catch (erro) {
      return erroDB(erro);
    }
  };

}

export type TypePeriferico = {
  id: string,
  decricao: string,
  tipo_dado: string,
  controlavel: boolean
}


export type TypePerifericosRes = Array<TypePeriferico>