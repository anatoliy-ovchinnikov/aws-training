import React from 'react';
import ApiService from './service/ApiService';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import DataDropDown from './DataDropDown';
import DropDownDataStateModel from './model/DropDownDataStateModel';
import DataModel from './model/DataModel';

class DataMainForm extends React.Component<{}, DropDownDataStateModel> {
    private api: ApiService = new ApiService();
    private styles = {
        actionContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            marginTop: '20px'
        },
        addButton: {
            marginRight: '16px'
        },
        imgControl: {
            width: '100%'
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            selectedLink: ''
        }
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = (data:any) => {
        const items = this.state.items.slice();
        const selectedItem = items.find(e => e.id === data.target.value);

        this.setState({ items: items, selectedLink: selectedItem?.link })
    }

    render() {
        return (
            <div>
                <div style={this.styles.actionContainer}>
                    <Button variant="contained" color="primary" style={this.styles.addButton}>
                        <AddIcon />
                    </Button>
                    <DataDropDown items={this.state.items} onSelect={this.onSelect}/>
                </div>
                <img src={this.state.selectedLink} style={this.styles.imgControl}/>
            </div>
        )
    }

    async componentDidMount() {
        await this.api.GetDataList()
            .then((data) => {
                this.setState({ items: data })
            });
    }
}

export default DataMainForm