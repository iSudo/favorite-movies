package com.martintonts.favoritemovies.controller;

import com.martintonts.favoritemovies.model.OmdbDetailedResponse;
import com.martintonts.favoritemovies.model.OmdbResponse;
import com.martintonts.favoritemovies.service.FavoriteMovieService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static io.restassured.RestAssured.given;

@CrossOrigin
@RestController
public class FavoriteMoviesController {

    final
    FavoriteMovieService service;

    @Value("${omdb.apikey}")
    private String apiKey;

    private final int PAGE_SIZE = 10;

    public FavoriteMoviesController(FavoriteMovieService service) {
        this.service = service;
    }

    @GetMapping("/api/search")
    public OmdbResponse searchMovies(
            @RequestParam(value = "phrase") String phrase, @RequestParam(value = "page") int page) {
        return given().get("http://www.omdbapi.com/?apikey=" + apiKey + "&page=" + page + "&s=" + phrase)
                .then().extract().body().jsonPath().getObject(".", OmdbResponse.class);
    }

    @GetMapping("/api/setFavorite")
    public String setFavorite(
            @RequestParam(value = "i") String i, @RequestParam(value = "favorite") boolean favorite,
            @RequestParam(value = "phrase") String phrase, @RequestParam(value = "page") int page) {
        if (!favorite) {
            service.delete(i);
            return i;
        }
        OmdbDetailedResponse detailedResponse = given().get("http://www.omdbapi.com/?apikey=" + apiKey + "&i=" + i)
                .then().extract().body().jsonPath().getObject(".", OmdbDetailedResponse.class);
        service.save(detailedResponse);
        return detailedResponse.imdbID();
    }

    @PostMapping("/api/delete")
    public String delete(
            @RequestBody Map<String, String> request) {
        service.delete(request.get("imdbID"));
        return request.get("imdbID");
    }

    @GetMapping("/api/allFavorites")
    public Page<OmdbDetailedResponse> getFavoriteMovies(@RequestParam(value = "page") int page) {
        return service.findAll(page - 1, PAGE_SIZE);
    }
}
