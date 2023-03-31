/* eslint-disable no-console */
import config from '../config';
// import ejs from 'ejs';
// import path from 'path';
import { Service } from 'typedi';
import { FtpAdapter } from "./ftpAdapter";


@Service()
export class ftpCaller
{

	public ftpAdapter: any;

	public constructor()
	{
		this.ftpAdapter = new FtpAdapter();
	}

	// ftp adapter
	public async ftpCall(fileName: string)
	{
		await this.ftpAdapter.connect();
		console.log("fileName~~~~", fileName);
		return new Promise(async (resolve, reject) =>
		{
			await this.ftpAdapter.downloadFile(`/download/${fileName}`, `/Users/ruchitashah/Downloads/${fileName}`).then(() =>
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