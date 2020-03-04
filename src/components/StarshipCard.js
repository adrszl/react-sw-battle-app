import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

class StarshipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <Card className={ this.props.resultClass }>
                <CardHeader 
                    title={this.props.name}
                    subheader="Starship name" 
                />
                <CardContent>
                    <Typography variant="h5" component="h2">Starship Details:</Typography>
                    <Typography variant="body2" component="p">
                        Model: <strong>{this.props.model}</strong><br />
                        Manufacturer: <strong>{this.props.manufacturer}</strong><br />
                        Cost In Credits: <strong>{this.props.costInCredits}</strong><br />
                        Length: <strong>{this.props.length}</strong><br />
                        Max Atmosphering Speed: <strong>{this.props.maxAtmospheringSpeed}</strong><br />
                        Crew: <strong>{this.props.crew}</strong><br />
                        Passengers: <strong>{this.props.passengers}</strong><br />
                        Cargo Capacity: <strong>{this.props.cargoCapacity}</strong><br />
                        Consumables: <strong>{this.props.consumables}</strong><br />
                        Hyperdrive Rating: <strong>{this.props.hyperdriveRating}</strong><br />
                        MGLT: <strong>{this.props.mglt}</strong><br />
                        Starship Class: <strong>{this.props.starshipClass}</strong>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default StarshipCard;