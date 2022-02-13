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
                        <MenuItem value={6}>7 - DIFFICULT WORD</MenuItem>
                    </Select>
            </FormControl>
        </Box>
    )
}

export default Selector
