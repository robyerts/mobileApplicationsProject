package com.example.robert.myapplicationlogin2.dao;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;
import android.graphics.Movie;

import com.example.robert.myapplicationlogin2.model.MovieItem;

import java.util.List;

/**
 * Created by robert on 07.12.2017.
 */
@Dao
public interface MovieDao {
    @Insert
    public long insertMovie(MovieItem movie);
    @Update
    public int  updateMovie(MovieItem movie);
    @Delete
    public void deleteMovie(MovieItem movie);

    @Query("Delete from MovieItem")
    public void deleteAllMovies();

    @Query("SELECT * FROM MovieItem")
    public List<MovieItem> loadAllMovies();

    @Query("SELECT * FROM MovieItem WHERE id=:id")
    public MovieItem getMovieById(long id);

    @Query("SELECT * FROM MovieItem WHERE rating=:rating")
    public List<MovieItem> getMoviesByRating(int rating);

}
