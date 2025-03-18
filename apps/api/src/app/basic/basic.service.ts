import {
  DeleteResult,
  InsertManyResult,
  Model,
  UpdateWriteOpResult,
} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { TRPCError } from "@trpc/server";
import { ERROR } from "@/trpc/error";
import { FindInput } from "@/app/basic/dto/find.dto";
import { UpdateInput } from "@/app/basic/dto/update.dto";
import { DeleteInput } from "@/app/basic/dto/delete.dto";
import { Documents } from "@/app/basic/dto/document.dto";
import { GetIdsInput } from "@/app/basic/dto/get-ids.dto";
import { InsertInput } from "@/app/basic/dto/insert.dto";
import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleDocument,
} from "@/app/clienteles/entities/clientele.entity";
import {
  CLIENT_SCHEMA_NAME,
  ClientDocument,
} from "@/app/clients/entities/client.entity";
import {
  DEVICE_SCHEMA_NAME,
  DeviceDocument,
} from "@/app/devices/entities/device.entity";
import { KEY_SCHEMA_NAME, KeyDocument } from "@/app/keys/entities/key.entity";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationDocument,
} from "@/app/organizations/entities/organization.entity";
import {
  PERMISSION_SCHEMA_NAME,
  PermissionDocument,
} from "@/app/permissions/entities/permission.entity";
import {
  ROLE_SCHEMA_NAME,
  RoleDocument,
} from "@/app/roles/entities/role.entity";
import {
  SESSION_SCHEMA_NAME,
  SessionDocument,
} from "@/app/sessions/entities/session.entity";
import { SSO_SCHEMA_NAME, SSODocument } from "@/app/sso/entities/sso.entity";
import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceDocument,
} from "../email/services/entities/service.entity";

@Injectable()
export class BasicService {
  private logger: Logger = new Logger(BasicService.name);

  constructor(
    @InjectModel(CLIENT_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly clientModel: Model<ClientDocument>,
    @InjectModel(CLIENTELE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly clienteleModel: Model<ClienteleDocument>,
    @InjectModel(DEVICE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly deviceModel: Model<DeviceDocument>,
    @InjectModel(EMAIL_SERVICE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly emailServiceModel: Model<EmailServiceDocument>,
    @InjectModel(KEY_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly keyModel: Model<KeyDocument>,
    @InjectModel(ORGANIZATION_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly organizationModel: Model<OrganizationDocument>,
    @InjectModel(PERMISSION_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly permissionModel: Model<PermissionDocument>,
    @InjectModel(ROLE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly roleModel: Model<RoleDocument>,
    @InjectModel(SESSION_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly sessionModel: Model<SessionDocument>,
    @InjectModel(SSO_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.BASIC)
    private readonly ssoModel: Model<SSODocument>,
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

  async insertOne<T extends keyof Documents>(input: {
    schema: T;
    doc: Extract<InsertInput, { schema: T }>["doc"];
  }): Promise<Documents[T]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          input,
        },
      });

      let document: Documents[T];

      switch (input.schema) {
        case "Clientele":
          document = (await this.clienteleModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Client":
          document = (await this.clientModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Device":
          document = (await this.deviceModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Email_Service":
          document = (await this.emailServiceModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Key":
          document = (await this.keyModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Organization":
          document = (await this.organizationModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Permission":
          document = (await this.permissionModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Role":
          document = (await this.roleModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "SSO":
          document = (await this.ssoModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        case "Session":
          document = (await this.sessionModel.insertOne(
            input.doc as InsertInput["doc"],
            {
              validateBeforeSave: true,
            },
          )) as unknown as Documents[T];
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!document) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          documentKeys: Object.keys(document),
        },
      });

      return document;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async insertMany<T extends keyof Documents>(input: {
    schema: T;
    doc: InsertInput["doc"][];
  }): Promise<InsertManyResult<any>> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          input,
        },
      });

      let result: InsertManyResult<any>;

      switch (input.schema) {
        case "Clientele":
          result = await this.clienteleModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Client":
          result = await this.clientModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Device":
          result = await this.deviceModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Email_Service":
          result = await this.emailServiceModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Key":
          result = await this.keyModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Organization":
          result = await this.organizationModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Permission":
          result = await this.permissionModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Role":
          result = await this.roleModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "SSO":
          result = await this.ssoModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        case "Session":
          result = await this.sessionModel.insertMany(input.doc, {
            includeResultMetadata: true,
            rawResult: true,
          });
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!result) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return result;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async find<T extends keyof Documents>(
    input: FindInput<T>,
  ): Promise<Documents[T][]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.find.name,
        metadata: {
          input,
        },
      });

      let documents: Documents[T][];

      switch (input.schema) {
        case "Clientele":
          documents = (await this.clienteleModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Client":
          documents = (await this.clientModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Device":
          documents = (await this.deviceModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Email_Service":
          documents = (await this.emailServiceModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Key":
          documents = (await this.keyModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Organization":
          documents = (await this.organizationModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Permission":
          documents = (await this.permissionModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Role":
          documents = (await this.roleModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "SSO":
          documents = (await this.ssoModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        case "Session":
          documents = (await this.sessionModel
            .find(input.filter)
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T][];
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!documents) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.find.name,
        metadata: {
          input,
          documentKeys: documents.map((document: {}) => Object.keys(document)),
        },
      });

      return documents;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.find.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async findOneAndUpdate<T extends keyof Documents>(
    input: UpdateInput<T>,
  ): Promise<Documents[T]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          input,
        },
      });

      let document: Documents[T];

      switch (input.schema) {
        case "Clientele":
          document = (await this.clienteleModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Client":
          document = (await this.clientModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Device":
          document = (await this.deviceModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Email_Service":
          document = (await this.emailServiceModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Key":
          document = (await this.keyModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Organization":
          document = (await this.organizationModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Permission":
          document = (await this.permissionModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Role":
          document = (await this.roleModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "SSO":
          document = (await this.ssoModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        case "Session":
          document = (await this.sessionModel
            .findOneAndUpdate(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec()) as unknown as Documents[T];
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!document) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        metadata: {
          documentKeys: Object.keys(document),
        },
      });

      return document;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async updateMany<T extends keyof Documents>(
    input: UpdateInput<T>,
  ): Promise<UpdateWriteOpResult> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateMany.name,
        metadata: {
          input,
        },
      });

      let result: UpdateWriteOpResult;

      switch (input.schema) {
        case "Clientele":
          result = await this.clienteleModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Client":
          result = await this.clientModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Device":
          result = await this.deviceModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Email_Service":
          result = await this.emailServiceModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Key":
          result = await this.keyModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Organization":
          result = await this.organizationModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Permission":
          result = await this.permissionModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Role":
          result = await this.roleModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "SSO":
          result = await this.ssoModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        case "Session":
          result = await this.sessionModel
            .updateMany(input.filter, input.update, {
              new: true,
              upsert: false,
            })
            .select(input.select)
            .populate(input.populate)
            .exec();
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!result) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.updateMany.name,
        metadata: {
          resultKeys: Object.keys(result),
        },
      });

      return result;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateMany.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async delete<T extends keyof Documents>(
    input: DeleteInput<T>,
  ): Promise<DeleteResult> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.delete.name,
        metadata: {
          input,
        },
      });

      let result: DeleteResult;

      switch (input.schema) {
        case "Clientele":
          result = await this.clienteleModel.deleteMany(input.filter).exec();
          break;

        case "Client":
          result = await this.clientModel.deleteMany(input.filter).exec();
          break;

        case "Device":
          result = await this.deviceModel.deleteMany(input.filter).exec();
          break;

        case "Email_Service":
          result = await this.emailServiceModel.deleteMany(input.filter).exec();
          break;

        case "Key":
          result = await this.keyModel.deleteMany(input.filter).exec();
          break;

        case "Organization":
          result = await this.organizationModel.deleteMany(input.filter).exec();
          break;

        case "Permission":
          result = await this.permissionModel.deleteMany(input.filter).exec();
          break;

        case "Role":
          result = await this.roleModel.deleteMany(input.filter).exec();
          break;

        case "SSO":
          result = await this.ssoModel.deleteMany(input.filter).exec();
          break;

        case "Session":
          result = await this.sessionModel.deleteMany(input.filter).exec();
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!result) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.delete.name,
        metadata: {
          result,
        },
      });

      return result;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.delete.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async getIds<T extends keyof Documents>(
    input: GetIdsInput<T>,
  ): Promise<string[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.getIds.name,
        metadata: {
          input,
        },
      });

      if (Object.keys(input.filter).length === 0) {
        this.logger.warn({
          action: "Exit",
          method: this.getIds.name,
          metadata: {
            input,
          },
        });
        return [];
      }

      let documents: Documents[T][];

      switch (input.schema) {
        case "Clientele":
          documents = (await this.clienteleModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Client":
          documents = (await this.clientModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Device":
          documents = (await this.deviceModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Email_Service":
          documents = (await this.emailServiceModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Key":
          documents = (await this.keyModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Organization":
          documents = (await this.organizationModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Permission":
          documents = (await this.permissionModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Role":
          documents = (await this.roleModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "SSO":
          documents = (await this.ssoModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        case "Session":
          documents = (await this.sessionModel
            .find(input.filter)
            .select("_id")
            .exec()) as unknown as Documents[T][];
          break;

        default:
          throw new TRPCError(ERROR.BASIC.INVALID_SCHEMA);
      }

      if (!documents) {
        throw new TRPCError(ERROR.BASIC.NOT_FOUND);
      }

      const documentIds = documents.map((document) => document._id.toString());

      this.logger.log({
        action: "Exit",
        method: this.getIds.name,
        metadata: {
          input,
          documentIds,
        },
      });

      return documentIds;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.getIds.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }
}
