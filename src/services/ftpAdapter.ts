/* eslint-disable no-console */
import * as ftp from 'basic-ftp';
import config from '../config';
import fs from 'fs';

// const processFile = require("../middleware/upload");
import processFile from '../middleware/upload';
// import {format} from 'util';
const { format } = require('util');
import { Storage } from '@google-cloud/storage';
import { CLIENT_RENEG_LIMIT } from 'tls';
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });

const bucketName = 'ftp_downloaded_data'
const Bucket = storage.bucket(bucketName);

// Bucket.upload(`./QAR-Sample2.txt`,
// 	{
// 		destination: `ftp_downloaded_data/QAR_data_files/image_to_upload.jpeg`,
// 	},
// 	function (err: any, file: any) {
// 		if (err) {
// 			console.error(`Error uploading image image_to_upload.jpeg: ${err}`)
// 		} else {
// 			console.log(`Image image_to_upload.jpeg uploaded to ${bucketName}.`)
// 		}
// 		file.makePublic(async function (err) {
// 			if (err) {
// 				console.error(`Error making file public: ${err}`)
// 			} else {
// 				console.log(`File ${file.name} is now public.`)
// 				const publicUrl = file.publicUrl()
// 				console.log(`Public URL for ${file.name}: ${publicUrl}`)
// 			}
// 		})
// 	})
// const bucket = storage.bucket('ftp_downloaded_data');

// const streamifier = require('streamifier');
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();

// const bucket = storage.bucket('ftp_downloaded_data');
// const blob = bucket.file('testimg.jpg');//https://storage.cloud.google.com/ftp_downloaded_data/Screenshot%202023-03-23%20at%203.21.41%20PM.png
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




		for (let i = 0; i < listAllFiles.length; i++) {

			console.log("file object", listAllFiles[i].name);

			const extension = listAllFiles[i].name.split('.')[1];
      const fileName = listAllFiles[i].name.split('.')[0]

			if (allFileExtension.includes('*') || allFileExtension.includes(extension)) {

				console.log("in if of extension");

        const destinationFolder = fileName.includes('QAR') ?  'QAR_data_files' : 'ODW_data_files'

				await this.client.downloadTo(`${destinationPath}${listAllFiles[i].name}`, `${ftpServerPath}${listAllFiles[i].name}`);
				await Bucket.upload(`${destinationPath}${listAllFiles[i].name}`,
					{
						destination: `${destinationFolder}/${listAllFiles[i].name}`,
					},
					function (err: any, file: any) {
						if (err) {
							console.error(`Error uploading file: ${err}`)
						} else {
							console.log(`File uploaded to ${bucketName}.`)
						}
						console.log(file, 'This is file output')
					})
				// await this.client.rename(`${ftpServerPath}${listAllFiles[i].name}`, `${moveDirectoryPath}${listAllFiles[i].name.split('.')[0]}_processed.${extension}`);
			}

		}

	}

	async listFiles(remotePath: string): Promise<ftp.FileInfo[]> {
		return await this.client.list(remotePath);
	}

	async uploadFile(localFilePath: string, remoteFilePath: string): Promise<void> {
		await this.client.uploadFrom(localFilePath, remoteFilePath);
	}




}
