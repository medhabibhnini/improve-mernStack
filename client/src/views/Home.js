import React from "react"
import Dashboard from "../components/body/dashboard/dashboard"
import {Radar} from 'react-chartjs-2';

export default function()
{
    const datachart = {
        labels: ['Communication Skills ', 'Leadership', 'Influencing', 'Interpersonal Skills', 'Personal Skills ', 'Creativity', 'Professional Skills '],
        datasets: [
          {
            label: 'Soft Skills Data',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 90, 81, 75, 65, 85]
          },
          
          
        ]
      };
      const datachartHard = {
        labels: ['Marketing ', 'Data Analysis', 'Mobile and Web Development', 'Network structure and security', 'Project management ', 'Mathematical and numerical skills', 'Design '],
        datasets: [
          {
            label: 'Soft Skills Data',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(0,191,255)',
            pointBackgroundColor: 'rgba(0,191,255)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,191,255)',
            data: [66, 55, 75, 83, 79, 72, 95]
          },
          
          
        ]
      };

    return(


    <>
    <Dashboard/>
  
    <div class="col-xl-8 order-xl-1" style={{marginTop:"100px",marginLeft:"330px",backgroundColor:"white" }}>
            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0"> soft skills Advancement of students</h3>
                  </div>
                  
                </div>
              </div>
              <div class="card-body"  style={{backgroundColor:"white" }}>
          
          
            <div>
        <Radar data ={datachart}></Radar>
        </div>
        <hr></hr>
        <h3 class="mb-0">hard skills Advancement of students</h3>

        <div>
        <Radar data ={datachartHard}></Radar>
        </div>

                  </div>
            </div>
          </div>    </>
    )
}