import { Select } from "antd"
import React from 'react';
const Option = Select.Option;

export default {
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+':'+date.getSeconds()
    },
    pagination(data,callback){
        return {
            onChange: (current)=>{
                callback(current)
            },
            current:data.result.page, //页数
            pageSize:data.result.page_size, //总页数
            total: data.result.total_count,   //一共的条数
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true //是否直接跳转
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.map(item=>{
           return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
             this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
       
    }
}