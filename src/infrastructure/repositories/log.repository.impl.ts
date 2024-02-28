//TODO: el repositorio es como se va a llamar el data source, desde el repostiory se manda a llamar el data source

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(
    private readonly logDatasource: LogDataSource 
  ) {}
  
  save(log: LogEntity): Promise<void> {
    return this.logDatasource.save(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
