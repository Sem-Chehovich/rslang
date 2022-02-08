import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../wordPage.scss';


const Selector = ({ sections, handleChange }: any) => {
    return (
        <Box sx={{ minWidth: 150,}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sections</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={sections}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>1</MenuItem>
                        <MenuItem value={1}>2</MenuItem>
                        <MenuItem value={2}>3</MenuItem>
                        <MenuItem value={3}>4</MenuItem>
                        <MenuItem value={4}>5</MenuItem>
                        <MenuItem value={5}>6</MenuItem>
                    </Select>
            </FormControl>
        </Box>
    )
}

// const styles = {
//     root: {
//     width: '200px',
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       border: 0,
//       borderRadius: 3,
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       color: 'white',
//       height: 48,
//       padding: '0 30px',
//     },
//   };
  
//   function HigherOrderComponent(props: any) {
//     const { classes } = props;
//     return <Selector { ...props } className={classes.root} />;
//   }
  
//   export default withStyles(styles)(HigherOrderComponent);
export default Selector
