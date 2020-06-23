import ApiConfig from '../config/ApiConfig';
import DataModel from '../model/DataModel';

class ApiService {
    private getBase64(file: any, callback: Function) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var base64result = (reader.result as string).split(',')[1];
            callback(base64result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    public async GetDataList(): Promise<Array<DataModel>> {
        const response = await fetch(ApiConfig.CrudDataUrl);
        return await response.json();
    }

    public async GetImageById(id: string): Promise<any> {
        const response = await fetch(ApiConfig.CrudImageUrl + '?id=' + id);
        return await response.json();
    }

    public async UploadImage(file: any): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            this.getBase64(file, async (data: any) => {
                const requestData = { image: data };
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                };
                const response = await fetch(ApiConfig.CrudImageUrl, requestOptions);
                const result = await response.json();
                resolve(result);
            })
        });
        return promise;
    }

    public async SaveData(data: any) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch(ApiConfig.CrudDataUrl, requestOptions);
        return response;
    }
}

export default ApiService