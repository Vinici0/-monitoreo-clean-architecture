import { CheckService } from "./domain/use-cases/checks/check-service";
import { CronService } from "./presentation/cron/cron-service";
import { Server } from "./presentation/cron/server";

(async () => {
  main();
})();

function main() {
  Server.start();
  CronService.createJob("*/2 * * * * *", () => {
    new CheckService(
        //Aqui en especifico se hace la inyeccion de dependencias
        () => console.log("Success"),
        (error) => console.log(`Error: ${error}`)
    ).execute("https://www.google.com");
  });

}
