import { Button } from '@material-ui/core';
import { useContext } from 'react';
import GlobalContext from '../../../Contexts/GlobalContext';

const BackToStartButton = () => {
    const { backToStart } = useContext(GlobalContext)
    return (
        <Button color="secondary" size="large" fullWidth variant="contained" onClick={backToStart}>
            Back to Start
        </Button>
    )
}

export default BackToStartButton;