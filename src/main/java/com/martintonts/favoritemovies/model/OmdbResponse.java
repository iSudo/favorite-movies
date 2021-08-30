package com.martintonts.favoritemovies.model;

import java.util.List;

public record OmdbResponse(String Response, List<Movie> Search,
                           String totalResults, String Error) {
}
