import DataModel from './DataModel';

interface DataDropDownPropsModel {
    items: Array<DataModel>
    onSelect: (data:any) => void
}

export default DataDropDownPropsModel;