import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DropDownDataPropsModel from './model/DropDownDataPropsModel';

class DataDropDown extends React.Component<DropDownDataPropsModel, {}> {
    render() {
        return (
            <FormControl>
                <InputLabel id="data-select-label">Select item</InputLabel>
                <Select labelId="data-select-label" id="data-select" onChange={this.props.onSelect}>
                    {this.props.items.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Select>
                <FormHelperText>Please select item to see image</FormHelperText>
            </FormControl>
        );
    }
}

export default DataDropDown