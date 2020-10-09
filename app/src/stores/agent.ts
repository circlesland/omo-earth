import { identityClient } from "../graphQL/identity/identityClient";
import { publicEncrypt, privateDecrypt } from "crypto";

interface IPublicData {
  circles: {
    safeAddress: string;
  }
}

interface IPrivateData {
  circles:{
    safePrivateKey: string
  };
  [other:string]:any
}

interface IAgent
{
  type: string
  key: string

  identityPrivateKey: string
  identityPublicKey: string

  getPublicData() : Promise<IPublicData>;
  getPrivateData() : Promise<IPrivateData>;

  setPublicData(data:IPublicData) : Promise<void>;
  setPrivateData(data:IPrivateData) : Promise<void>;
}

export class Agent implements IAgent {

  public static me = new Agent();

  key: string;
  type: string;

  identityPrivateKey: string;
  identityPublicKey: string;

  async getPrivateData() : Promise<IPrivateData>
  {
    const privateKey = await identityClient.identityPrivateKey();
    const encryptedPrivateData = await identityClient.privateData({});
    const privateDataJson = encryptedPrivateData.data.privateData;
    const privateDataClearText = privateDecrypt(privateKey.data.identityPrivateKey, Buffer.from(privateDataJson, "base64"));
    return JSON.parse(privateDataClearText.toString("utf8"));
  }

  async setPrivateData(data: IPrivateData)
  {
    const privateDataJson = JSON.stringify(data);
    const identityPublicKey = await identityClient.identityPublicKey({});
    const encryptedPrivateDataJson = publicEncrypt(identityPublicKey.data.identityPublicKey, Buffer.from(privateDataJson, "utf8"));
    await identityClient.updatePrivateData({
      data: encryptedPrivateDataJson.toString("base64")
    });
  }

  async setPublicData(data: IPublicData) {
    await identityClient.updatePublicData({
      data
    });
  }

  async getPublicData(): Promise<IPublicData>
  {
    return (await identityClient.publicData({})).data.publicData;
  }
}