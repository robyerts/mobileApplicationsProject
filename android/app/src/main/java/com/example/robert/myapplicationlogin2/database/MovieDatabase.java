package com.example.robert.myapplicationlogin2.database;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.Room;
import android.arch.persistence.room.RoomDatabase;
import android.content.Context;

import com.example.robert.myapplicationlogin2.dao.MovieDao;
import com.example.robert.myapplicationlogin2.model.MovieItem;

/**
 * Created by robert on 07.12.2017.
 */

@Database(entities = { MovieItem.class }, version = 3)
public abstract class MovieDatabase extends RoomDatabase {

    private static final String DB_NAME = "movieDatabase.db";
    private static volatile MovieDatabase instance;

    public static synchronized MovieDatabase getInstance(Context context) {
        if (instance == null) {
            instance = create(context);
        }
        return instance;
    }

    private static MovieDatabase create(final Context context) {
        return Room.databaseBuilder(
                context,
                MovieDatabase.class,
                DB_NAME).fallbackToDestructiveMigration().build();
    }

    public abstract MovieDao getMovieDao();
}
