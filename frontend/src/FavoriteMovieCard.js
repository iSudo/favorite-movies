import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        height: 200,
        overflow: "hidden",
        paddingBottom: 10,
    },
    image: {
        width: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function FavoriteMovieCard(props) {
    const classes = useStyles();

    const handleRemove = movie => () => {
        props.delete(movie.imdbID, `${movie.Title}(${movie.Year}) removed from favorites!`)
    }

    return (
        <Grid xs={6} className={classes.root} item>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={props.movie.Poster} title={props.movie.Title}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={4} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.movie.Title}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.movie.Actors}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.movie.Plot}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton color="secondary" title={'Remove'}>
                                <DeleteIcon onClick={handleRemove(props.movie)} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
