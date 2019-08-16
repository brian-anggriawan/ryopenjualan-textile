import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { optionTable } from 'app';


class Table extends React.Component{

    render(){
        let { data , keyField , columns ,rowEvents } = this.props;

        optionTable.sizePerPage = 20;
        for(let i = 0; i < columns.length; i++){
            columns[i].style = { cursor:'pointer'}
        }

        return <ToolkitProvider
                    keyField={keyField}
                    data={ data }
                    columns={ columns }   
                >
                    {
                    props => (
                        <div>
                            <div className="table-responsive">
                                <BootstrapTable pagination ={paginationFactory(optionTable)}
                                    { ...props.baseProps }
                                    striped
                                    rowEvents={rowEvents}
                                    hover
                                    condensed
                                
                                />   
                                
                            </div>
                        </div>
                    )
                    }
                </ToolkitProvider>
    }
}

export default Table