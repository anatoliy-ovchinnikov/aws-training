import DataModel from './DataModel';

interface DataDropDownStateModel {
    items: Array<DataModel>,
    selectedLink: string | undefined,
    open: boolean
}

export default DataDropDownStateModel;