
import React, { useState, useRef } from 'react';

function FontUploader() {
    const [fileError, setFileError] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setFileError(null);
    
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            
            console.log(file);
            if (file.type === 'font/ttf' || file.name.endsWith('.ttf')) {
                console.log('Uploaded TTF file:', file.name);
                setFont(file); 
            } else {
                setFileError('Please upload only TTF files.');
            }
        }
    }
    


    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleSelectionBoxClick = () => {
        fileInputRef.current.click();
    }

    const handleFileInputChange = async (e) => {
        const files = e.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (file.type === 'font/ttf' || file.name.endsWith('.ttf')) {
                console.log('Uploaded TTF file:', file.name);
                storeFont(file); 
            } else {
                setFileError('Please upload only TTF files.');
            }
        }
    };

   

const storeFont = (fontFile) => {
    const fontName = fontFile.name.replace('.ttf', '');

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64Font = event.target.result;

        console.log('Font name:', fontName);
        console.log('Base64 font data:', base64Font);

        const fontArray = JSON.parse(localStorage.getItem('uploadedFonts') || '[]');

        fontArray.push({ name: fontName, data: base64Font });

        localStorage.setItem('uploadedFonts', JSON.stringify(fontArray));

        sendFontFileNameToServer(fontName);
    };

    reader.readAsDataURL(fontFile);
};


    
    
    const sendFontFileNameToServer = async (fileName) => {
        try {
            const response = await fetch('http://localhost/reactApi/api/user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fontFileName: fileName }),
            });
    
            if (response.ok) {
                console.log('Font name sent to the server successfully.');
            } else {
                console.error('Font name sending failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
       
    };
    return (
        <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-300 h-200 border-2 border-dashed border-gray-300 text-center p-20"
        onClick={handleSelectionBoxClick}
    >
        <p>Click here or drag and drop TTF files</p>
        {fileError && <p className="text-red-500">{fileError}</p>}
        <label
            htmlFor="fileInput"
            className="block p-10 bg-gray-200 cursor-pointer"
        >
            Choose File
        </label>
        <input
            type="file"
            id="fileInput"
            accept=".ttf"
            ref={fileInputRef}
            multiple
            className="hidden"
            onChange={handleFileInputChange}
        />
    </div>
    );
}

export default FontUploader;
