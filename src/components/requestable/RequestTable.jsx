import React from 'react'
import './styles.scss'

import TableRow from './tablerow/TableRow'

function RequestTable({columns,data}) {  
  return (
    <div>
      <table className='requests-table'>
        <tbody>
          <tr>
          {
            columns?.map((item) => (
              <th className={['Request Id','Issue Type'].includes(item)?'ul-header hide':item === 'Submission Date'?'ul-header s-hide':item === 'Product Type'?'ul-header xs-hide':'ul-header'} key={item}>{item}</th>
            ))
          }
          </tr>
          {
            data?.map(item => (
              <TableRow item={item} key={item._id}/>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default RequestTable