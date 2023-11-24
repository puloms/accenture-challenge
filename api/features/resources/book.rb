class Book
    include HTTParty
    base_uri $base_url + '/BookStore/v1'

    attr_reader :response, :token_response, :books, :user, :books_responses

    def initialize(user)
        @user = user
    end

    def get_all_books
        response = self.class.get('/Books')
        @books = response['books'] if response.code == 200
    end

    def add_books(books)
        @books_responses = []
        books.each do |book|
            #for some reason, HTTParty is messing up multiple isbns in collectionOfIsbns, so we are doing it one at a time
            @books_responses << self.class.post('/Books', body: { userId: @user.user_id, collectionOfIsbns: [{isbn: book }]}, 
                                    headers: {"Authorization" => "Bearer #{@user.token}"})
        end
    end
end