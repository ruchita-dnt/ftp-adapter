import { Container } from 'typedi';
import { ftpCaller } from '../services/ftpCaller';
export class IFTP
{
	// update CMS
	static async downloadFTPFileInterface(data: any)
	{
		return await new Promise(async (resolve, reject) =>
		{
			console.log("filename in interface~~~~", data.ftpServerPath, data.destinationPath, data.bucketName, data.fileExtension);
			const serviceFTP = await Container.get(ftpCaller);
			await serviceFTP.ftpCall(data).then((res: any) =>
			{
				console.log("res in IFTP", res);
				resolve({ status: 200, message: 'File downloaded successfully' });

			}).catch(err => {
				reject(err);
			})
		})
	}	
}