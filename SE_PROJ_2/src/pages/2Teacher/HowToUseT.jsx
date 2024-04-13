import React from 'react';
import howToUsePDF from '../../assets/howTOuse.pdf';

function HowToUseT() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 20px)', 
        width: 'calc(100vw - 65px)',
        marginTop: '50px', 

    };

    const pdfStyle = {
        width: '100%', 
        height: '100%', 
        maxWidth: '2000px', 
        maxHeight: '1000px', 
        border: 'none' 
    };

    return (
        <div style={containerStyle}>
            <object 
                data={howToUsePDF} 
                type="application/pdf" 
                style={pdfStyle}
                aria-label="Document"
            >
                <p>Your browser does not support PDFs. 
                    <a href={howToUsePDF}>Download the PDF</a>.
                </p>
            </object>
        </div>
    );
}

export default HowToUseT;
