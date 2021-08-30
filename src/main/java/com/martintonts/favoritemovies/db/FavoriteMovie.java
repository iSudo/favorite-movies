package com.martintonts.favoritemovies.db;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record FavoriteMovie(String Title, String Year, @Indexed String imdbID) {
}
