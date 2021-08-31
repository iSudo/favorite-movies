package com.martintonts.favoritemovies.service;

import com.martintonts.favoritemovies.db.FavoriteMoviesRepository;
import com.martintonts.favoritemovies.db.SlimFavoriteMovie;
import com.martintonts.favoritemovies.db.SlimFavoriteMoviesRepository;
import com.martintonts.favoritemovies.model.OmdbDetailedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FavoriteMovieService {

    final
    FavoriteMoviesRepository repository;

    final
    SlimFavoriteMoviesRepository slimFavoriteMoviesRepository;

    public static FavoriteMovieService instance;

    public FavoriteMovieService(FavoriteMoviesRepository repository, SlimFavoriteMoviesRepository slimFavoriteMoviesRepository) {
        this.repository = repository;
        FavoriteMovieService.instance = this;
        this.slimFavoriteMoviesRepository = slimFavoriteMoviesRepository;
    }

    public void save(OmdbDetailedResponse detailedResponse) {
        repository.save(detailedResponse);
        slimFavoriteMoviesRepository.save(new SlimFavoriteMovie(detailedResponse.imdbID()));
    }

    public void delete(String imdbID) {
        repository.deleteByImdbID(imdbID);
        slimFavoriteMoviesRepository.deleteByImdbID(imdbID);
    }

    public Page<OmdbDetailedResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return repository.findAll(pageable);
    }

    public boolean findByImdbID(String imdbID) {
        return repository.findByImdbID(imdbID).isPresent();
    }

    public boolean findSlimFavoriteMovieByImdbID(String imdbID) {
        return slimFavoriteMoviesRepository.findByImdbID(imdbID).isPresent();
    }
}
