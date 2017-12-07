package com.example.robert.myapplicationlogin2.model;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

import java.lang.annotation.Annotation.*;
/**
 * Created by robert on 06.12.2017.
 */
@Entity
public class MovieItem {
    @PrimaryKey(autoGenerate = true)
    @NonNull
    public long id;
    public final String title;
    public String details1;
    public String details2;
    public int rating;

    @Ignore
    public MovieItem(long id, String title, String details1, String details2, int rating) {
        this.id = id;
        this.title = title;
        this.details1 = details1;
        this.details2 = details2;
        this.rating = rating;
    }
    public MovieItem(String title, String details1, String details2, int rating) {
        this.title = title;
        this.details1 = details1;
        this.details2 = details2;
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "MovieItem{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", details1='" + details1 + '\'' +
                ", details2='" + details2 + '\'' +
                '}';
    }
}