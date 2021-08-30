package com.martintonts.favoritemovies.db;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SlimFavoriteMoviesRepository extends MongoRepository<SlimFavoriteMovie, String> {

    Optional<SlimFavoriteMovie> findByImdbID(String imdbID);

    void deleteByImdbID(String imdbID);
}
