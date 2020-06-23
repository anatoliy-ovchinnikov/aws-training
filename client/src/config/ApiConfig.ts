abstract class ApiConfig {
    private static ApiUrl = 'https://kp88coa02d.execute-api.us-east-2.amazonaws.com/prod/';
    public static CrudDataUrl = ApiConfig.ApiUrl + 'api/v1/data';
    public static CrudImageUrl = ApiConfig.ApiUrl + 'api/v1/images';
}

export default ApiConfig