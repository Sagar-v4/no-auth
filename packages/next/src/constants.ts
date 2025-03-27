import {
  device_uuid as device_uuid_key,
  refresh_token as refresh_token_key,
} from "../../../libs/constants/cookies";

export const device_uuid: string = device_uuid_key;
export const refresh_token: string = refresh_token_key;
export const refresh_token_expire_ms: number = 1000 * 60 * 60 * 24 * 180;
