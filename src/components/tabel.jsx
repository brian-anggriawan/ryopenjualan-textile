import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { optionTable } from 'app';


class Table extends React.Component{
    render(){
        const { SearchBar } = Search;
        return <ToolkitProvider
                    keyField={this.props.keyField}
                    data={ this.props.data }
                    columns={ this.props.columns }
                    search  
                    hover
                    condensed    
                >
                    {
                    props => (
                        <div>
                            <div className='float-right'>
                                <SearchBar { ...props.searchProps } style={this.props.width} />
                            </div>
                            <div className="table-responsive">
                                <BootstrapTable pagination ={paginationFactory(optionTable)}
                                    { ...props.baseProps }
                                    striped
                                
                                />   
                                
                            </div>
                        </div>
                    )
                    }
                </ToolkitProvider>
    }
}

export default Table