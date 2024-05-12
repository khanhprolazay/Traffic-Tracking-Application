import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./logger/logger.service";
import { HttpClient } from "./clients/http-client";
import { SsoClient } from "./clients/sso-client";
import { FileUtil } from "./util/file.util";

@Global()
@Module({
  providers: [LoggerService, HttpClient, SsoClient, FileUtil],
  exports: [LoggerService, HttpClient, SsoClient, FileUtil]
})
export class GlobalModule {}