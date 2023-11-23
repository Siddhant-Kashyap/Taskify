import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { productivityServices } from '../../../Services/Api';
import jwtDecode from 'jwt-decode';



const BarGraph = () => {
 
  const [_data, setData] = useState([{ date: "20/12/2013", completedTask: 20 }, { date: "20/12/2013", completedTask: 30 }, { date: "20/12/2013", completedTask: 26 }])
  const email = jwtDecode(localStorage.getItem('token')).email

  const fetchProductivityData = async (email) => {
    const data = await productivityServices.getProductivity(email);
    console.log("My data length is " + data.length)
    console.log("My data length is " + (data.length>=2))
    if (data.length>=2) {
      setData(data)
    
    }
    else  {
      setData([
        { date: "20/12/2013", completedTask: 20 }, { date: "20/12/2013", completedTask: 30 }, { date: "20/12/2013", completedTask: 26 }
      ]

      )
    }


  }
  useEffect(() => {
    fetchProductivityData(email);

  }, [])
  useEffect(()=>{
    console.log(_data[_data.length - 1].date, _data[_data.length - 2].date)
    console.log(_data[_data.length - 1].completedTask, _data[_data.length - 2].completedTask);
  },[_data])
 


  return (
    <>

      <BarChart

        xAxis={[
          {
            id: 'Date',
            data: [_data[_data.length - 1].date, _data[_data.length - 2].date],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [_data[_data.length - 1].completedTask, _data[_data.length - 2].completedTask],
          },
        ]}
        width={300}
        height={300}
      />

    </>

  )
}

export default BarGraph;