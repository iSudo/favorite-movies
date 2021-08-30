package com.martintonts.favoritemovies.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.martintonts.favoritemovies.model.Movie;
import com.martintonts.favoritemovies.service.FavoriteMovieService;

import java.io.IOException;

public class MovieDeserializer extends JsonDeserializer<Movie> {

    FavoriteMovieService service;

    public MovieDeserializer(){
        this.service = FavoriteMovieService.instance;
    };

    @Override
    public Movie deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
        ObjectCodec codec = parser.getCodec();
        JsonNode node = codec.readTree(parser);

        final String Poster = node.get("Poster").asText();
        final String Title = node.get("Title").asText();
        final String Type = node.get("Type").asText();
        final String Year = node.get("Year").asText();
        final String imdbID = node.get("imdbID").asText();
        boolean favorite = service.findSlimFavoriteMovieByImdbID(imdbID);

        return new Movie(Poster, Title, Type, Year, imdbID, favorite);
    }
}
