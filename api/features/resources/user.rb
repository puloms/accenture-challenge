class User
    include HTTParty
    base_uri $base_url + '/Account/v1'

    attr_reader :response, :token_response, :user_id, :token, :user_response

    def initialize(name, password)
        @name = name
        @password = password
    end

    def create_user
        @response = post_request('/User')
        @user_id = @response['userID'] if @response.code == 201
    end

    def generate_token
        @token_response = post_request('/GenerateToken')
        @token = @token_response['token']
    end

    def authorized?
        response = post_request('/Authorized')
        return response ? response : false
    end

    def get_user
        @user_response = self.class.get("/User/#{@user_id}", headers: {"Authorization" => "Bearer #{@token}"})
    end

    private

    def body
        return {userName: @name, password: @password}
    end

    def post_request(uri)
        self.class.post(uri, body: body)
    end
end