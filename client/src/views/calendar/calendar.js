import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Dashboard from "../../components/body/dashboard/dashboard"

import {Card, Container, Row} from "reactstrap";
import Footer from '../../components/footer/Footer';
import Header from "../../components/header/Header";
import {Link} from 'react-router-dom'


export default function ListEvent() {

  const [events,getEvents] =useState([]);
 
 
  useEffect(()=>{
    getAllEvents();},[]);
    const getAllEvents =()=>{
    axios.get('http://localhost:5000/event/events')
    .then((response)=>{
    const allEvents =response.data;
    getEvents(allEvents);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
    
  
  
/*  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  */
  /*function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }*/
  return (
       <>
<Dashboard/>
    
<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Basic Calendar</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Basic Calendar</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Basic Calendar</h4>
						</div>
						<div class="widget-inner">
							<div id="calendar"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
	<div class="ttr-overlay"></div>
           
       </>
  );
}

