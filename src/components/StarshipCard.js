import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

function StarshipCard(props) {


    const { 
        name,
        model, 
        manufacturer, 
        cost_in_credits, 
        length, 
        max_atmosphering_speed, 
        crew, 
        passengers, 
        cargo_capacity,
        consumables,
        hyperdrive_rating,
        MGLT,
        starship_class 
    } = props.player;
    return(
        <Card className={ props.resultClass }>
            <CardHeader 
                title={name}
                subheader="Starship name" 
            />
            <CardContent>
                <Typography variant="h5" component="h2">Starship Details:</Typography>
                <Typography variant="body2" component="p">
                    Model: <strong>{model}</strong><br />
                    Manufacturer: <strong>{manufacturer}</strong><br />
                    Cost In Credits: <strong>{cost_in_credits}</strong><br />
                    Length: <strong>{length}</strong><br />
                    Max Atmosphering Speed: <strong>{max_atmosphering_speed}</strong><br />
                    Crew: <strong>{crew}</strong><br />
                    Passengers: <strong>{passengers}</strong><br />
                    Cargo Capacity: <strong>{cargo_capacity}</strong><br />
                    Consumables: <strong>{consumables}</strong><br />
                    Hyperdrive Rating: <strong>{hyperdrive_rating}</strong><br />
                    MGLT: <strong>{MGLT}</strong><br />
                    Starship Class: <strong>{starship_class}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default StarshipCard;