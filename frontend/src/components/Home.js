import {createRef, useEffect, useState} from 'react'
import Table from './Table';
import { Services } from './Services';

const Home = () => {
    const fileInput = createRef();
    const [rawData, setRawData] = useState();
    const [newData, setNewData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalSum, setTotalSum] = useState(0); 

    const parseData =() => {     
        if(rawData){
            let count= 0;
            const parse = rawData.split("{")[3].split("61:")
            const jsonData =[]
            
            for(let i=1; i<parse.length; i++){
                const arr =parse[i]
                const parseDate = arr.substring(0,6).slice(0,2)+"-"+ arr.substring(0,6).slice(2,4) + "- 20"+arr.substring(0,6).slice(4,6)
                let amount = arr.substr(14,5)
                count += parseInt(amount)
                setNewData(()=> {
                    jsonData[i] = {
                        "id": i,
                        "date" : parseDate,
                        "credit" : arr.substring(6,7),
                        "amount" : amount
                    }    
                    return jsonData 
                   
                })
                Services.post({
                    "date": parseDate,
                    "credit" : arr.substring(6,7),
                    "amount" : amount
                })
                .then((response)=> {
                    "success insert data"
                }) 
                

            }
                       
            const parseTotal = rawData.split("{")[3].split("62F:")[1].substr(13,6)
            setTotal(parseInt(parseTotal))
            setTotalSum(count) // validation total balance          
        }
        
    }

    const handleSubmit =(e) => {
        e.preventDefault();
            const reader = new FileReader();
            reader.onload = (evt) =>{
                setRawData(evt.target.result)
            }
            reader.readAsText(fileInput.current.files[0]);
            
            parseData();
    }

    useEffect(()=> {
        parseData()
    },[rawData])

  return (
      <div className='container'>
        <form onSubmit={handleSubmit} id="upload">
            <h1 style={{marginBottom:40}}>React Upload File</h1>
            <div className='main'>    
                <div>
                     Upload File : <input style={{marginLeft:10 }} type="file" ref={fileInput}/>
                </div>
                <div>
                    <button type="submit">Submit</button>  
                </div>
                
            </div>    
        </form>
        <Table
            data ={newData}
            total ={total}
            totalSum ={totalSum}
        /> 
      </div>
    
  )
}

export default Home