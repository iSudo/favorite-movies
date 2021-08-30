import {
    Avatar,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from "@material-ui/core";
import logo from "./logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Pagination} from "@material-ui/lab";
import React from "react";
import alertStore from "./store/AlertStore";


class Search extends React.Component {
    state = {
        loading: false,
        page: 1,
        query: '',
        searchResults: [],
        totalResults: 0,
    };

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.page !== prevState.page && this.state.query !== undefined) {
            this.movies();
        }
    }

    movies = () => {
        if (this.state.query === '') {
            alertStore.addAlert('Empty query!', 'error', 2000)
            return false;
        }
        this.setState({loading: true});
        fetch(`http://localhost:8080/api/search?page=${this.state.page}&phrase=${this.state.query}`)
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false});
                this.setState({searchResults: result.Search, totalResults: result.totalResults})
            }).catch(error => {
            this.setState({loading: false})
            alertStore.addAlert(error.message, 'error', 2000)
        });
    }

    setFavorite = (imdbID, favorite, successMessage) => {
        fetch(`http://localhost:8080/api/setFavorite?i=${imdbID}&favorite=${favorite}&page=${this.state.page}&phrase=${this.state.query}`)
            .then(response => response.text())
            .then(result => {
                let updatedResults = this.state.searchResults.map(value => (
                    value.imdbID === result ? {...value, favorite: favorite} : value
                ))
                this.setState({searchResults: updatedResults})
                alertStore.addAlert(successMessage, 'success', 2000)
            }).catch(error => {
            this.setState({loading: false})
            alertStore.addAlert(error.message, 'error', 2000)
        });
    }

    handleChange = (event, value) => {
        this.setState({page: value});
    };

    handleSearchPhraseChange = (event) => {
        this.setState({query: event.target.value})
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            this.movies();
        }
    }

    handleAddFavoriteMovie = (movie) => {
        this.setFavorite(movie.imdbID, true, `${movie.Title}(${movie.Year}) added to favorites!`);
    }

    handleRemoveFavoriteMovie = (movie) => {
        this.setFavorite(movie.imdbID, false, `${movie.Title}(${movie.Year}) removed from favorites!`);
    }

    render() {
        return (
            <Container maxWidth={"sm"} className={"container"}>
                <Grid container justifyContent="center">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Paper className={'inputRoot'}>
                        <InputBase
                            className={'inputBase'}
                            placeholder="Search Movies"
                            inputProps={{'aria-label': 'search movies'}}
                            onChange={this.handleSearchPhraseChange}
                            onKeyDown={this.keyPress}
                        />
                        <IconButton type="submit" className={'inputIconButton'}
                                    aria-label="search" onClick={this.movies}>
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                    <Paper square>
                        <Grid item xs={12} md={12}>
                            <div>
                                <List>
                                    {this.state.loading ? <CircularProgress/> : this.state.searchResults &&
                                        this.state.searchResults.map(value => {
                                            return (
                                                <ListItem key={value.imdbID}>
                                                    <ListItemAvatar>
                                                        <Avatar src={value.Poster}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={value.Year}
                                                    />
                                                    <ListItemText
                                                        primary={value.Title}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete">
                                                            {value.favorite ?
                                                                <FavoriteIcon
                                                                    onClick={() => this.handleRemoveFavoriteMovie(value)}/> :
                                                                <FavoriteBorderIcon
                                                                    onClick={() => this.handleAddFavoriteMovie(value)}/>}
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })}
                                </List>
                            </div>
                        </Grid>
                        {
                            this.state.totalResults > 0 &&
                            <Pagination count={Math.ceil(this.state.totalResults / 10)}
                                        onChange={this.handleChange}/>
                        }
                    </Paper>
                </Grid>
            </Container>
        )
    }
}

export default Search;