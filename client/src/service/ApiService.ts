import ApiConfig from '../config/ApiConfig';
import DataModel from '../model/DataModel';

class ApiService {
    public async GetDataList(): Promise<Array<DataModel>> {
        const response = await fetch(ApiConfig.CrudDataUrl);
        return await response.json();
    }
}

export default ApiService