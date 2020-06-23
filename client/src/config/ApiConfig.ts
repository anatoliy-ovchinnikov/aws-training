abstract class ApiConfig {
    private static ApiUrl = 'https://kp88coa02d.execute-api.us-east-2.amazonaws.com/prod/';
    public static CrudDataUrl = ApiConfig.ApiUrl + 'api/v1/data';
    public static PostImageUrl = ApiConfig.ApiUrl + 'api/v1/image';
}

export default ApiConfig