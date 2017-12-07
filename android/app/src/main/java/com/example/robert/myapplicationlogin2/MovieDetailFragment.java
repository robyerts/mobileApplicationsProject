package com.example.robert.myapplicationlogin2;

import android.app.Activity;
import android.content.Intent;
import android.support.design.widget.CollapsingToolbarLayout;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.example.robert.myapplicationlogin2.database.MovieDatabase;
import com.example.robert.myapplicationlogin2.dummy.DummyContent;
import com.example.robert.myapplicationlogin2.model.MovieItem;
import com.example.robert.myapplicationlogin2.utils.ExecutorSingleton;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

/**
 * A fragment representing a single Movie detail screen.
 * This fragment is either contained in a {@link MovieListActivity}
 * in two-pane mode (on tablets) or a {@link MovieDetailActivity}
 * on handsets.
 */
public class MovieDetailFragment extends Fragment {
    /**
     * The fragment argument representing the item ID that this fragment
     * represents.
     */
    public static final String ARG_ITEM_ID = "item_id";

    /**
     * The dummy title this fragment is presenting.
     */
    private MovieItem mItem;
    private ExecutorService executor = ExecutorSingleton.executor;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public MovieDetailFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments().containsKey(ARG_ITEM_ID)) {
            // Load the dummy title specified by the fragment
            // arguments. In a real-world scenario, use a Loader
            // to load title from a title provider.

            System.out.println(getArguments().getLong(ARG_ITEM_ID));

            Callable<MovieItem> getMovieTask = new Callable<MovieItem>() {
                @Override
                public MovieItem call() {
                    return MovieDatabase.getInstance(getContext()).getMovieDao().getMovieById(getArguments().getLong(ARG_ITEM_ID));
                }
            };

            Future<MovieItem> future = executor.submit(getMovieTask);
            try {
                mItem = future.get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

            Activity activity = this.getActivity();
            CollapsingToolbarLayout appBarLayout = (CollapsingToolbarLayout) activity.findViewById(R.id.toolbar_layout);
            if (appBarLayout != null) {
                appBarLayout.setTitle(mItem.title);
            }
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.movie_detail, container, false);

        // Show the dummy title as text in a TextView.
        if (mItem != null) {
            final Runnable updateMovieTask = new Runnable() {
                @Override
                public void run() {
                    MovieDatabase.getInstance(getContext()).getMovieDao().updateMovie(mItem);
                    System.out.println(MovieDatabase.getInstance(getContext()).getMovieDao().getMovieById(mItem.id));
                }
            };
            final Runnable deleteMovieTask = new Runnable() {
                @Override
                public void run() {
                    MovieDatabase.getInstance(getContext()).getMovieDao().deleteMovie(mItem);
                }
            };

            Button saveMovieButton = rootView.findViewById(R.id.buttonSaveMovieItem);
            saveMovieButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    executor.submit(updateMovieTask);
                }
            });

            Button deleteMovieButton = rootView.findViewById(R.id.buttonDeleteMovieItem);
            deleteMovieButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    executor.submit(deleteMovieTask);
                    Intent intent=new Intent(getContext(),MovieListActivity.class);
                    startActivity(intent);
                }
            });
            EditText et =  rootView.findViewById(R.id.movie_detail1);
            et.setText(mItem.details1);

            et.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                }

                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {

                }

                @Override
                public void afterTextChanged(Editable s) {
                    mItem.details1 = s.toString();
                }

            });

            EditText et2 =  rootView.findViewById(R.id.movie_detail2);
            et2.setText(mItem.details2);

            et2.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                }

                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {

                }

                @Override
                public void afterTextChanged(Editable s) {
                    mItem.details2 = s.toString();
                }
            });
        }

        return rootView;
    }


}
