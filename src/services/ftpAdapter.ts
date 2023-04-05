/* eslint-disable no-console */
import * as ftp from 'basic-ftp';
import config from '../config';

export class FtpAdapter {
  private client: ftp.Client;

  constructor() {
    this.client = new ftp.Client();
    this.client.ftp.verbose = true; // Enable verbose logging
  }

  async connect(): Promise<void> {
    await this.client.access(config.ftpConfig);
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  async downloadFile(ftpServerPath: string, destinationPath: string, moveDirectoryPath: string, fileExtension: string): Promise<void> {
    console.log("in download file adapter", ftpServerPath, destinationPath, moveDirectoryPath, fileExtension);

    // const res = await this.client.downloadTo(localFilePath, remoteFilePath);
    // const rename = await this.client.rename(remoteFilePath, newPath);
    //list all files in directory, download from that directory and store it into destination directory

    const listAllFiles = await this.client.list(ftpServerPath);
    const allFileExtension = fileExtension.split(',');
    console.log("allFileExtension", allFileExtension);

    for(let i = 0; i < listAllFiles.length; i++){
      console.log("file object", listAllFiles[i].name);
      const extension = listAllFiles[i].name.split('.')[1];
      if (allFileExtension.includes('*') || allFileExtension.includes(extension)) {
        console.log("in if of extension");
        
        await this.client.downloadTo(`${destinationPath}${listAllFiles[i].name}`, `${ftpServerPath}${listAllFiles[i].name}`);

        await this.client.rename(`${ftpServerPath}${listAllFiles[i].name}`, `${moveDirectoryPath}${listAllFiles[i].name.split('.')[0]}_processed.${extension}`);
      }
    };
  }

  async uploadFile(localFilePath: string, remoteFilePath: string): Promise<void> {
    await this.client.uploadFrom(localFilePath, remoteFilePath);
  }

  async listFiles(remotePath: string): Promise<ftp.FileInfo[]> {
    return await this.client.list(remotePath);
  }
}
