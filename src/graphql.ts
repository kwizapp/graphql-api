
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Movie {
    id: string;
    name: string;
    votes?: number;
}

export interface IMutation {
    upVoteMovie(movieId: string): Movie | Promise<Movie>;
}

export interface IQuery {
    movies(): Movie[] | Promise<Movie[]>;
    movie(index: number): Movie | Promise<Movie>;
}
