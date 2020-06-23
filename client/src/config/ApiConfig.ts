abstract class ApiConfig {
    private static ApiUrl = 'https://kp88coa02d.execute-api.us-east-2.amazonaws.com/prod/';
    public static GetDataUrl = ApiConfig.ApiUrl + 'api/v1/data';
}

export default ApiConfig