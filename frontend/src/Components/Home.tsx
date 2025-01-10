import { useEffect, useState } from 'react';
import Load from "../Animations/Load";
import Messagebugs from "../Animations/Messagebugs";
import SharingCard from './SharingCard.tsx';

export default function Home() {
  
  interface SharingList {
    _id: string;
    fullName: string;
    email: string;
    typeofservices: string;
    dateinsert: string;
    description: string;
    imageUrls: string[];
  }

  const [sharing, setSharing] = useState<SharingList[]>([]);
  const [loading, setLoading] = useState(false);
  const [sharingError, setsharingError] = useState(false);

  useEffect(() => {
    const fetchingSharing = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8000/apis/aply/get');
        const data = await res.json();
        
        // Access the 'data' property inside the API response and set it to the state
        if (data.success && Array.isArray(data.data)) {
          setSharing(data.data);  // data.data contains the array of sharing data
        } else {
          console.error("API response does not contain valid data", data);
          setsharingError(true);
        }
        
        setLoading(false);
        setsharingError(false);
      } catch (error) {
        console.error("Error fetching sharing data", error);
        setsharingError(true);
        setLoading(false);
      }
    };

    fetchingSharing();
  }, []);

  return (
    <>
      {loading && <h1 className='LoadingpageContainer'><Load /></h1>}
      {sharingError && <h1 className='LoadingpageContainer'><Messagebugs /></h1>}

      <div className="flex flex-wrap gap-4 justify-center max-w-full myhomeget mx-auto">
        {sharing.length > 0 ? (
          sharing.map((sharinglist) => (
            <div className="" key={sharinglist._id}>
              <SharingCard sharinglist={sharinglist} />
            </div>
          ))
        ) : (
          <p>No sharing data available</p>
        )}
      </div>
    </>
  );
}
