//Se crea la interefaces para que otros programadores sepan que metodos se deben de implementar
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private successCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) {}

  //No se lo haces estatico por motivo que toca implementar una inyeccion de dependencias
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      this.successCallback();
      return true;
    } catch (error) {
      console.log(`${error}`);

      this.errorCallback(`${error}`);
      return false;
    }
  }
}
