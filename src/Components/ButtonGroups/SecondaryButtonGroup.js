import BackToStartButton from "../Buttons/SecondaryButtons/BackToStartButton";
import ClearAllButton from "../Buttons/SecondaryButtons/ClearAllButton";
import ClearCurrentSelectionButton from "../Buttons/SecondaryButtons/ClearCurrentSelectionButton";

const SecondaryButtonGroup = props => {
    return (
        <>
            <BackToStartButton/>
            <ClearAllButton/>
            <ClearCurrentSelectionButton/>
        </>
    )
}

export default SecondaryButtonGroup;