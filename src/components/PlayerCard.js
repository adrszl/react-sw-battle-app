import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

class PlayerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <Card className={ this.props.resultClass }>
                <CardHeader 
                    title={this.props.name}
                    subheader="Player name" 
                />
                <CardContent>
                    <Typography variant="h5" component="h2">Player Details:</Typography>
                    <Typography variant="body2" component="p">
                        Height: <strong>{this.props.height}</strong><br />
                        Mass: <strong>{this.props.mass}</strong><br />
                        Hair Color: <strong>{this.props.hairColor}</strong><br />
                        Skin Color: <strong>{this.props.skinColor}</strong><br />
                        Eye Color: <strong>{this.props.eyeColor}</strong><br />
                        Birth Year: <strong>{this.props.birthYear}</strong><br />
                        Gender: <strong>{this.props.gender}</strong>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default PlayerCard;