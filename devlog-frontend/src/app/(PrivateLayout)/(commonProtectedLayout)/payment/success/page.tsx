import { checkPaymentStatus } from '@/app/(commonLayout)/pricing/_action';
import { PaymentSuccess } from '@/components/modules/payment/success';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful | DevLog',
  description: 'Your payment was successful. Your subscription is now active.',
};

const PaymentSuccessPage = async({searchParams}: {searchParams: Promise<{session_id : string}>}) => {
    const {session_id} = await searchParams;
    const payment = await checkPaymentStatus(session_id);


    return (
        <div>
            <PaymentSuccess payment={payment.data}/>
        </div>
    );
};

export default PaymentSuccessPage;