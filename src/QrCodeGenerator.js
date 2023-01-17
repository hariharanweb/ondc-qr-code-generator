import React, { useEffect, useState } from 'react';
import './QrCodeGenerator.css'
import QRCode from "qrcode";

const QrCodeGenerator = () => {
  const [imageUrl, setImageUrl] = useState();
  const [providerId, setProviderId] = useState();
  const [itemId, setItemId] = useState();
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();
  const [url, setUrl] = useState();
  useEffect(() => {
    let ondcUrl = 'https://www.ondc.org?'
    if (providerId && providerId.length > 0) {
      ondcUrl = `${ondcUrl}providerId=${providerId}&`
    }
    if (itemId && itemId.length > 0) {
      ondcUrl = `${ondcUrl}itemId=${itemId}&`
    }
    if (fromLocation && fromLocation.length > 0) {
      ondcUrl = `${ondcUrl}fromLocation=${fromLocation}&`
    }
    if (toLocation && toLocation.length > 0) {
      ondcUrl = `${ondcUrl}toLocation=${toLocation}&`
    }
    ondcUrl = ondcUrl.slice(0, -1)
    setUrl(ondcUrl)
    QRCode.toDataURL(ondcUrl, function (err, dataUrl) {
      setImageUrl(dataUrl)
    })
  }, [providerId, itemId, fromLocation, toLocation])

  return (
    <div className='qr-code-container'>
      <h2>
        ONDC QR code generator
      </h2>
      <div className='qr-code-area'>
        <div className='qr-code-form'>
          <div className='qr-code-form-item'>
            Provider Id
            <input type="text" className='qr-code-form-input' onChange={(e) => setProviderId(e.target.value)} value={providerId} />
          </div>
          <div className='qr-code-form-item'>
            Item Id
            <input type="text" className='qr-code-form-input' onChange={(e) => setItemId(e.target.value)} value={itemId} />
          </div>
          <div className='qr-code-form-item'>
            From Location
            <input type="text" className='qr-code-form-input' onChange={(e) => setFromLocation(e.target.value)} value={fromLocation} />
          </div>
          <div className='qr-code-form-item'>
            To Location
            <input type="text" className='qr-code-form-input' onChange={(e) => setToLocation(e.target.value)} value={toLocation} />
          </div>
        </div>
        <div className='qr-code-result'>
          {imageUrl && <img src={imageUrl} alt="Enter the URL" />}
          <a href={url}>{url}</a>
        </div>
      </div>
    </div>
  )
};
export default QrCodeGenerator;
