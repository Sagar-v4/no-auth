import { randomUUID } from "crypto";
import { EnvService } from "@/env/env.service";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";

import { BasicService } from "@/app/basic/basic.service";
import { UserDocument } from "@/app/users/entities/user.entity";
import {
  LOGIN_METHODS_ENUM,
  NO_AUTH_USER_ROLES_ENUM,
  STATUS_ENUM as USER_STATUS_ENUM,
} from "@/lib/trpc/schemas/v1/users";
import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";
import { STATUS_ENUM as ORGANIZATION_STATUS_ENUM } from "@/lib/trpc/schemas/v1/organizations";
import { SSODocument } from "@/app/sso/entities/sso.entity";
import { STATUS_ENUM as SSO_STATUS_ENUM } from "@/lib/trpc/schemas/v1/sso";
import { KeyDocument } from "@/app/keys/entities/key.entity";
import { STATUS_ENUM as KEY_STATUS_ENUM } from "@/lib/trpc/schemas/v1/keys";

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger: Logger = new Logger(AppService.name);

  constructor(
    private readonly envService: EnvService,
    private readonly basicService: BasicService,
  ) {
    try {
      this.logger.log({
        action: "Construct",
      });
    } catch (error) {
      this.logger.error({
        action: "Construct",
        error: error,
      });

      throw new Error("Constructor Failure!");
    }
  }

  getHello(): string {
    return "Hello World!";
  }

  async onApplicationBootstrap() {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.onApplicationBootstrap.name,
      });

      const admin = await this.initializeAdmin();
      const noAuth = await this.initializeNoAuth(admin);
      const sso = await this.initializeSSO(admin, noAuth);
      const apiKey = await this.initializeApiKey(admin, noAuth);

      this.logger.log({
        action: "Exit",
        method: this.onApplicationBootstrap.name,
        admin_id: admin._id.toString(),
        noAuth_id: noAuth._id.toString(),
        sso_id: sso._id.toString(),
        apiKey_id: apiKey._id.toString(),
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.onApplicationBootstrap.name,
        error: error,
      });

      throw error;
    }
  }

  async initializeAdmin(): Promise<UserDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.initializeAdmin.name,
      });

      const admin_email = this.envService.get("SYS_ADMIN_EMAIL");

      let [admin] = await this.basicService.find({
        schema: "User",
        filter: { email: admin_email },
        select: [],
        populate: [],
      });

      if (!admin) {
        admin = await this.basicService.insertOne({
          schema: "User",
          doc: {
            email: admin_email,
            name: admin_email.split("@")[0],
            organization_uuid: randomUUID(),
            roles: [
              NO_AUTH_USER_ROLES_ENUM.Enum.CLIENT,
              NO_AUTH_USER_ROLES_ENUM.Enum.ADMIN,
            ],
          },
        });
      }

      if (admin.login_method !== LOGIN_METHODS_ENUM.Enum.OTP) {
        admin = await this.basicService.findOneAndUpdate({
          schema: "User",
          filter: { _id: admin._id },
          update: { $set: { login_method: LOGIN_METHODS_ENUM.Enum.OTP } },
          select: [],
          populate: [],
        });
      }

      if (admin.status !== USER_STATUS_ENUM.Enum.ACTIVE) {
        admin = await this.basicService.findOneAndUpdate({
          schema: "User",
          filter: { _id: admin._id },
          update: { $set: { status: USER_STATUS_ENUM.Enum.ACTIVE } },
          select: [],
          populate: [],
        });
      }

      if (!admin.roles.includes(NO_AUTH_USER_ROLES_ENUM.Enum.ADMIN)) {
        admin = await this.basicService.findOneAndUpdate({
          schema: "User",
          filter: { _id: admin._id },
          update: { $push: { roles: NO_AUTH_USER_ROLES_ENUM.Enum.ADMIN } },
          select: [],
          populate: [],
        });
      }

      this.logger.log({
        action: "Exit",
        method: this.initializeAdmin.name,
      });

      return admin;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.initializeAdmin.name,
        error: error,
      });

      throw error;
    }
  }

  async initializeNoAuth(admin: UserDocument): Promise<OrganizationDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.initializeNoAuth.name,
      });

      const noAuth = {
        name: "No Auth",
        description: "This is No Auth Organization",
      };

      let [organization] = await this.basicService.find({
        schema: "Organization",
        filter: { user_id: admin._id.toString(), ...noAuth },
        select: [],
        populate: [],
      });

      if (!organization) {
        organization = await this.basicService.insertOne({
          schema: "Organization",
          doc: {
            user_id: admin._id.toString(),
            uuid: admin.organization_uuid,
            ...noAuth,
          },
        });
      }

      if (organization.status !== ORGANIZATION_STATUS_ENUM.Enum.ACTIVE) {
        organization = await this.basicService.findOneAndUpdate({
          schema: "Organization",
          filter: { _id: organization._id },
          update: { $set: { status: ORGANIZATION_STATUS_ENUM.Enum.ACTIVE } },
          select: [],
          populate: [],
        });
      }

      this.logger.log({
        action: "Exit",
        method: this.initializeNoAuth.name,
      });

      return organization;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.initializeNoAuth.name,
        error: error,
      });

      throw error;
    }
  }

  async initializeSSO(
    admin: UserDocument,
    noAuth: OrganizationDocument,
  ): Promise<SSODocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.initializeSSO.name,
      });

      const sso_uuid = this.envService.get("SYS_SSO_UUID");
      const sso_secret = this.envService.get("NO_AUTH_SSO_SECRET");
      const sso_webhook_url = this.envService.get("SYS_SSO_WEBHOOK_URL");
      const sso_redirect_url = this.envService.get("SYS_SSO_REDIRECT_URL");
      const sso_login_method = this.envService.get("SYS_SSO_LOGIN_METHOD");

      let [sso] = await this.basicService.find({
        schema: "SSO",
        filter: {
          user_id: admin._id.toString(),
          organization_id: noAuth._id.toString(),
          secret: sso_secret,
          uuid: sso_uuid,
        },
        select: [],
        populate: [],
      });

      if (!sso) {
        sso = await this.basicService.insertOne({
          schema: "SSO",
          doc: {
            user_id: admin._id.toString(),
            organization_id: noAuth._id.toString(),
            uuid: sso_uuid,
            secret: sso_secret,
            webhook_url: sso_webhook_url,
            redirect_url: sso_redirect_url,
            login_method: sso_login_method,
          },
        });
      }

      if (sso.status !== SSO_STATUS_ENUM.Enum.ACTIVE) {
        sso = await this.basicService.findOneAndUpdate({
          schema: "SSO",
          filter: { _id: sso._id },
          update: { $set: { status: SSO_STATUS_ENUM.Enum.ACTIVE } },
          select: [],
          populate: [],
        });
      }

      this.logger.log({
        action: "Exit",
        method: this.initializeSSO.name,
      });

      return sso;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.initializeSSO.name,
        error: error,
      });

      throw error;
    }
  }

  async initializeApiKey(
    admin: UserDocument,
    noAuth: OrganizationDocument,
  ): Promise<KeyDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.initializeApiKey.name,
      });

      const apiKeySecret = this.envService.get("NO_AUTH_API_KEY_SECRET");

      const noAuthApiKey = {
        name: "No Auth Key",
        description: "This is No Auth API Key",
      };

      let [apiKey] = await this.basicService.find({
        schema: "Key",
        filter: {
          user_id: admin._id.toString(),
          organization_id: noAuth._id.toString(),
          secret: apiKeySecret,
        },
        select: [],
        populate: [],
      });

      if (!apiKey) {
        apiKey = await this.basicService.insertOne({
          schema: "Key",
          doc: {
            user_id: admin._id.toString(),
            organization_id: noAuth._id.toString(),
            secret: apiKeySecret,
            ...noAuthApiKey,
          },
        });
      }

      if (apiKey.status !== KEY_STATUS_ENUM.Enum.ACTIVE) {
        apiKey = await this.basicService.findOneAndUpdate({
          schema: "Key",
          filter: { _id: apiKey._id },
          update: { $set: { status: KEY_STATUS_ENUM.Enum.ACTIVE } },
          select: [],
          populate: [],
        });
      }

      this.logger.log({
        action: "Exit",
        method: this.initializeApiKey.name,
      });

      return apiKey;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.initializeApiKey.name,
        error: error,
      });

      throw error;
    }
  }
}
