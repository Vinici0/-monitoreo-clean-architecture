import { CheckService } from "./domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "./infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "./infrastructure/repositories/log.repository.impl";
import { CronService } from "./presentation/cron/cron-service";
import { Server } from "./presentation/cron/server";

(async () => {
  main();
})();

function main() {
  Server.start();
  CronService.createJob("*/2 * * * * *", () => {
    new CheckService(
      //Iyectamos el repositorio al caso de uso
      new LogRepositoryImpl(new FileSystemDataSource()),
      () => console.log("Success"),
      (error) => console.log(`Error: ${error}`)
    ).execute("https://www.google.com");
  });
}
