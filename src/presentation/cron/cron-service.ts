import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

//Esto no es un caso de uso, por motivo que no tiene logica de negocio y no se comunica con el exterior
export class CronService {
  //En Clean Code cuando se tiene mas de 3 parametros se debe de crear un objeto para pasar los parametros
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
