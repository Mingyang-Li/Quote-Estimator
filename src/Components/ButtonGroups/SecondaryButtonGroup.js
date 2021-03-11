import BackToStartButton from "../Buttons/SecondaryButtons/BackToStartButton";
import ClearAllButton from "../Buttons/SecondaryButtons/ClearAllButton";
import Grid from "@material-ui/core/Grid";

const SecondaryButtonGroup = () => {
  return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}> 
          <BackToStartButton/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ClearAllButton/>
        </Grid>
      </Grid>

  );
};

export default SecondaryButtonGroup;
