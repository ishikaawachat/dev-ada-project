#this is where we will try to do stuff

from typing import OrderedDict
import pandas as pd
from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

#Read movie data
movie_info_labels = ["movie id","movie title","release date","video release date","IMDb URL","unknown",
    "Action","Adventure","Animation","Children's", "Comedy","Crime","Documentary","Drama","Fantasy",
    "Film-Noir","Horror","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"]
movie_df = pd.read_csv("csv/item.csv", header = None, names = movie_info_labels)
movie_df.set_index('movie id', inplace=True)

#number of movies that were reviewed
num_movies = len(movie_df.index.tolist())

#Read user ratings data
rating_labels = ["user id","item id","rating","timestamp"]
rating_df = pd.read_csv("csv/data.csv", header = None, names = rating_labels)
rating_df.set_index('user id', inplace=True)

#Read user info data
user_labels = ["user id","age","gender","occupation","zip code"]
user_df = pd.read_csv("csv/user.csv", header = None, names = user_labels)
user_df.set_index('user id', inplace=True)

#number of users that gave ratings
num_users = len(user_df.index.tolist())

#return list of movie ids that given user has rated
def get_movie_ids(user_id):
    return rating_df.loc[user_id, 'item id'].tolist()

#return name of movie from given movie id
def get_movie_name(movie_id):
    return movie_df.loc[movie_id, 'movie title']

#gets average rating of given movie from given ratings
def get_average_rating(movie_id, ratings):
    this_movie_ratings = ratings[ratings['item id'] == movie_id]
    rating_total = this_movie_ratings['rating'].sum()
    total_num_ratings = len(this_movie_ratings.index)

    return round(rating_total/total_num_ratings, 3)

#gets list of movie ids of certain genre
def get_movies_from_genre(movies,genre):
    genre_movies = movies[movies[genre] == 1]
    lst = genre_movies.index.tolist()
    return lst

lst = get_movies_from_genre(movie_df,'Adventure')

#get df of movies in order of best to worst average rating from given ids
def get_rated_movies(movie_ids, ratings):
    given_movies = movie_df.loc[movie_ids,:]
    for id in movie_ids:
        given_movies.at[id,'Average Rating'] = get_average_rating(id, ratings)
    sorted_movies = given_movies.sort_values(by=['Average Rating'], ascending=False)
    return sorted_movies


#get movies based on user stats
def find_movies_from_user(movies, age, gender, occupation):
    users = user_df
    if gender != None:
        test = users[users['gender'] == gender]
        if len(test.index) > 0:
            users = test
    if occupation != None:
        test = users[users['occupation'] == occupation]
        if len(test.index) > 0:
            users = test
    if age != None:
        test = users[(users['age'] > int(age) - 10) | (users['age'] < int(age) + 10)]
        if len(test.index) > 0:
            users = test
    ratings = rating_df.loc[users.index]
    return get_rated_movies(movies, ratings)

#print(find_movies_from_user(40, 'F', 'writer'))

@app.route('/<genre>', methods=["GET"])
def get_genre_movies(genre):
    if genre not in movie_df.columns:
        return "Genre not found", 404
    movies = get_movies_from_genre(movie_df,genre)
    rated_movies = get_rated_movies(movies, rating_df)
    json = OrderedDict()
    lst = []
    order = 1
    for i,row in rated_movies.iterrows():
        movie_info = {}
        movie_info["order"] = order
        movie_info["title"] = row["movie title"]
        movie_info["rating"] = row["Average Rating"]
        lst.append(movie_info)
        #json[order] = movie_info
        order += 1
    json["movies"] = lst
    return jsonify(lst), 200


@app.route('/<age>/<gender>/<occupation>/<genre>', methods=["GET"])
def get_customized_movie(age,gender,occupation,genre):
    if genre not in movie_df.columns:
        return "Genre not found", 404

    specific_movies = get_movies_from_genre(movie_df,genre)
    movies = find_movies_from_user(specific_movies, age,gender,occupation)
    
    json = OrderedDict()
    lst = []
    order = 1
    for i,row in movies.iterrows():
        movie_info = {}
        movie_info["order"] = order
        movie_info["title"] = row["movie title"]
        movie_info["rating"] = row["Average Rating"]
        lst.append(movie_info)
        #json[order] = movie_info
        order += 1
    json["movies"] = lst
    return jsonify(lst), 200