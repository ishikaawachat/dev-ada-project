#this is where we will try to do stuff

import pandas as pd

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

#gets average rating of given movie
def get_average_rating(movie_id):
    this_movie_ratings = rating_df[rating_df['item id'] == movie_id]
    rating_total = this_movie_ratings['rating'].sum()
    total_num_ratings = len(this_movie_ratings.index)

    return round(rating_total/total_num_ratings, 3)

