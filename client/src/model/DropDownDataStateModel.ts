import DataModel from './DataModel';

interface DataDropDownStateModel {
    items: Array<DataModel>,
    selectedLink: string | undefined,
    open: boolean,
    loading: boolean
}

export default DataDropDownStateModel;