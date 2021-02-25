import { Button } from '@material-ui/core';
import { useContext } from 'react';
import GlobalContext from '../../../Contexts/GlobalContext';

const ClearAllButton = () => {
    const { clearAll } = useContext(GlobalContext);
    return (
        <Button color="secondary" variant="contained" onClick={clearAll}>
            Clear All
        </Button>
    )
}

export default ClearAllButton;