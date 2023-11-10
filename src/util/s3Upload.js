import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export const uploadFile = async(itemImg) => {
    const s3 = new AWS.S3();

    const params = {
        ACL: 'public-read',
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `${Date.now()}${itemImg?.name}`,
        Body: itemImg,
    };

    const uploadFile = await s3.upload(params).promise();
    return uploadFile.Location;
}

export const uploadFileList = async(fileList) => {
    const s3 = new AWS.S3();
    
    const uploadPromise = fileList.map((file) => {
        const params = {
            ACL: 'public-read',
            Bucket: process.env.REACT_APP_S3_BUCKET,
            Key: `${Date.now()}_${file?.name}`,
            Body: file,
        };
        return s3.upload(params).promise();
    });
    
    const result = await Promise.all(uploadPromise);
    const locations = result.map(result => result.Location);

    return locations.join(",");
}

