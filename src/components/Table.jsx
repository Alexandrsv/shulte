import React from 'react';

const Table = ({arr}) => {
    return (
        <div>
            {arr.map(v => <div>{v
                .map(vv=><div style={{height:'40px',width:'40px',border:'1px solid',display:'inline-block'}}>{vv}</div>)}</div>)}
        </div>
    );
};

export default Table;
