import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export const uploadFile = async(itemImg) => {
    const s3 = new AWS.S3();

    const params = {
        ACL: 'public-read',
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `img/${Date.now()}${itemImg?.name}`,
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
            Key: `img/${Date.now()}_${file?.name}`,
            Body: file,
        };
        return s3.upload(params).promise();
    });
    
    const result = await Promise.all(uploadPromise);
    const locations = result.map(result => result.Location);

    return locations.join(",");
}

export const deleteFileList = async(keyList) => {
    try{
        const s3 = new AWS.S3();

        const objects = keyList.map((key) => {
            return {Key:key};
        })

        const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET, 
            Delete: {
                Objects: objects, 
                Quiet: false
            }
        };
        await s3.deleteObjects(params).promise();
    }catch(e){
        alert(e);
    }
}

export const extractS3Key = (fileLink) => {

    const fileKey = fileLink.map((file)=>{
        if(file.includes(process.env.REACT_APP_S3_BUCKET)){
            const key = file.split('com/');
            return decodeURI(key[key.length-1]);
        }
        return null;
    });

    if(!fileKey[0]){
        return null;
    }

    return fileKey;
}