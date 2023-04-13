/* eslint-disable no-console */
const Client = require('ssh2-sftp-client');
import config from '../config';
import fs from 'fs';
// const processFile = require("../middleware/upload");
import processFile from '../middleware/upload';
// import {format} from 'util';
const { format } = require('util');
import { Storage } from '@google-cloud/storage';
// Instantiate a storage client with credentials
const storage = new Storage({
	projectId: 'ge-dms',
	keyFilename: 'google-cloud-key.json'
});

const bucketName = 'ftp_downloaded_data'
const Bucket = storage.bucket(bucketName);


export class FtpAdapter
{
	private client: any;

	constructor()
	{
		this.client = new Client();
	}

	async connect(): Promise<void>
	{
		console.log("connect");
		await this.client.connect(config.ftpConfig).catch(err => console.log(err));
		console.log(this.client)
	}

	async disconnect(): Promise<void>
	{
		await this.client.close();
	}

	async downloadFile(ftpServerPath: string, destinationPath: string, moveDirectoryPath: string, fileExtension: string): Promise<void>
	{
		console.log("in download file adapter", ftpServerPath, destinationPath, moveDirectoryPath, fileExtension);
		// const res = await this.client.downloadTo(localFilePath, remoteFilePath);
		// const rename = await this.client.rename(remoteFilePath, newPath);
		//list all files in directory, download from that directory and store it into destination directory
		const listAllFiles = await this.client.list(ftpServerPath);
		const allFileExtension = fileExtension.split(',');
		console.log("allFileExtension", allFileExtension);
		for (let i = 0; i < listAllFiles.length; i++)
		{
			console.log("file object", listAllFiles[i].name);
			const extension = listAllFiles[i].name.split('.')[1];
			const fileName = listAllFiles[i].name.split('.')[0]

			if (allFileExtension.includes('*') || allFileExtension.includes(extension))
			{
				console.log("in if of extension", fileName);
				const destinationFolder = fileName.includes('QAR') ? 'QAR_data_files' : 'ODW_data_files'
				console.log("destinationFolder", destinationFolder);
				await this.client.get(`${ftpServerPath}${listAllFiles[i].name}`, `${destinationPath}${listAllFiles[i].name}`).catch(err => console.log("error in file get from sftp", err));
				console.log("Bucket", `${destinationPath}${listAllFiles[i].name}`, `${destinationFolder}/${listAllFiles[i].name}`);
				await Bucket.upload(`${destinationPath}${listAllFiles[i].name}`,
					{
						destination: `${destinationFolder}/${listAllFiles[i].name}`,
					},
					function (err: any, file: any)
					{
						if (err)
						{
							console.error(`Error uploading file: ${err}`)
						} else
						{
							console.log(`File uploaded to ${bucketName}.`)
						}
						console.log(file, 'This is file output')
					})
				// await this.client.rename(`${ftpServerPath}${listAllFiles[i].name}`, `${moveDirectoryPath}${listAllFiles[i].name.split('.')[0]}_processed.${extension}`);
			}
		}
	}

	async uploadFile(localFilePath: string, remoteFilePath: string): Promise<void>
	{
		await this.client.uploadFrom(localFilePath, remoteFilePath);
	}




}
