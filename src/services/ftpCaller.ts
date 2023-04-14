/* eslint-disable no-console */
import config from '../config';
// import ejs from 'ejs';
// import path from 'path';
import { Service } from 'typedi';
import { FtpAdapter } from "./ftpAdapter";
import { resolve } from 'dns';
import { rejections } from 'winston';


@Service()
export class ftpCaller
{

	public ftpAdapter: any;

	public constructor()
	{
		this.ftpAdapter = new FtpAdapter();
	}

	// ftp adapter
	public async ftpCall(data: any)
	{
		await this.ftpAdapter.connect();
		return new Promise(async (resolve, reject) =>
		{
			await this.ftpAdapter.downloadFile(data.ftpServerPath, data.destinationPath , data.bucketName, data.fileExtension ).then(() =>
			{
				resolve(true);
			}).catch(err =>
			{
				reject(err);
			})
		});

		// await this.ftpAdapter.uploadFile('/local/file/path.txt', '/remote/file/path.txt');
		// const files = await this.ftpAdapter.listFiles('/remote/directory/path');
		// console.log(files);
		// await this.ftpAdapter.disconnect();
	}
}