import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk'
import { v4 } from 'uuid'
import * as fs from 'fs'
import * as path from "path";

@Injectable()
export class FileService {
    private bucket = process.env.DO_SPACE_BUCKET;
    private endpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT)
    private s3 = new AWS.S3({
        endpoint: this.endpoint,
        secretAccessKey: process.env.DO_SPACE_SECRET_KEY, accessKeyId: process.env.DO_SPACE_ACCESS_KEY
    })

    async uploadFile(file): Promise<string> {
        let fileName = v4();
        const { originalname } = file;
        const format = originalname.split('.')
        fileName = fileName + '.' + format[format.length - 1]
        await this.s3_upload(file.buffer, this.bucket, fileName, file.mimetype)
        let res = process.env.DO_SPACE_FULL_ENDOINT + fileName
        return res
    }
    private async s3_upload(file, bucket, name, mimeType) {
        const params = {
            Bucket: bucket,
            Key: `${name}`,
            Body: file,
            ACL: "public-read",
            ContentType: mimeType,
            ContentDisposition: "inline",
            CreateBucketConfiguration:
            {
                LocationConstraint: "ap-south-1"
            }
        };
        try {
            let s3Response = await this.s3.upload(params).promise()
        } catch (e) {
            console.log(e)
        }
    }
    async deleteFile(key: string) {
        try {
            return await this.s3.deleteObject({
                Bucket: String(this.bucket),
                Key: key
            })
        } catch (e) {
            console.log(e)
        }
    }
    uploadFileInBack(file) {
        const { originalname } = file
        const filePath = path.resolve(__dirname, '..', 'static');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(filePath, originalname), file.buffer);
        return originalname;
    }
    deleteFileInBack(fileName) {
        const filePath = path.resolve(__dirname, '..', 'static');
        if (!fs.existsSync(filePath)) {
            return
        }
        fs.rmSync(path.join(filePath, fileName));

    }
    readStream<T>(stream): Promise<T[]> {
        return new Promise((resolve, reject) => {
            let data: T[] = [];
            stream.on("data", (chunk: T) => data.push(chunk));
            stream.on("end", () => resolve(data));
            stream.on("error", error => reject(error));
        })
    }
}
