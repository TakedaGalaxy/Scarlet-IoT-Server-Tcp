import net from "net";
import handlerConexao from "../client";
import Dispositivo from "../client/dispositivo/dispositivo-class";

export default class Servidor {
  servidorRef: net.Server;
  host: string;
  port: number;
  dispositivosConectados: Array<Dispositivo>

  constructor(host: string = "127.0.0.1", port: number = 8080) {
    this.host = host;
    this.port = port;
    this.servidorRef = net.createServer(handlerConexao);
    this.dispositivosConectados = [];
  }

  iniciar() {
    this.servidorRef.listen(this.port, this.host, undefined, () => {
      console.log(`🏁 Servidor iniciado em (${this.host}:${this.port}) !`);
    });
  }

  getDispositivosConectados() {
    return this.dispositivosConectados;
  }

  addDispositivo(dispositivoArg: Dispositivo) {
    this.dispositivosConectados.push(dispositivoArg);
    console.log(`(ADD) Dispositivos ${this.dispositivosConectados.map((d) => d.getIdModelo()) as Array<string>}`);
  }

  removeDispositivo(dispositivoArg: Dispositivo) {
    this.dispositivosConectados = this.dispositivosConectados.filter((dispositivo) => dispositivo.getIdModelo() !== dispositivoArg.getIdModelo());
    console.log(`(DEL) Dispositivos ${this.dispositivosConectados.map((d) => d.getIdModelo()) as Array<string>}`);
  }

  enviarDadoDispositivosConectados(dado: string, idPeriferico: string, modelo: string, id?: string) {

    if (modelo) {

      const dispositivosAlvos = this.dispositivosConectados.filter(
        id ?
          dispositivo => dispositivo.getId() === id :
          dispositivo => dispositivo.getModelo() === modelo);

      dispositivosAlvos.forEach((dispositivo) => {
        dispositivo.enviarDado(`IDP:${idPeriferico},DD:${dado}`);
      });

    }
  }

}