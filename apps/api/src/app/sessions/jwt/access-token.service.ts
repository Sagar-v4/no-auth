import { StringValue } from "ms";
import { Injectable, Logger } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

import { EnvService } from "@/env/env.service";
import {
  AccessToken,
  AccessTokenPayload,
} from "@/lib/trpc/schemas/v1/sessions";

@Injectable()
export class AccessTokenService {
  private logger: Logger = new Logger(AccessTokenService.name);
  private expire: StringValue;
  private secret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {
    try {
      this.logger.log({
        action: "Construct",
      });

      this.expire = this.envService.get("SYS_JWT_ACCESS_EXPIRE");
      this.secret = this.envService.get("SYS_JWT_ACCESS_SECRET");
    } catch (error) {
      this.logger.error({
        action: "Construct",
        error: error,
      });

      throw new Error("Constructor Failure!");
    }
  }

  async signAsync(payload: AccessTokenPayload): Promise<AccessToken> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.signAsync.name,
        metadata: {
          payload,
        },
      });

      const jwtOptions: JwtSignOptions = {
        expiresIn: this.expire,
        secret: this.secret,
      };

      const token = await this.jwtService.signAsync(payload, jwtOptions);

      this.logger.log({
        action: "Exit",
        method: this.signAsync.name,
        metadata: {
          token_length: token.length,
        },
      });

      return token;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.signAsync.name,
        error: error,
        payload,
      });

      throw error;
    }
  }

  async verifyAsync(token: AccessToken): Promise<AccessTokenPayload> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.verifyAsync.name,
        metadata: {
          token,
        },
      });

      const jwtOptions: JwtVerifyOptions = {
        secret: this.secret,
      };

      const payload: AccessTokenPayload = await this.jwtService.verifyAsync(
        token,
        jwtOptions,
      );

      this.logger.log({
        action: "Exit",
        method: this.verifyAsync.name,
        metadata: {
          token_keys: Object.keys(payload),
        },
      });

      return payload;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.verifyAsync.name,
        error: error,
        token,
      });

      throw error;
    }
  }

  decode(token: AccessToken): AccessTokenPayload {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.decode.name,
        metadata: {
          token,
        },
      });

      const jwtOptions = {
        complete: false,
        json: true,
      };

      const data: AccessTokenPayload = this.jwtService.decode(
        token,
        jwtOptions,
      );

      this.logger.log({
        action: "Exit",
        method: this.decode.name,
        metadata: {
          data_keys: Object.keys(data),
        },
      });

      return data;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.decode.name,
        error: error,
        token,
      });

      throw error;
    }
  }
}
