package com.martintonts.favoritemovies.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("favoriteMovie")
public record OmdbDetailedResponse(String Title, String Year, String Rated, String Released, String Runtime,
                                   String Genre, String Director, String Writer, String Actors, String Plot,
                                   String Language, String Country, String Awards, String Poster,
                                   List<OmdbRating> Ratings, String Metascore, String imdbRating, String imdbVotes,
                                   @Indexed String imdbID, String Type, String DVD, String BoxOffice, String Production,
                                   String Website, String totalSeasons, String Response) {
}
