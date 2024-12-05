import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Table, Alert, Clipboard } from 'flowbite-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaClipboard, FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Url() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const [linksData, setLinksData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userData = location.state || {};

  const handleNewUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = { email: `${userData.email}`, originalUrl: e.target.url.value };
if(formData.email){
    try {
      const res = await axios.post(`${backendUrl}/link/url`, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Link has been Created Please use Short Url for Analitics",
        showConfirmButton: false,
        timer: 2000
      });
      e.target.reset();
      getData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create the link. Please try again. ');
    } finally {
      setLoading(false);
    }
  }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${backendUrl}/link/data/${userData.email}`);
      console.log(res.data);
      setLinksData(res.data.LinkData);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch links. Please try again later. OR create a new link');
    } finally {
      setLoading(false);
    }
  };


  const handleShare = (shortUrl) => {
 
      if (navigator.share) {
        navigator.share({
          title: 'Check out this link!',
          text: `Check out this awesome link:`,
          url: `${backendUrl}/link/${shortUrl}`, // The URL to be shared
        })
          .then(() => console.log('Successfully shared!'))
          .catch((err) => console.error('Error sharing:', err));
      } else {
        alert('Web Share API is not supported in this browser.');
      }
    
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-[80vh] px-4 bg-slate-50">
      <div className='m-2 text-center'><span>Wellcome!</span> <span className='text-lg font-semibold'>{userData.name},</span> <span>Thankyou for your Trust</span><br/><span className='text-sm text-gray-600 '>* In future we provide more functionalities</span></div>
      <form className="flex gap-4 flex-col justify-center items-center shadow-lg p-8 bg-white rounded-lg w-full max-w-md" onSubmit={handleNewUrl}>
        <Label value="Create a new link" className="text-lg font-bold mb-2" />
        <TextInput type="url" name="url" placeholder="Type full URL of your website" required className="w-full" />
        <Button type="submit" className="w-full mt-4" color='dark'  disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
        {error && <Alert color="red" className="w-full mt-2">{error}</Alert>}
      </form>
<div className='text-sm text-gray-500 mt-4'>* Refress page for Latest analitics</div>
      <div className="overflow-x-auto mt-2 w-full max-w-5xl">
        {linksData.length > 0 ? (
          <Table striped>
            <Table.Head>
              <Table.HeadCell className='text-center'>Original URL</Table.HeadCell>
              <Table.HeadCell className='text-center'>Short URL</Table.HeadCell>
              <Table.HeadCell className='text-center'>Clicks</Table.HeadCell>
              <Table.HeadCell className='text-center'>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y text-center">
              {linksData.map((item) => (
                <Table.Row key={item.shortUrl} className="bg-white dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white ">
                    <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {item.originalUrl}
                    </a>
                  </Table.Cell>
                  <Table.Cell className='flex gap-2 justify-center items-center'>
                    <a href={`${backendUrl}/link/${item.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
                     {backendUrl}/link/{item.shortUrl}
                    </a>
                    <Clipboard valueToCopy={`${backendUrl}/link/${item.shortUrl}`} label={<FaClipboard />} className='bg-black hover:bg-gray-600 p-2'/>
                    <Button
                      size="xs"
                      color="light"
                      onClick={() => handleShare(item.shortUrl)}
                      title="Share"
                    >
                      <FaShareAlt />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>{item.clickCount}</Table.Cell>
                  <Table.Cell>
                    <Button size="xs" color="light" onClick={() => navigate('/analytics', { state: { linkData: item } })}>
                      View Analytics
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="text-center mt-8 text-gray-600 text-lg">
            No links created yet. Create a new one to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default Url;
