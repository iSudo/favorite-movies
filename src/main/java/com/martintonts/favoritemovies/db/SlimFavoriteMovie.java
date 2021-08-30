package com.martintonts.favoritemovies.db;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document
public record SlimFavoriteMovie(@MongoId String imdbID) {
}
