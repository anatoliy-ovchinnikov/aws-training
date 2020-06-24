import React from 'react';
import ApiService from './service/ApiService';
import DataDropDown from './DataDropDown';
import DropDownDataStateModel from './model/DropDownDataStateModel';
import ModalButton from './ModalButton'
import { Snackbar, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
            width: '500px'
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            selectedLink: '',
            open: false,
            loading: false
        }
        this.onSelect = this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    arrayBufferToBase64 = (buffer: any) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    onSelect = (event: any) => {
        this.setState({ loading: true, selectedLink: '' });
        const selectedItem = this.state.items.find(e => e.id === event.target.value);
        if (!selectedItem) {
            return;
        }

        this.api.GetImageById(selectedItem.id)
            .then((data) => {
                const base64String = this.arrayBufferToBase64(data.Body.data);
                this.setState({ selectedLink: "data:image/png;base64," + base64String, loading: false });
            });
    }

    onSubmit = (data: any, callback: Function) => {
        this.api.UploadImage(data.file)
            .then((result) => {
                data.id = result.id;
                data.link = result.data.Location;
                this.api.SaveData(data)
                    .then(() => {
                        var items = this.state.items.slice();
                        this.setState({ items: [...items, data], open: true });
                        callback();
                    })
            })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Successfully saved!
                    </Alert>
                </Snackbar>
                <div style={this.styles.actionContainer}>
                    <div style={this.styles.addButton}>
                        <ModalButton onSubmit={this.onSubmit} />
                    </div>
                    <DataDropDown items={this.state.items} onSelect={this.onSelect} />
                </div>
                {this.state.loading ? <CircularProgress /> : null}
                <img src={this.state.selectedLink} style={this.styles.imgControl} alt="" />
            </div>
        )
    }

    async componentDidMount() {
        await this.api.GetDataList()
            .then((data) => {
                this.setState({ items: data.sort((a, b) => (a.name > b.name ? 1 : -1)) })
            });
    }
}

export default DataMainForm