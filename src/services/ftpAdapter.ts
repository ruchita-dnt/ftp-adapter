/* eslint-disable no-console */
import * as ftp from 'basic-ftp';
import config from '../config';

export class FtpAdapter
{
  private client: ftp.Client;

  constructor()
  {
    this.client = new ftp.Client();
    this.client.ftp.verbose = true; // Enable verbose logging
  }

  async connect(): Promise<void>
  {
    await this.client.access(config.ftpConfig);
  }

  async disconnect(): Promise<void>
  {
    await this.client.close();
  }

  async downloadFile(remoteFilePath: string, localFilePath: string): Promise<void>
  {
    console.log("in download file adapter", remoteFilePath, localFilePath);
    
      // await this.client.trackProgress(info =>
      // {
      //   console.log("File", info.name)
      //   console.log("Type", info.type)
      //   console.log("Transferred", info.bytes)
      //   console.log("Transferred Overall", info.bytesOverall)
      // })

      const res = await this.client.downloadTo(localFilePath, remoteFilePath);
      console.log("result in adapter", res);
  }

  async uploadFile(localFilePath: string, remoteFilePath: string): Promise<void>
  {
    await this.client.uploadFrom(localFilePath, remoteFilePath);
  }

  async listFiles(remotePath: string): Promise<ftp.FileInfo[]>
  {
    return await this.client.list(remotePath);
  }
}
