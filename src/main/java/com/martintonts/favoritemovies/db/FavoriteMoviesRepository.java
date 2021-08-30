package com.martintonts.favoritemovies.db;

import com.martintonts.favoritemovies.model.OmdbDetailedResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FavoriteMoviesRepository extends MongoRepository<OmdbDetailedResponse, String> {

    Optional<OmdbDetailedResponse> findByImdbID(String imdbID);

    void deleteByImdbID(String imdbID);
}
