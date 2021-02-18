import { Table } from 'antd';
import React, { Component } from 'react';

export default class ETable extends Component {  
        onRowClick = (recode,index)=>{
            let rowSelection = this.props.rowSelection;
            if(rowSelection === 'checkbox'){
                let selectedRowKeys = this.props.selectedRowKeys;
                let selectedItem = this.props.selectedItem;
                let selectedIds = this.props.selectedIds;
                if(selectedIds){
                    const i = selectedIds.indexOf(recode.id);
                    if(i === -1){
                        selectedIds.push(recode.id);
                        selectedRowKeys.push(index);
                        selectedItem.push(recode);
                    }else{
                        selectedIds.splice(i,1); //截取原数组会变
                        selectedRowKeys.splice(i,1);
                        selectedItem.splice(i,1);
                    }
                }else{
                    selectedIds = [recode.id];
                    selectedRowKeys= [index];
                    selectedItem= [recode];
                }
            this.props.updataSelectedItem(selectedRowKeys,selectedItem,selectedIds);
            }else{
                let selectedRowKeys = [index];
                let selectedItem = recode;
                this.props.updataSelectedItem(selectedRowKeys,selectedItem);

            }
        }
        tableInit = () =>{
        let row_selection = this.props.rowSelection;
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        if(row_selection === false || row_selection === null){
            row_selection = false;
        }else if (row_selection ==='checkbox'){
            rowSelection.type = 'checkbox';
        }else {
            row_selection = 'radio'
        }
       return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null} //单选或者复选
            onRow={(record,index) => { //record 是整个一条数据
                return {
                    onClick: () => {
                        if(!row_selection){
                            return;
                        }
                        this.onRowClick(record,index);
                    }
                }
            }}
        />  }

  render(){
    return (
        <div>
            {this.tableInit()}
        </div>
    )
  }
}