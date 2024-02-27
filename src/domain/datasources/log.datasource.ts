//TODO: Va a obtener los origenes de datos, puede ser postgres, mysql, mongo, etc

import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export abstract class LogDataSource {
  abstract save(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}