import { Button } from '@material-ui/core';
import { useContext } from 'react';
import GlobalContext from '../../../Contexts/GlobalContext';

const ClearCurrentSelectionButton = () => {
    const { clearCurrentSelection } = useContext(GlobalContext);
    return (
        <Button color="secondary" variant="contained" onClick={clearCurrentSelection}>
            Clear Current Selection
        </Button>
    )
}

export default ClearCurrentSelectionButton;