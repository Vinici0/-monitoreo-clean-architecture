//TODO: el repositorio es como se va a llamar el data source, desde el repostiory se manda a llamar el data source

import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export abstract class LogRepository {
  abstract save(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
