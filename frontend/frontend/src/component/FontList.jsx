import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
function FontList() {
  const [allFonts, setAllFonts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/reactApi/api/user.php')
      .then((res) => res.json())
      .then((data) => setAllFonts(data.font_files));
  }, []);

  const handleFontDelete = (id) => {
    Swal.fire({
      title: 'Do you want to delete this font?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost/reactApi/api/user.php?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (res.ok) {
              setAllFonts((fonts) => fonts.filter((font) => font.id !== id));
              Swal.fire('Font deleted successfully!', '', 'success');
            } else {
              console.error('Failed to delete font on the server.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  };

  useEffect(() => {
    const customFontData = JSON.parse(localStorage.getItem('uploadedFonts'));
  
    if (Array.isArray(customFontData)) {
     
      const style = document.createElement('style');
      style.innerHTML = customFontData.map((font) => `
        @font-face {
          font-family: '${font.name}';
          src: url(data:font/truetype;base64,${font.data}) format('truetype');
        }
        .font-${font.name} {
          font-family: '${font.name}', sans-serif;
        }
      `).join('');
  
      document.head.appendChild(style);
    }
  }, []);


  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Font Name</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allFonts.map((font) => (
              <tr key={font.id}>
                <td>{font.font_name}</td>
                <td className="custom-text">{font.font_name}</td>
                <td>
                  <button onClick={() => handleFontDelete(font.id)} className="btn btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FontList;
