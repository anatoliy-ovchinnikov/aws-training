import React from 'react';
import ApiService from './service/ApiService';
import DataDropDown from './DataDropDown';
import DropDownDataStateModel from './model/DropDownDataStateModel';
import ModalButton from './ModalButton'

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
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSelect = (event: any) => {
        const selectedItem = this.state.items.find(e => e.id === event.target.value);

        this.setState({ selectedLink: selectedItem?.link })
    }

    onSubmit = (data: any, callback: Function) => {
        this.api.UploadImage(data.file)
            .then((result) => {
                data.id = result.id;
                this.api.SaveData(data)
                    .then(() => {
                        var items = this.state.items.slice();
                        this.setState({ items: [...items, data] });
                        callback();
                    })
            })
    }

    render() {
        return (
            <div>
                <div style={this.styles.actionContainer}>
                    <div style={this.styles.addButton}>
                        <ModalButton onSubmit={this.onSubmit} />
                    </div>
                    <DataDropDown items={this.state.items} onSelect={this.onSelect} />
                </div>
                <img src={this.state.selectedLink} style={this.styles.imgControl} alt="" />
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