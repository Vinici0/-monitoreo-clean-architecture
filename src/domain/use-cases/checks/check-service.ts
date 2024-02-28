import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

//Se crea la interefaces para que otros programadores sepan que metodos se deben de implementar
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

//TODO: Utilizando la inyeccion de dependencias - cuando se un error o un exito se debe de llamar a una funcion
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    //TODO: Utilizando la inyeccion de dependencias
    private readonly logRepository: LogRepository,
    private successCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) {}

  //No se lo haces estatico por motivo que toca implementar una inyeccion de dependencias
  async execute(url: string): Promise<boolean> {
    const logOrigin = `check-service.ts`
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({message: `${url} is ok`, level: LogSeverityLevel.low, origin: logOrigin});
      this.logRepository.save(log);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({message: errorMessage, level: LogSeverityLevel.high, origin: logOrigin});
      this.logRepository.save(log);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
