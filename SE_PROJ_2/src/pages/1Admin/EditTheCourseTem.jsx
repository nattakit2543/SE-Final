import React, { useState } from 'react';
import { GrDocumentConfig } from "react-icons/gr";
import { Link } from 'react-router-dom';
import './EditTheCourseTem.css';


function EditTheCourseTem ()  {

const [Year, setYear] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  
  const handleAddYear = (event) => {
    const inputYear = event.target.value;
    console.log('Input Year:', Year);
    if (inputYear && inputYear.length === 4 && !isNaN(inputYear)) {
      setYear(inputYear); 
      console.log('Updated Year:', inputYear);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  



  return (
    <div className="button-container">
        <input
          className='search-input'
          type="text"
          placeholder="พิมพ์ปีการศึกษาตรงนี้"
          onBlur={(event) => handleAddYear(event)}
      />

      <div className="custom-button">
        {isButtonDisabled ? (
          <button className="color1-rectangle" disabled>
            <div className="gray-button">
                <GrDocumentConfig className='vector' />
              </div>
              <span>ภาคการศึกษาที่ 1</span>
              <div className="cream-rectangle">
                <span>จัดการรายวิชาที่เปิดสอน ภาคการศึกษาที่1</span>
              </div>
          </button>
          ) : (
            
             
            <Link 
            to={{
              pathname: '/Manage', // แทนที่ด้วย path ที่ถูกต้องของคุณ
              state: { Year }
            }}
            className="color1-rectangle1">
              <div className="gray-button1">
                <GrDocumentConfig className='vector' />
              </div>
              <span>ภาคการศึกษาที่ 1</span>
              <div className="cream-rectangle1">
                <span>จัดการรายวิชาที่เปิดสอน ภาคการศึกษาที่1</span>
              </div>
            </Link>
            
          )
        }

        {isButtonDisabled ? (
          <button className="color2-rectangle" disabled>
            <div className="black-button">
                <GrDocumentConfig className='vector' />
              </div>
              <span>ภาคการศึกษาที่ 2</span>
              <div className="cream-rectangle">
                <span>จัดการรายวิชาที่เปิดสอน ภาคการศึกษาที่2</span>
              </div>
          </button>
          ) : (
            <Link 
            to={{
              pathname: '/Manage2', // แทนที่ด้วย path ที่ถูกต้องของคุณ
              state: { Year }
            }}
            className="color2-rectangle1">
              <div className="black-button1">
                <GrDocumentConfig className='vector' />
              </div>
              <span>ภาคการศึกษาที่ 2</span>
              <div className="cream-rectangle1">
                <span>จัดการรายวิชาที่เปิดสอน ภาคการศึกษาที่2</span>
              </div>
            </Link>
    
          )
        }
        
        {isButtonDisabled ? (
          <button className="color3-rectangle" disabled>
            <div className="orange-button">
                <GrDocumentConfig className='vector' />
              </div>
              <span>ภาคฤดูร้อน</span>
              <div className="cream-rectangle">
                <span>จัดการรายวิชาที่เปิดสอน ภาคฤดูร้อน</span>
              </div>
          </button>
          ) : (
            <Link 
            to={{
              pathname: '/Manage3', // แทนที่ด้วย path ที่ถูกต้องของคุณ
              state: { Year }
            }}
             
            className="color3-rectangle1">
              <div className="orange-button1">
                <GrDocumentConfig className='vector' />
              </div>
              <span>ภาคฤดูร้อน</span>
              <div className="cream-rectangle1">
                <span>จัดการรายวิชาที่เปิดสอน ภาคฤดูร้อน</span>
              </div>
            </Link>
          )
        } 
      </div>
    </div>
  );
};

export default EditTheCourseTem;
