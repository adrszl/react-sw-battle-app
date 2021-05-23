import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

function PlayerCard(props) {
    const { name, height, hair_color, mass, skin_color, eye_color, birth_year, gender } = props.player;

    return(
        <Card className={ props.resultClass }>
            <CardHeader 
                title={name}
                subheader="Player name" 
            />
            <CardContent>
                <Typography variant="h5" component="h2">Player Details:</Typography>
                <Typography variant="body2" component="p">
                    Height: <strong>{height}</strong><br />
                    Mass: <strong>{mass}</strong><br />
                    Hair Color: <strong>{hair_color}</strong><br />
                    Skin Color: <strong>{skin_color}</strong><br />
                    Eye Color: <strong>{eye_color}</strong><br />
                    Birth Year: <strong>{birth_year}</strong><br />
                    Gender: <strong>{gender}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default PlayerCard;