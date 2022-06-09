import React from 'react'

const Table = (props) => {
    const {data, total, totalSum} = props
  return (
    <div className="table-container">
            {data &&
                <table >
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Credit</th>
                            <th>Amount</th>
                        </tr>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.credit}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                        {totalSum !== 0 && total===totalSum ? //validation total balance
                         <tr>
                             <td></td>
                             <td>Total Balance:</td>
                             <td>{total}</td>     
                            
                        </tr>
                        : <tr><td>Total Balance is different</td></tr>
                        }
                       
                    </tbody>
                            
                </table>
            }

        </div>
  )
}

export default Table