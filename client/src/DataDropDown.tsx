import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ApiService from './service/ApiService';
import DataModel from './model/DataModel';

class DataDropDown extends React.Component {
    private api: ApiService = new ApiService();
    constructor(props:any) {
        super(props);

        this.state = {
            data: [],
        };
    }

    render() {
        return (
            <FormControl>
                <InputLabel id="data-select-label">Select data</InputLabel>
                <Select labelId="data-select-label" id="data-select">
                </Select>
                <FormHelperText>Please select data to see image</FormHelperText>
            </FormControl>
        );
    }

    async componentDidMount() {
        await this.api.GetDataList()
            .then((data) => {
                this.setState({ data: data })
            });
    }
}

export default DataDropDown