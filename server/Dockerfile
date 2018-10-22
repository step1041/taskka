FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile Gemfile
COPY Rakefile Rakefile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
RUN bundle exec rake db:migrate
COPY . /myapp