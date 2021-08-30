package com.martintonts.favoritemovies.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.martintonts.favoritemovies.util.MovieDeserializer;

@JsonDeserialize(using = MovieDeserializer.class)
public record Movie (String Poster, String Title, String Type, String Year, String imdbID, boolean favorite) {
}
