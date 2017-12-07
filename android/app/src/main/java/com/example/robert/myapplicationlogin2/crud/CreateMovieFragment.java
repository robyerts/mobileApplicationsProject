package com.example.robert.myapplicationlogin2.crud;

import android.app.AlertDialog;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.example.robert.myapplicationlogin2.MovieListActivity;
import com.example.robert.myapplicationlogin2.R;
import com.example.robert.myapplicationlogin2.database.MovieDatabase;
import com.example.robert.myapplicationlogin2.model.MovieItem;
import com.example.robert.myapplicationlogin2.utils.ExecutorSingleton;

import java.util.concurrent.ExecutorService;


/**
 * A placeholder fragment containing a simple view.
 */
public class CreateMovieFragment extends Fragment {

    private ExecutorService executor = ExecutorSingleton.executor;

    EditText titleEditText;
    EditText details1EditText;
    EditText details2EditText;
    NumberPicker np;
    public CreateMovieFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_create_movie, container, false);
        np = (NumberPicker) rootView.findViewById(R.id.numberPicker);
        np.setMinValue(1);
        np.setMaxValue(10);
        np.setWrapSelectorWheel(true);

        titleEditText = (EditText) rootView.findViewById(R.id.movieTitleEditText);
        details1EditText = (EditText) rootView.findViewById(R.id.movieDetails1EditText);
        details2EditText = (EditText) rootView.findViewById(R.id.movieDetails2EditText);

        final Runnable createMovieTask = new Runnable() {
            @Override
            public void run() {
                String title = titleEditText.getText().toString();
                String details1 = details1EditText.getText().toString();
                String details2 = details2EditText.getText().toString();
                MovieItem movie = new MovieItem(title, details1, details2, np.getValue());
                MovieDatabase.getInstance(getContext()).getMovieDao().insertMovie(movie);
            }
        };
        Button createMovieBotton = (Button) rootView.findViewById(R.id.createMovieButton);
        createMovieBotton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                executor.submit(createMovieTask);
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                builder.setMessage("redirecting to the movie list")
                        .setTitle("success");
                AlertDialog dialog = builder.create();
                dialog.show();
                Intent intent=new Intent(getContext(),MovieListActivity.class);
                startActivity(intent);
            }
        });
        return rootView;
    }
}
