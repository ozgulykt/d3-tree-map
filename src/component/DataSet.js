import React, { Component } from 'react';
import axios from 'axios';
import drawTreeMap from './drawTreeMap';

const KICKSTARTER_FILE = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const MOVIES_FILE = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const VIDEO_GAMES_FILE = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

class DataSet extends Component {
    async componentDidMount() {
        const raw_kickstarter_data = await axios.get(KICKSTARTER_FILE);
        const raw_movies_data = await axios.get(MOVIES_FILE);
        const raw_video_games_data = await axios.get(VIDEO_GAMES_FILE);

        const currentDataset = [
                raw_kickstarter_data.data,
                raw_movies_data.data,
                raw_video_games_data.data
        ];
        drawTreeMap(currentDataset, this.props);
      }
    render() {
        return (
            <div className="treemap">
            </div>
        )
    }
}

export default  DataSet;