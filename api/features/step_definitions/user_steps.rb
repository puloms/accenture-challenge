Given('I create a User') do
    @user = User.new(Faker::Games::Witcher.character, Faker::Internet.password(min_length: 8, mix_case: true, special_characters: true))
    @user.create_user
    expect(@user.response.code).to be 201
end

When('generate a Token') do
    @user.generate_token
    expect(@user.token_response.code).to be 200
end

Then('the User is authorized') do
    @user.authorized?
end

Given('I create a User and authorize it') do
    steps %Q{
    Given I create a User
    When generate a Token
    Then the User is authorized
  }
end

Given('I list all books') do
    @book = Book.new(@user)
    @book.get_all_books
    expect(@book.books.length).to be > 1
end

When('I rent two books') do
    #the two here could be parameterized in feature file
    @rented_books = @book.books.sample(2)
    @rented_books.collect!{|b| b["isbn"]}
    @book.add_books(@rented_books)
    @book.books_responses.each do |rented_book|
        expect(rented_book.response.code).to eq "201"
    end
end

Then('the User rented the books') do
    @user.get_user
    expect(@user.user_response["books"].collect{|b| b['isbn']}).to match @rented_books
end