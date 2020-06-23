import DataModel from './DataModel';

interface DataDropDownStateModel {
    items: Array<DataModel>,
    selectedLink: string | undefined
}

export default DataDropDownStateModel;