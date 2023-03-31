import { Container } from 'typedi';
import { ftpCaller } from '../services/ftpCaller';
export class IFTP
{
	// update CMS
	static async downloadFTPFileInterface(fileName: string)
	{
		return await new Promise(async (resolve, reject) =>
		{
			console.log("filename in interface~~~~", fileName);
			const serviceFTP = await Container.get(ftpCaller);
			await serviceFTP.ftpCall(fileName).then((res: any) =>
			{
				console.log("res in IFTP", res);
				resolve({ status: 200, message: 'File downloaded successfully' });

			}).catch(err => {
				reject(err);
			})
		})
	}	
	// static async moveFTPFileInterface(fileName: string){
	// 	return await new Promise(async(resolve , reject)=>{
	// 		console.log("filename in interface~~~~", fileName);
	// 		const serviceFTP = await Container.get(ftpCaller);
	// 		await serviceFTP.ftpCaller(fileName).then((res:any)=>{
	// 			console.log('res in IFTP', res);
	// 			resolve({status: 200, message: "File Moved successfully"})
	// 		}).catch(err=>{
	// 			reject(err)
	// 		})

	// 	})
	// }
}
// filename_processed