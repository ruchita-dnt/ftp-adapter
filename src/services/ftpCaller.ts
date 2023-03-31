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
	public async ftpCall(fileName: string)
	{
		await this.ftpAdapter.connect();
		console.log("fileName~~~~", fileName);
		return new Promise(async (resolve, reject) =>
		{
			await this.ftpAdapter.downloadFile(`/download/${fileName}`, `C:/Users/DELL/${fileName}` , `/somedata/test/${fileName}` ).then(() =>
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
	// public async ftpCaller(fileName: string){
	// 	await this.ftpAdapter.connect();
	// 	console.log("fileName~~~", fileName);
	// 	return new Promise(async(resolve, reject)=>{
	// 		await this.ftpAdapter.moveFile(`/somedata/${fileName}`,`/somedata/test/${fileName}`).then(()=>{
	// 			resolve(true);
	// 		}).catch(err=>{
	// 			reject(err);
	// 		})
	// 	});
	// }
}