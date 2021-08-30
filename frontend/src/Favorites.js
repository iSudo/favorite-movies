import React from "react";
import alertStore from "./store/AlertStore";
import {CircularProgress, Container, Grid} from "@material-ui/core";
import logo from "./logo.svg";
import {Pagination} from "@material-ui/lab";
import FavoriteMovieCard from "./FavoriteMovieCard";


class Favorites extends React.Component {
    state = {
        loading: false,
        page: 1,
        favorites: [],
        totalPages: 0,
    };

    componentDidMount() {
        this.favorites();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.page !== prevState.page) {
            this.favorites();
        }
    }

    favorites = () => {
        this.setState({loading: true});
        fetch(`http://localhost:8080/api/allFavorites?page=${this.state.page}`)
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false});
                this.setState({favorites: result.content, totalPages: result.totalPages})
            }).catch(error => {
            this.setState({loading: false})
            alertStore.addAlert(error.message, 'error', 2000)
        });
    }

    handleChange = (event, value) => {
        this.setState({page: value});
    };

    handleRemoveFavoriteMovie = (imdbID, successMessage) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({imdbID: imdbID})
        };
        fetch('http://localhost:8080/api/delete', requestOptions)
            .then(response => response.text())
            .then(result => {
                alertStore.addAlert(successMessage, 'success', 2000)
                this.setState({
                    favorites: this.state.favorites.filter(value => {
                        return value.imdbID !== result
                    })
                });
            }).catch(error => {
            this.setState({loading: false})
            alertStore.addAlert(error.message, 'error', 2000)
        });
    }

    render() {
        return (
            <Container maxWidth={"md"} className={"container"}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            {this.state.loading ? <CircularProgress/> : this.state.favorites &&
                                this.state.favorites.map((value) => <FavoriteMovieCard
                                    delete={this.handleRemoveFavoriteMovie} movie={value}/>)
                            }
                        </Grid>
                    </Grid>
                    {
                        this.state.totalPages > 0 &&
                        <Grid item>
                            <Pagination count={this.state.totalPages}
                                        onChange={this.handleChange}/>
                        </Grid>
                    }
                </Grid>
            </Container>
        )
    }
}

export default Favorites;