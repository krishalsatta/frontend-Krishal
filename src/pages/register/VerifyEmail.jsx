import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyEmailApi } from '../../Apis/Api'; 
const VerifyEmail = () => {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await verifyEmailApi(code);
        if (res.data.success) {
          toast.success("Email verified successfully! You can now log in.");
        } else {
          toast.error(res.data.message || "Email verification failed.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Server Error");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [code]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Verifying your email...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div>Email verification complete. <Link to="/" className="underline text-sky-500">You can now log in.</Link></div>
    </div>
  );
};

export default VerifyEmail;
